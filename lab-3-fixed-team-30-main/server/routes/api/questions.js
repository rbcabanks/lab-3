
const express = require('express');
const router = express.Router();
// Question Data
const Questions = require('../../models/questions-data.json')
let idCounter = 1;
Questions.map((question) => {
  (question["id"] = (idCounter++).toString());
});

var QuestionsWithNoAnswer = []
Questions.forEach((questions) => {
  QuestionsWithNoAnswer.push({
    "question": questions.question,
    "options": questions.options,
    "id": questions.id
  })
})

// Hint: get a bonus task here
const shuffleArray = require('../../utils/shuffle');
/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 * 
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 * 
 */
router.get('/', (req, res) => {
  // This code is incharge of giving a response given a request. The request gets called in the front end by an HTTP GET call (in this case GET /api/questions) and responsed will the information wanted
  // in this case, the information wanted is the questions in the local Questions variable styles like the comment above
  // the req parameter represents the "request" that calls this. In this case we dont need anything from a request because we know what information we are getting. But for something like the request on line 90, there will be a "body" attribute on the request with what specific question it wants 
  // the res parameter represent the "response" to this HTTP call. On line 57 you can see that we use this to send the information we want to give back to the frontend
  // const data = [];
  // let idCounter = 1;
  // If you look at the questions-data.json file, the Questions are already in the format that comment wants, except it does not have an id. 
  // so on the json gotten from the file, I am creating the field "id" and setting it to a counter value. After this Questions looks like the wanted response 
  // so then it gets sent out from the response
  // (code moved to line 7)
  // Good note, if you open up Dev Tools in your browser where this is running, and you click the network tab, you can look at these html calls and the request and the responses
  // that are getting emited and it makes debugging super easy!!
  res.send(QuestionsWithNoAnswer)
})

/**
	@@ -71,10 +72,10 @@ router.get('/', (req, res) => {
 * }
 */
router.get('/count', (req, res) => {
  //saves the number of the json objects
  let count=Object.keys(Questions).length;
  //response sent
  res.send({"count":count})
})

/**
	@@ -92,13 +93,19 @@ router.get('/count', (req, res) => {
 * }
 */
router.get('/:qId', (req, res) => {
  var data;
  //checks if the request id given is equal to the id of the object
  QuestionsWithNoAnswer.forEach(questions => {
    //pushes the data into the array above
    if(questions.id===req.params.qId){
      data = questions
    }
  });
  res.send(data)
})

/**
 * Route details
 * api POST /api/questions/result
	@@ -120,7 +127,7 @@ router.get('/:qId', (req, res) => {
 *    total: (how many questions were there)
 * }
 */
    router.post('/result', (req, res) => {
      let score = 0;
      let total = Questions.length;
      Questions.forEach(question => {
        //Check each user answer to see if it matches answer
        if(question.answer === req.body[question.id]){
          score++ ;
        }
      })
      //Cutoff for passing is 60%
      let pass = ((score.toPrecision()/total.toPrecision()) >= 0.6) ? "passed" : "failed";
      res.send({'summary': pass, 'score': score, 'total': total});
    })

module.exports = router;