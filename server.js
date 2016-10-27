var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var VALIDATION_TOKEN = "hello"

//supcription code
//EAAJZAcnZAh9mEBAOxOZClA6PdPIiAL7Td3lnDZBbTHZCuZBPs4GQkg93hZCIM4yCplFOcxWcSKpzQ52xZAYyFYRmpUdfFejZBDA98nuDfc22FskXfaMzBH9YzncAKZBBhEI0QBe21nhzSz4C4LHZBhI5csYMiFov3BCdoLZCel7eSZCQZAGAZDZD

app.use(bodyParser.json());

app.get("/", function(req,res){
  res.send("this is the home page");
});

app.post('/webhook', function (req, res) {
  var data = req.body;
  console.log(data);
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;
      console.log(pageEntry.messaging);

      //Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.message) {
          if (detectAnger(messagingEvent.message.text)  ){
           console.log("received angry message!!");
          }

         }else {
           console.log("receivedsome kind of messaging event that wasn't a message");
           console.log(messagingEvent);
         }

      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);

  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});
app.listen(process.env.PORT || 3000, function(){
  console.log("Server running");
});

function detectAnger(str){
str = str.toLowerCase();
if (str.indexOf("mierda")>= 0 || str.indexOf("fuck") >= 0 ||
str.indexOf("shit") >=0){
  return true;
}
else {
  return false;
}
}
