const express = require("express");
const router = express.Router();
const {Category} =require('../models/category-schema');
const error = require("mongoose/lib/error");

router.get('/',async(req,res)=>{
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({
            success:false
        })
    }

    res.send(categoryList);
})

router.post('/',async(req,res)=>{
    console.log('i am here')
    let category = new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color,
        image:req.body.image
    });

    console.log('I AM CATEGORY',{category})
    category = await category.save();

    if(!category){
        return res.status(404).send('category cannot be created ')
    }

    res.send(category)
})

router.delete('/:id', (req, res)=>{
    try{
        // console.log(req.params.id);
        // console.log(' i am here ')
        Category.findByIdAndDelete(req.params.id).then(category =>{
            if(category) {
                return res.status(200).json({success: true, message: 'the category is deleted!'})
            } else {
                return res.status(404).json({success: false , message: "category not found!"})
            }
        }).catch(err=>{
           return res.status(500).json({success: false, error: err}) 
        })

    }catch(error){
        console.log(error)
        throw{error};
    }
  
})



module.exports=router