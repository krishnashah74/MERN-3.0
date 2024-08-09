const express=require("express")
const app=express();

app.get("/",(req,res)=>{
    res.json({
        message:"Jay Nepal"
    })
})


app.listen(3000,()=>{
    console.log("node is run secess")
})