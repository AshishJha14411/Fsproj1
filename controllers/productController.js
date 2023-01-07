import Product from "../modals/product.schema";
import formidable from "formidable";
import fs from "fs";
import { deleteFile, s3FileUpload } from "../services/imageUploader";
import Mongoose from "mongoose";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";
import config from "../config/index";

export const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({
    multiples: true, //supports multiple file upload
    keepExtensions: true, //but should check the extensions
  });

  form.parse(req, async function (err, fields, files) {
    try {
      if (err) {
        throw new CustomError(
          err.message || "Error Happened in Image section of AddProduct",
          500
        );
      }
      let productId = new Mongoose.Types.ObjectId().toHexString();
      //check for fields
      if (
        !fields.name ||
        !fields.price ||
        !fields.description ||
        !fields.collectionId
      ) {
        throw new CustomError("Please fill all the details", 500);
      }

      //handling images
      let imgArrayResp = Promise.all(
        Object.keys(files).map(async (filekey, index) => {
          const element = files[filekey];

          const data = fs.readFileSync(element.filepath);

          const upload = await s3FileUpload({
            bucketName: config.S3_BUCKET_NAME,
            key: `products/${productId}/photo_${index+1}.png`,
            body: data,
            contentType: element.mimetype,
          });
          return {
            secure_url: upload.Location
          }
        })
      );

      let imgArray = await imgArrayResp

      const product = await Product.create({
        _id: productId,
        photos: imgArray,
        ...fields,
      })
      if(!product){
        throw new CustomError("Product was not created", 400)
      }
      res.status(200).json({
        success: true,
        product
      })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong on Image Upload"
        })
    }
  });
});
