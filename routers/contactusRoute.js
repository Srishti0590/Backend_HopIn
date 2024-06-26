const express= require("express");
const router= new express.Router();
const ContactUs= require("../models/contactusModel");
const auth = require("../auth/auth");

router.post("/message/add", (req, res)=>{
    const name= req.body.name;
    const email= req.body.email;
    const message= req.body.message;
    

    const data= new ContactUs ({
        name: name,
        email: email,
        message: message,
        
    })
    data.save()
    .then(()=>{
        res.json({message: "Thank you for your feedback!"})
    })
    .catch((e)=>{
        res.json(e)
    })
    
});

router.get("/message/display", (req, res)=>{
    ContactUs.find({})
    .then((data)=>{
        res.json({data})
    })
    .catch((e)=>{
        res.json({error: e})
    })
})

router.delete("/message/delete/:id",  (req, res) => {
    const id = req.params.id;
    contactUs.deleteOne({ _id: id })
        .then(() => {
            res.json({ message: "message deleted successfully", status: true })
        })
        .catch((e) => {
            res.json({ error: e })
        })
})




module.exports=router;




