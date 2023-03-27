// const{json}=require('express');
const express=require('express');
const bodyParser = require('body-parser')
const app=express();
const port=7000;

const db=require('./config/mongoose');
const questionRoutes=require('./routes/questionRoutes');
const optionRoutes=require('./routes/optionRoutes')


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/questions', questionRoutes);
app.use('/options',optionRoutes);

app.listen(port , function(err){
    if(err){
        console.log("Error while connecting to server",err);
        return;
    }
    console.log(`Server running on port ${port}`);
});