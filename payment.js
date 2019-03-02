var count;

//fetch the number of participants from firebase
function getDataFromDatabase() {
    var database = firebase.database();
    var forward = database.ref('addedParticipantsByParent');
    forward.on('value', gotData, errData);
}

getDataFromDatabase();

function gotData(data) {
    var participants = data.val();
    var keys = Object.keys(participants);
    count=keys.length;
}

function errData(err) {
    if(err)
        console.log('Error', err);
}

//Total amount to be paid by user
pay_amount= 849*count;


//creation of payment request
// function Payment(){
//
//   var request= require('request');
//
//   var headers = { 'X-Api-Key': '7152cbc7d3715cf6843a4b0b41a6aa02', 'X-Auth-Token': '44f5c92384ce43fa732a4767407fc80d'}
//   var payload = {
//     purpose: 'Conferencia De Youth',
//     amount: pay_amount,
//
//     redirect_url: 'http://localhost:4001/welcome',
//     send_email: true,
//     webhook: 'https://webhook.site/f72ed4aa-de39-4528-a64d-65fe56711427',
//     send_sms: true,
//     allow_repeated_payments: false
// }
//
//     request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
//         if(!error && response.statusCode == 201){
//           console.log(body);
//         }
//     })
// }

function makePayment() {
  var Insta = require('instamojo-nodejs');
  Insta.setKeys("7152cbc7d3715cf6843a4b0b41a6aa02", "44f5c92384ce43fa732a4767407fc80d");

  var data = new Insta.PaymentData();

  data.purpose = "Test";            // REQUIRED
  data.amount = 9;                  // REQUIRED
  data.setRedirectUrl("http://localhost:4001/welcome");

  Insta.createPayment(data, function(error, response) {
    if (error) {
      // some error
      console.log(error);
    } else {
      // Payment redirection link at response.payment_request.longurl
      console.log(response);
    }
  });
}
