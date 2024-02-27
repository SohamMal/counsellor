const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Soham%4001@cluster0.mtb58px.mongodb.net/Counsellor');

const collegesSchema = new mongoose.Schema({
    college_name: String,
    college_code: Number,
    college_location: String
});


const branchesSchema = new mongoose.Schema({
    branch_name: String,
    branch_full_name:String
});

const categoriesSchema = new mongoose.Schema({
    category_name: String
});

const colWiseCutOffSchema = new mongoose.Schema({
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branches'
    },
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colleges'
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    gender: String,
    cuttoff: Number
});

const UserSchema= new mongoose.Schema({
    username:String,
    password:String
})

const UserInfoSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    fullname:String,
    gender:String,
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories'
    },
    branch_interests_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branches'
    }],
    location_interests:[String],
    percentile:Number,
});

const Colleges = mongoose.model('Colleges', collegesSchema);
const Branches = mongoose.model('Branches', branchesSchema);
const Categories = mongoose.model('Categories', categoriesSchema);
const Cutoff = mongoose.model('Cutoffs', colWiseCutOffSchema);
const UserInfo = mongoose.model('UserInfo', UserInfoSchema);
const Users=mongoose.model('Users', UserSchema);

console.log("DB DONE");
module.exports = {
    Colleges,
    Branches,
    Categories,
    Cutoff,
    UserInfo,
    Users
};
