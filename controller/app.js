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