const express = require("express");
const cors = require("cors");
const {getQuestions, getQuestionAndAnswerById} = require('./controller/app');

const app = express();
const PORT = 3000;

app.use(cors());

app.get(`/questions/:tag`, getQuestions);
app.get(`/question/:id`, getQuestionAndAnswerById);


app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`);
})