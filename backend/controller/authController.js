import user_models from "../models/user_models.js";
import {comparePassword, hashPassword} from "../helper/auth_helper.js";
import JWT from 'jsonwebtoken';

export const registerController = async(req,res) =>{

    try {
        const {name,email,password,phone,address} = req.body;
        if(!name){
            return res.sand({error:"Name is Required"});
        };
        if(!email){
            return res.sand({error:"Email is Required"});
        };
        if(!password){
            return res.sand({error:"Password is Required"});
        };
        if(!phone){
            return res.sand({error:"Phone is Required"});
        };
        if(!address){
            return res.sand({error:"Address is Required"});
        };

        const existinguser = await user_models.findOne({email})

        if(existinguser){
            return res.status(200).send({
                success:false,
                message:"Already Registar Please Login",
            });
        };

        const hashedPassword = await hashPassword (password);

        const user = await new user_models({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
        }).save();

        res.status(201).send({
            success:true,
            message:"User Registar Successfully",
            user
        });




        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registeation",
            error
        });
        
    }

  

    

};



export const loginController = async(req,res) =>{

    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }

        const user =await user_models.findOne({email})

        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registerd"
            })
        }

        const match = await comparePassword (password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"Login successfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,

            },
            token,
    
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        });
        
    }

};

export const tastContreller = (req,res) =>{
    res.send("protected Route");
}

