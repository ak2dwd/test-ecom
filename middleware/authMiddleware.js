import JWT from "jsonwebtoken";

export const requireSign = async (req,res,next) => {
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_PRIVATE);
        next();
    } catch (error) {
       console.log(error) 
    }
}