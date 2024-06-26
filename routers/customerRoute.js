const express = require ("express");
const router = new express.Router();
const Customer = require("../models/customerModel");
const bcryptjs = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const auth = require("../auth/auth");
const upload= require("../fileupload/fileupload");

// Customer Registration
router.post("/customer/register",(req,res)=>{
    const email= req.body.email;
    Customer.findOne({email: email})
    .then((result)=>{
        if(result!==null){
            res.json({msg:" User of this email already exists"})
            return;
        }
    const fn = req.body.fn;
    const ln = req.body.ln;
    const age = req.body.age;
    const phone = req.body.phone;
    const password= req.body.password;
    bcryptjs.hash(password, 10, (e, hashed_pw)=>{
        const data= new Customer({
            fn:fn, ln:ln, age:age, email:email, phone:phone, password:hashed_pw, userType : 'customer'
        })
        data.save()
        .then(()=>{
            res.json({message: "User registered!"})
        })
        .catch((e)=>{
            res.json(e)
        })
    })
    })
})
//customerlogin
router.post("/customer/login",(req, res)=>{
    const email = req.body.email;
    Customer.findOne({email:email})
    .then((result)=>{
        if(result==null){
            res.json({message:"Invalid Credentials."})
            return;
        }
        const password = req.body.password;
        bcryptjs.compare(password,result.password,(e, success)=>{
            if(success==false){
                res.json({message:"Invalid credentials."})
                return;
            }
            // res.json({message:"logged in"})
            //we are creating token or ticket id with logged in user id in it
            jwt.sign({customer_id: result._id}, "everest", (e,token)=>{
                res.json({token: token, userType: result.userType})
            })
        })
    })
    .catch(e=>{
        res.json(e)
    })
})

router.put("/customer/update",auth.customerGuard,(req,res)=>{
    //some code for updating customer profile
    const fn= req.body.fn;
    const ln= req.body.ln;
    const age= req.body.ln;
    const email= req.body.ln;
    const password= req.body.password;

    Customer.updateOne({_id: req.customerData._id}, {fn:fn, ln:ln, age:age, email:email, password:password })
    .then(()=>{
        res.json({message:"Customer Profile Updated Successfully",success:true})
    })
    .catch(e=>{
        res.json(e);
    })

});

// to allow users to view their profile
router.get("/customer/dashboard", auth.customerGuard, (req,res)=>{
        res.json({data: req.customerData});
        console.log(req.customerData)
});

router.put('/customer/picture/update', auth.customerGuard, upload.single('pic'), (req, res)=>{
    // console.log(req.file) 
    if(req.file== undefined){
        return res.json({msg: 'Invalid file format'});
    }   
    Customer.updateOne({_id: req.customerData._id}, {picture: req.file.filename})
        .then(()=>{res.json({msg: "Picture uploaded"})})
        .catch((e)=>{res.json({msg:"Please try again"}) })
})
module.exports=router;
