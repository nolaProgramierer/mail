document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  //Set eventListener for all buttons to return button id
  
  const buttons = document.querySelectorAll("button")
  buttons.forEach(function (btn) {
     btn.addEventListener("click", btnId
     )}
   );
  


  // By default, load the inbox
  load_mailbox('inbox');

  // Submit email form
  document.querySelector("#compose-form").onsubmit = submit_email
  
  
  
  // Get email
  document.querySelector('#inbox').addEventListener('click', () => get_email());

  // View sent mail
  document.querySelector('#sent').addEventListener('click', ()  => view_sent_mail());



});
// End DOMContentLoaded


// ......................................................
// Functions
// ......................................................


function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function compose_reply() {
  compose_email();

  //document.querySelector('#emails-view').style.display = 'none';
  //document.querySelector('#compose-view').style.display = 'block';

  document.querySelector('#compose-recipients').value = //...
  document.querySelector('#compose-subject').value = // 'Re plus compose_email
  document.querySelector('#compose-body').value = '';
}



function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#email-view').style.display = 'none';
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

    // Flush the input fields
    recipients.value = "";
    subject.value = "";
    body.value = "";

  load_mailbox("sent")

  event.preventDefault();

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

        isRead(emails[email]);
 
        console.log("Email id is:" + emails[email].id);
        btnId
      }
    })

}

function view_sent_mail() {

  fetch("emails/sent")
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
          btnId
  

      
      }
    })

}







function isRead(email) {
  if (email.read === true) {
    messageBox.style.backgroundColor = "gray";
  }
}

// Return id field of clicked button
function btnId() {
  console.log(this.id)
}












