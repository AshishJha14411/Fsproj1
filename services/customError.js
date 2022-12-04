class CustomError extends Error{
    //study call by value vs call by ref

    constructor(message,code){
        super(message);
        this.code = code
    }
}



export default CustomError