// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAd3FR21ns0NKvJB8gnf34rILlCQplk47Y",
  authDomain: "test-form-8b77d.firebaseapp.com",
  databaseURL: "https://test-form-8b77d-default-rtdb.firebaseio.com",
  projectId: "test-form-8b77d",
  storageBucket: "test-form-8b77d.appspot.com",
  messagingSenderId: "830797395050",
  appId: "1:830797395050:web:7ebbe3b809ab9511480613"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  // console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();

  sendEmail(name, email, message);
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });

  retrieveInfos();
}

function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);
}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for(let i = 0; i < keys.length; i++){
    let infoData = keys[i];
    let name = info[infoData].name;
    let email = info[infoData].email;
    let message = info[infoData].message;
    console.log(name, email, message);

    let infoResults = document.querySelector(".infoResults");

    infoResults.innerHTML += `<div>
    <p><strong>Name: </strong>${name} <br>
    <a><strong>Email: </strong>${email}</a><br>
    <a><strong>Message: </strong>${message}</a>
    <p>
    </div>`;
  }
}

retrieveInfos();

function sendEmail(name, email, message){
  Email.send({
    Host: "smtp.gmail.com",
    Username: "deep.gagan102@gmail.com",
    Password: "ozapmcolkcjdnhob",
    To: "deep.gagan102@gmail.com",
    From: "deep.gagan102@gmail.com",
    Subject: `${name} sent you a message`,
    Body: `'Name: ${name}<br> Email: ${email} <br> Message: ${message}`,
  }).then((message) => alert("mail has been successfully sent"));
}