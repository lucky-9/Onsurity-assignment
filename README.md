# Onsurity-assignment

There are Two GET api's which gives the requierd results and the domain name is stack-ex
1)Route for First Question
  http://stack-ex.herokuapp.com/questions/:tag
  we can given any tagname as tag route param and the resulting response will give 10 questions sorted on decreasing creation date
  if the tag name was invalid it will return a error saying that no questions found with the given tag with a status code of 404
2)Route for Second Question
  http://stack-ex.herokuapp.com/questions/:id
  we can give any question id as the id route param.
  if the id is valid then the response will contain the question and accepted answer if it has else array of answer sorted in decreasing 
  of upvotes
  
  if the id is invalid it will return 404 error with an error message of no question found with given id
  
 
 
 
Test cases run:
 pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});
