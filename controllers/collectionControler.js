import { Collection } from '../modals/collection.schema'
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'

export const createCollection = asyncHandler(async (req,res)=> {
    const  {name} = req.body

    if(!name) {
        throw new CustomError("Collection name is required", 400)
    }

    //add this to database
    const collection = await Collection.create({
        name
    })

    //send response value to frontend

    res.status(200).json({
        success: true,
        message: "Collection created successfully",
        collection
    })
})


export const updateCollection = asyncHandler(async (req,res)=> {
//getting the existing record
    const {id: collectionId} = req.params
//new value to get updated
const {name} = req.body
if(!name){
    throw new CustomError("Collection name is required", 400)
}

let updatedCollection = await Collection.findByIdAndUpdate(
    collectionId,
    {
        name,
    },
    {
        new:true,
        runValidators: true
    },
    ) 
    if(!updateCollection){
        throw new CustomError("Collection not found", 400)
    }
    res.status(200).json({
        success: true,
        message: "Collection Updated successfully",
        updateCollection
    })
})


export const deleteCollection = asyncHandler(async(req,res) => {
    const {id: collectionId} = req.params

    const toBeDeletedCollection = await Collection.findByIdAndDelete(collectionId)

    if(!toBeDeletedCollection){
        throw new CustomError("Collection not found", 400)
    }
    //js fn for freeing memory
    toBeDeletedCollection.remove()
    //send response to front end
    res.status(200).json({
        success: true,
        message: "Collection deleted successfully"
    })
})


export const getAllCollections = asyncHandler(async(req,res) => {
  const collections =  await Collection.find()

  if(!collections) {
    throw new CustomError("No Collection Found", 400)
  }

  res.status(200).json({
    success: true,
    collections
  })
})