export function asyncHandler(fn){
    return(req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}

export class ApiError extends Error{
    constructor(error,code){
        super(error)
        this.error=error;
        this.code=code;
    }
}

export const errorHandler=(err,req,res,next)=>{

    const status=Number(err.code)||500;
    const message=err.message||"something went wrong"
    return res.status(status).json({
        success:false,
        message:message
    })
}
