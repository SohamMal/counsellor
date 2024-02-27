const express=require('express');
const {Colleges, Branches, Categories, Cutoff} = require('../../backend/db/index');
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

app.post('/colleges', async (req, res)=>{
    const college_code=req.body.college_code;
    const college_name=req.body.college_name;
    const college_location=req.body.college_location;
    await Colleges.create({
        college_code,
        college_name,
        college_location
    })

    res.status(200).json({
        msg:"Successfully Enterd"
    });
})

app.post('/cuttoff', async (req, res)=>{
    const college_code=req.body.college_code;
    const college=await Colleges.findOne({
        college_code
    });
    const college_id=college._id;
    const branch_name=req.body.branch;
    const branch=await Branches.findOne({
        branch_name
    })
    const branch_id=branch._id;
    const category_name=req.body.category;
    const category=await Categories.findOne({
        category_name
    })
    const category_id=category._id;
    const gender=req.body.gender;
    const cuttoff=req.body.cuttoff;
    console.log(cuttoff);
    try{
        await Cutoff.create({
            branch_id,
            college_id,
            category_id,
            gender,
            cuttoff
        })
        res.status(200).json({
            msg:"Successfully added"
        })
    }catch(e){
        res.status(400).json({
            msg:"Error"
        })
    }
})    

app.listen(4000, ()=>{
    console.log("Server Started");
})