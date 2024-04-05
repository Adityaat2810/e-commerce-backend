const express = require("express");
const router = express.Router();
const {Category} =require('../models/category-schema');

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


router.get(`/`,async(req,res)=>{
    const categoryList = await Category.find();
    if(!categoryList){
        res.status(500).json({
            success:false
        })

        res.status(200).send(categoryList)
    }

    res.send(categoryList)


})

router.get('/:id',async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(500).json({
            message:"the category with given id not found"
        })

       
    }
    res.status(200).send(category)
})

router.put('/:id',async(req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color,
            image:req.body.image
        },
        {new:true}
    )

    if(!category){
        res.status(400).send('category not updated')
    }

    res.send(category)
})



module.exports=router