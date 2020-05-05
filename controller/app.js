const axios = require("axios");

exports.getQuestions = async (req, res) =>{
    const tag = req.params.tag.toLowerCase();
    const baseURL = 'https://api.stackexchange.com/2.2/questions';
    const pageCount = 10;
    const sortingOrder = "desc";
    const sortingType = "creation";
    const filter = '!-MH(Kh0*v6Z*sUlnYEUYB0onDz_**Etxy'
try {
    const {data}=   await axios.get(`${baseURL}?pagesize=${pageCount}&order=${sortingOrder}&sort=${sortingType}&tagged=${tag}&site=stackoverflow&filter=${filter}`)
    if(!data){
        return res.status(400).json({"error":"Error getting data from API"})
    }
    if(data.items.length == 0){
      return res.status(404).json({"error":"No Questions found with the given Tag"});
    }
    const result = {};
    result.questions = [];
    data.items.forEach(element => {
        result.questions.push(element.body_markdown);
    });
    res.send(result);
} catch (error) {
    console.log(error);
    if(error.response.status === 400){
        const {data} = error.response;
        console.log(data);
        return res.status(`${data.error_id}`).json({"error":data.error_message})
    }
    res.send(error);
} 

}



exports.getQuestionAndAnswerById =async (req, res) =>{
    const questionId = req.params.id;
    const baseURL = 'https://api.stackexchange.com/2.2/questions';
    const sortingOrder = "desc";
    const sortingType = "activity";
    const filter = "!gB66oJbwvcV5_SNQGr3pgk*OSwlpZKHU8qP"

    try {
        const {data} = await axios.get(`${baseURL}/${questionId}?order=${sortingOrder}&sort=${sortingType}&site=stackoverflow&filter=${filter}`);
        if(data.items.length == 0){
            return res.status(404).json({"error":"No Questions found with the given ID"});
        }
        if(data.items[0].is_answered){
            const result = {};
            result.question =  data.items[0].body;
            result.answer =  data.items[0].answers.filter((answer) => answer.is_accepted == true);
            return res.send(result);
        }
        const result = {};
        result.question = data.items[0].body;
        result.answer = data.items[0].answers;
        res.send(result);
    } catch (error) {
        console.log(error);
        if(error.response.status === 400){
            const {data} = error.response;
            console.log(data);
            return res.status(`${data.error_id}`).json({"error":data.error_message})
        }
        res.send(error);
    }
}