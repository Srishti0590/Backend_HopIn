const jwt = require("jsonwebtoken");
const customer = require("../models/customerModel");
// const admin = require("../models/adminModel");

const doctorModel = require
module.exports.customerGuard = (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    //token verification
    //the logged in user id is available in data variable below
    const data = jwt.verify(token,'everest');
    // console.log(data);
    customer.findOne({_id:data.customer_id})
    .then((result)=>{
        req.customerData = result;
        next();
    })
    .catch((e)=>{
        res.json({msg:"invalid token"})
    })
    }
    catch(e){
        res.json({msg:"Invalid Access"})
    }
}

// module.exports.adminGuard = (req,res,next)=>{
//     try{
//     const token = req.headers.authorization.split(" ")[1];
//     //token verification
//     //the logged in user id is available in data variable below
//     const data = jwt.verify(token,'everest');
//     // console.log(data);
//     admin.findOne({_id:data.admin_id})
//     .then((result)=>{
//         req.adminData = result;
//         next();
//     })
//     .catch((e)=>{
//         res.json({msg:"invalid token"})
//     })
//     }
//     catch(e){
//         res.json({msg:"Invalid Access"})
//     }
// }
