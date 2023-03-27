const mongoose=require('mongoose');

const optionSchema=new mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    questions:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    votes:
    {
        type:Number
    },
    votes_link:
    {
        type:String
    }
},{
        timestamps:true
});

const Option=mongoose.model('Option',optionSchema);

module.exports=Option;