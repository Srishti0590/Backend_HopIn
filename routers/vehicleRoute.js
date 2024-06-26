const express= require("express");
const vehicleModel = require("../models/vehicleModel");
const router= new express.Router();
// const Vehicle= require("../models/vehicleModel");
const jwt = require ("jsonwebtoken");
const auth = require("../auth/auth");
const upload= require("../fileupload/fileupload");


//add products
router.post("/product/add/", (req, res)=>{
    const name= req.body.name;
    const model= req.body.model;
    const capacity= req.body.capacity;
    const  power= req.body.power;
    const colour= req.body.colour;
    const picture= req.body.picture;

    const data= new vehicleModel({
        name: name,
        model: model,
        capacity: capacity,
        power: power,
        colour: colour,
        picture: picture,
    })
    const file= req.file;
    if(file){
        const fileName = req.file.filename;
   
    // req.protocol = "http";
    // req.get = localhost:3000/
    let basePath;
    if (req.get("host").includes("10.0.2.2")) {
      basePath = `${req.protocol}://${req.get("host").replace("10.0.2.2","localhost")}/public/uploads/`;
    }else{
      basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    }
    // const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  //  const basePath = `http://localhost:3000/public/uploads/`;
    data.image = basePath + fileName;
    }
     data.save()
    .then(()=>{
        res.json({message: "product added successfully!"})
    })
    .catch((e)=>{
        res.json(e)
    })
    
})


//display all the products
router.get("/product/displayall", (req, res)=>{
    vehicleModel.find({})
    .then((data)=>{
        res.json({data})
    })
    .catch((e)=>{
        res.json({error: e})
    })
})

//code to display single product
router.get("/product/display/:id", (req, res)=>{
    console.log("Hop-In");
    vehicleModel.findOne({_id: req.params.id})
    .then((data)=>{
        console.log(data);
        res.json({data: data})
    })
    .catch((e)=>{
        res.json({error: e})
    })
})

// code for vehicle update
router.put("/product/update", auth.customerGuard, (req, res)=>{
    const id= req.body.id;
    const name= req.body.name;
    const model= req.body.model;
    const capacity= req.body.capacity;
    const  power= req.body.power;
    const colour= req.body.colour;
    const picture= req.body.picture;
    vehicleModel.updateOne({_id: id},{
        name: name,
        model: model,
        capacity: capacity,
        power: power,
        colour: colour,
        picture: picture,
    })
    .then(()=>{
        res.json({msg: "updated"})
    })
    .catch(()=>{
        res.json({msg:"error"})

    })

})

router.delete("/product/delete/:id",  (req, res) => {
    const id = req.params.id;
    vehicleModel.deleteOne({ _id: id })
        .then(() => {
            res.json({ message: "Product deleted", status: true })
        })
        .catch((e) => {
            res.json({ error: e })
        })
})
module.exports=router;




