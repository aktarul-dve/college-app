import JWT from "jsonwebtoken";
import user_models from "../models/user_models.js";

export const  requireSingnin= async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token not provided" });
        }

        const token = authHeader.split(" ")[1]; // "Bearer TOKEN" থেকে টোকেন বের করা
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ error: "Invalid Token" });
    }
};
export const isAdmin = async (req,res,next) =>{
    try {

        const user = await user_models.findById(req.user._id)
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message : "UnAuthorized Access"
            })
        }else{
            next();
        }
        
        
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:"Error in admin middilware"
        })
        
    }
}