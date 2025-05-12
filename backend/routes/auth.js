import exoress from 'express'
import { loginController, registerController, tastContreller } from '../controller/authController.js'
import { isAdmin, requireSingnin } from '../middleware/authMiddelware.js';

//router object
 const router = exoress.Router();

 //routing
 //Register Method Post
 router.post("/register", registerController);

 //Login Method Post
 router.post("/login",loginController);

 router.get("/tast",requireSingnin,isAdmin, tastContreller)

 router.get("/user-auth",requireSingnin, (req,res) =>{
    res.status(200).send({ok:true});
 })

 router.get("/admin-auth",requireSingnin, isAdmin, (req,res) =>{
   res.status(200).send({ok:true});
})


 export default router;

