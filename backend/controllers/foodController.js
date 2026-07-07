import foodModel from "./../models/foodModels.js";
import fs from 'fs';


//add food item

const addFood = async (req, res) => {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No image received"
        });
    }

    let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Item Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while adding food item" });
    }
};


// all food list
const listFood =  async(req,res)=>{
    try{
        const foods = await foodModel.find();
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error while fetching food list"})
    }
}

//remove food items
const removeFood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlinkSync(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Item Removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error while removing food item"})
    }
}


export {addFood,listFood,removeFood}