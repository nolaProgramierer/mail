document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  //Set eventListener for all buttons to return button id
  /*
  const buttons = document.querySelectorAll("button")
  buttons.forEach(function (btn) {
     btn.addEventListener("click", btn_id
    )
   });
  */


  // By default, load the inbox
  load_mailbox('inbox');

  // Submit email form
  document.querySelector("#compose-form").onsubmit = submit_email
  // Get email


  document.querySelector('#inbox').addEventListener('click', () => get_email());



});
// End DOMContentLoaded


// ......................................................
// Functions
// ......................................................


function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

// Function to retrieve form values, POST them,
// receive response and load "sent" mailbox
function submit_email() {
  let recipients = document.querySelector("#compose-recipients").value;
  let subject = document.querySelector("#compose-subject").value;
  let body = document.querySelector("#compose-body").value;

  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
    })

  load_mailbox("sent")
  return false;

}

function get_email() {
  fetch("emails/inbox")
    .then(response => response.json())
    .then(emails => {

      for (email in emails) {

        let messageBox = document.createElement("div");
        let timeStampHeader = document.createElement("span");
        let bodyHeader = document.createElement("span");
        let senderHeader = document.createElement("span")
        
        messageBox.setAttribute("class", "message-box");
        timeStampHeader.setAttribute("class", "time-stamp-header");
        bodyHeader.setAttribute("class", "body-header");
        senderHeader.setAttribute("class", "sender-header");

        timestamp = emails[email].timestamp
        body = emails[email].body
        sender = emails[email].sender

        
        timeStampHeader.append(timestamp);
        bodyHeader.append(body);
        senderHeader.append(sender);
        
        messageBox.appendChild(senderHeader);
        messageBox.appendChild(bodyHeader);
        messageBox.appendChild(timeStampHeader);
        
        document.querySelector("#emails-view").appendChild(messageBox);



        console.log("Email id is:" + emails[email].id);
      }
    })

}


function show_email(){}
















