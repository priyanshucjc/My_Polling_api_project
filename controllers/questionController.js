
const mongoose = require('mongoose');

// import models
const Question = require('../models/questions');
const Option = require('../models/options');


// create question
exports.createQuestion = async (req, res)=>{
    try{
       
        const question = await Question.findOne({content:req.body.content});
        // if question is created then return json response
        if(question){
            console.log(question);
            return res.status(400).json({
               message : "Question is alraedy there" 
            });
        }else{
            // if no question has been created then create a question
            await Question.create(req.body);
            return res.status(200).json({
                data : { message : "Question has been added" }
            });
            console.log(question);
        }
    }catch(err){
        console.log(err);
        return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
    }
};



// view question
module.exports.viewQuestions = async function(req, res){
  console.log("viewing questions");
    try{

        let question = await Question.findById(req.params.id).populate('options');
        console.log(question);
        return res.json({ question });
        

    }catch(err){

        return res.status(500).json({
            data : {
                message : "Internal server error viewing question"
            }
        });

    }

}



// delete question
module.exports.deleteQuestion = async function(req, res){

    try{

        let id = req.params.id;
        let question = await Question.findById(id).populate({
            path : 'options',
            select : 'votes',
        });

        if(question){
            // any votes on any option (if any)
            let options = question.options;

            for(let i = 0; i < options.length; i++){
                if(options[i].votes > 0){
                    return res.status(404).json({
                        data : {
                            message : "questions option has some votes, Not possible to delete",
                        }
                    });
                }
            }

            // if no any votes on any option of question
            await Option.deleteMany({ question:id });
            await Question.findByIdAndDelete(id);

            return res.status(200).json({
                message : "Question deleted successfully",
            });

        }else{
            return res.status(404).json({ message : "Question not found" });
        }

    }catch(err){
        return res.status(500).json({
            message : "Internal server error, deleting question",
        });
    }

}