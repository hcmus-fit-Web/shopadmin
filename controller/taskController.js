const express = require('express');

const mongoose = require('mongoose');
const Product = mongoose.model('product');

const router = express.Router();

const PAGE_SIZE = 4;

router.get("/",(req,res)=>{
    res.render("addOrEdit",{
        viewTitle:"Product"
    })
})

router.post("/",(req,res)=>{
    if(req.body._id == ""){
        insertRecord(req,res);
    }else{
        updateRecord(req,res);
    }
})

function insertRecord(req,res){
    const product = new Product();

    product.productid = req.body.productid;
    product.price = req.body.price;
    product.image = req.body.image;
    product.image1 = req.body.image1;
    product.detail = req.body.detail;
    product.type = req.body.type;
    product.name = req.body.name;
    product.brand = req.body.brand;
    product.color = req.body.color;
    product.discount = req.body.discount;

    product.save((err, doc) => {
        if (!err) {
            res.redirect('list');
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: 'Update Product',
                    product: req.body
                })
            }
            console.log("Error Insert" + err);
        }
    });

}
function  updateRecord(req,res){
    Product.findOneAndUpdate({_id:req.body._id,},req.body,{new:true},(err,doc)=>{
        if (!err){
            res.redirect("list");
        }else{

            if(err.name == "ValidationError"){
                handleValidationError(err,req.body);
                res.render("addOrEdit",{
                    viewTitle:'Update Product',
                    product:req.body
                })
            }
            console.log("Error Update"+err);

        }
    })
}

router.get('/list',(req,res)=>{

    var page = req.query.page;

    if(page) {
        page = parseInt(page);
        if (page < 1){page = 1;}

        var skip = (page - 1) * PAGE_SIZE;

        Product.find((err,docs)=>{
            if (!err){
                res.render("list",{
                    list:docs
                })
            }
        }).skip(skip).limit(PAGE_SIZE).lean();

    }else{
        page = 1;
        var skip = (page - 1) * PAGE_SIZE;

        Product.find((err,docs)=>{
            if (!err){
                res.render("list",{
                    list:docs
                })
            }
        }).skip(skip).limit(PAGE_SIZE).lean();
    }




    // if (page){
    //     page = parseInt(page);
    //     if (page<1) {page = 1;}
    //     var skip = (page - 1) * PAGE_SIZE;
    //     const products = Product.find({}).skip(skip).limit(PAGE_SIZE).lean();
    //     console.log(products);
    //     res.locals.list = products
    //     res.render('list');
    //
    // }else {
    //     page = 1;
    //     var skip = (page - 1) * PAGE_SIZE;
    //     const products = Product.find({}).skip(skip).limit(PAGE_SIZE).lean();
    //     console.log(products);
    //     res.locals.list = products
    //     res.render('list');
    // }
})

router.get('/:id',(req,res)=>{
    Product.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("addOrEdit",{
                viewTitle:"Update Product",
                product:doc
            })
        }
    })
})

router.get('/delete/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/list')
        }else{
            console.log("An error Teh Delete "+ err);
        }
    })

})


module.exports = router;