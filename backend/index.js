const express=require('express');
const jwt=require('jsonwebtoken');
const cors=require('cors');
const {secret}=require('./../secret/config');
const {Colleges, Branches, Categories, Cutoff, UserInfo, Users} = require('./db/index');
const {validUser}=require('./middlewares/validUser');

const app=express();

app.use(cors());
app.use(express.json());

app.post('/signin', async (req, res)=>{
    const username=req.body.username;
    const password=req.body.password;
    try{
        const user=await Users.findOne({ 
            username,
            password
        });
        if(user){
            const token=jwt.sign({
                user_id:user._id
            }, secret);
            res.status(200).json({
                msg:"Signed In",
                token
            })
        }else{
            res.status(404).json({
                msg:"User Not Found"
            })
        }
    }catch(e){
        res.status(404).json({
            msg:"Internal Server Error"
        })
    }
});

app.post('/signup', async (req, res)=>{
    const username=req.body.username;
    const password=req.body.password;
    try{
        const user=await Users.findOne({
            username
        });
        if(user){
            res.status(409).json({
                msg:"Username Already Exists"
            })
        }
        else{
            try{
                await Users.create({
                    username,
                    password
                })
                const user=await Users.findOne({
                    username
                })
                const token=jwt.sign({
                    user_id:user._id
                }, secret);
                res.status(200).json({
                    msg:"User Created",
                    token
                });
            }catch(e){
                res.status(500).json({
                    msg:"Interval Server Error"
                })
            }
        }
    }catch(e){
        res.status(404).json({
            msg:"Error"
        })
    }
});

app.post('/userInfo',validUser, async (req, res) => {
    const fullname = req.body.fullname;
    const gender = req.body.gender;
    const category_name= req.body.category;
    const category=await Categories.findOne({
        category_name
    })
    const category_id=category._id;
    const branch_interests = req.body.branch_interests; // Array
    const branch_interests_id = await Promise.all(branch_interests.map(async e => {
        const branch = await Branches.findOne({
            branch_name: e
        });
        return branch._id;
    }));
    const percentile = req.body.percentile;
    const location_interests = req.body.location_interests; // Array
    const user_id = req.user_id;
    
    try {
        await UserInfo.create({
            user_id,
            fullname,
            gender,
            category_id,
            branch_interests_id,
            percentile,
            location_interests
        });
        res.status(200).json({
            msg: "UserInfo Stored"
        });
    }catch (e) {
        console.error(e); 
        res.status(400).json({
            msg: "Error in UserInfo storage"
        });
    }
    
});


app.get('/list', validUser, async (req, res)=>{
    const user_id=req.user_id;
    const userinfo=await UserInfo.findOne({
        user_id
    });

    const gender=userinfo.gender;
    
    const category_id=userinfo.category_id;
    const branch_interests=userinfo.branch_interests_id; //considering that i get array from the client side
    const location_interests=userinfo.location_interests; //considering that i get array from the client side
    const percentile=userinfo.percentile;
    const finalPercentile=percentile+3;
    try{
        const first_list=await Cutoff.find({
            gender,
            category_id,
            cuttoff: { 
                $lte: finalPercentile 
            },
            branch_id: { $in: branch_interests }
        });
        const second_list=await Promise.all(first_list.map(async e=>{
            const college=await Colleges.findOne({
                _id:e.college_id
            })
            const college_name=college.college_name;
            const college_code=college.college_code;
            const college_location=college.college_location;

            const branch=await Branches.findOne({
                _id:e.branch_id
            })
            const branch_name=branch.branch_full_name;
            const cuttoff=e.cuttoff
            return {
                college_name,
                college_code,
                college_location,
                branch_name,
                cuttoff
            }
        }));

        const filteredList = second_list.filter(e => location_interests.includes(e.college_location));

        const final_list = await Promise.all(filteredList.map(async e => {
            // Process each item asynchronously if needed
        return e;
        }));

        res.json({
            msg: "List is created",
            final_list
        });
    }catch(e){
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
});

app.get('tut', validUser, async (req, res)=>{

});

app.listen(3000, ()=>{
    console.log("Server Started");
})