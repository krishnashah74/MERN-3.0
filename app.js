require('dotenv').config()
const express=require("express");
const fs = require('fs')
const connectToDatabase = require("./database");
const Blog = require('./model/blogmodel.js');
const {upload} = require('./middleware/multerConfi.js')
const app=express();


connectToDatabase()
app.use(express.json())
app.use(express.static('./storage'))





app.get("/",(req,res)=>{
    res.json({
        message:"This Is Home Page"
    })
})


// app.post("/blog",upload.single('image'), (req,res)=>{
//     console.log(req.body)
//     res.status(200).json({
//         message : "Blog api hit successfully"
//     })
// })

// add image----------

app.post("/blog",upload.single('image'), async (req,res)=>{
    const {title,subtitle,description} = req.body 
    console.log(req.file.filename)
    const filename = req.file.filename 
    console.log(filename)
 
    if(!title || !subtitle || !description){
         return res.status(400).json({
             message : "Please provide title,subtitle,description"
         })
 
    }



    await Blog.create({
       title :  title, 
       subtitle : subtitle, 
       description : description, 
       image : filename
    })

    res.status(200).json({
        message : "Blog api hit successfully"
    })
})

// Get Api---------- 

app.get("/blog",async (req,res)=>{
    const blogs =  await Blog.find() // returns array
    res.status(200).json({
     message : "Blogs fetched successfully", 
     data : blogs
    })
 })

 // patch API ------

 

 app.patch('/blog/:id',upload.single('image'), async(req,res)=>{
    const id = req.params.id 
    const {title,subtitle,description} = req.body 
    let imageName;
    if(req.file){
        imageName=req.file.filename
        const blog = await Blog.findById(id)
        const oldImageName = blog.image

        fs.unlink(`storage/${oldImageName}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File deleted successfully")
            }
        })
    }
   await Blog.findByIdAndUpdate(id,{
        title : title, 
        subtitle : subtitle, 
        description : description, 
        image : imageName
    })
    res.status(200).json({
        message : "Blog updated successfully"
    })
})


 // Delete API--------


 app.delete("/blog/:id",async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image

    fs.unlink(`./storage/${imageName}`,(err)=>{
        if(err){
            console.log("file delete failed")
        }else{
            console.log("File deleted successfully")
        }
    })
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message : 'Blog deleted successfully'
    })
})











app.listen(process.env.PORT,()=>{
    console.log("node is run sucess")
})

