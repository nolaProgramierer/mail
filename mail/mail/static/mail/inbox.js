document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Set eventListener for all buttons to return button id

  const buttons = document.querySelectorAll("button");
  buttons.forEach(function (btn) {
    btn.addEventListener('click', btnId
    )
  }, false
  );




  // Submit email form
  document.querySelector("#compose-form").onsubmit = submit_email


  // Listener for inbox button click
  document.querySelector('#inbox').addEventListener('click', () => get_email());

  // Listener for sent button click
  document.querySelector('#sent').addEventListener('click', () => view_sent_mail());

  // Listener for archive button click
  document.querySelector('#archived').addEventListener('click', () => view_archive_mail());



  // By default, load the inbox
  load_mailbox('inbox');
  get_email();


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
  view_sent_mail()

  event.preventDefault();

}


function get_email() {
  fetch("emails/inbox")
    .then(response => response.json())
    .then(emails => {

      for (email in emails) {

        let messageBox = document.createElement("div");
        let timeStampHeader = document.createElement("span");
        let subjHeader = document.createElement("span");
        let senderHeader = document.createElement("span")

        messageBox.setAttribute("class", "message-box");
        timeStampHeader.setAttribute("class", "time-stamp-header");
        subjHeader.setAttribute("class", "body-header");
        senderHeader.setAttribute("class", "sender-header");

        timestamp = emails[email].timestamp
        subj = emails[email].subject
        sender = emails[email].sender
        let email_id = emails[email].id


        timeStampHeader.append(timestamp);
        subjHeader.append(subj);
        senderHeader.append(sender);

        messageBox.appendChild(senderHeader);
        messageBox.appendChild(subjHeader);
        messageBox.appendChild(timeStampHeader);

        messageBox.addEventListener('click', () => {
          view_email(email_id);
        }, false);

        document.querySelector("#emails-view").appendChild(messageBox);

        

        console.log("Email id is:" + emails[email].id);


      }
    })

}


// View sent mail
function view_sent_mail() {

  fetch("emails/sent")
    .then(response => response.json())
    .then(emails => {

      for (email in emails) {


        let messageBox = document.createElement("div");
        let timeStampHeader = document.createElement("span");
        let subjHeader = document.createElement("span");
        let senderHeader = document.createElement("span")

        messageBox.setAttribute("class", "message-box");
        timeStampHeader.setAttribute("class", "time-stamp-header");
        subjHeader.setAttribute("class", "body-header");
        senderHeader.setAttribute("class", "sender-header");

        timestamp = emails[email].timestamp
        subj = emails[email].subject
        sender = emails[email].sender
        id = emails[email].id


        timeStampHeader.append(timestamp);
        subjHeader.append(subj);
        senderHeader.append(sender);

        messageBox.appendChild(senderHeader);
        messageBox.appendChild(subjHeader);
        messageBox.appendChild(timeStampHeader);



        document.querySelector("#emails-view").appendChild(messageBox);


        btnId



      }
    })
  event.preventDefault();
}


// View archive mail
function view_archive_mail() {

  fetch("emails/archived")
    .then(response => response.json())
    .then(emails => {

      for (email in emails) {


        let messageBox = document.createElement("div");
        let timeStampHeader = document.createElement("span");
        let subjHeader = document.createElement("span");
        let senderHeader = document.createElement("span")

        messageBox.setAttribute("class", "message-box");
        timeStampHeader.setAttribute("class", "time-stamp-header");
        subjHeader.setAttribute("class", "body-header");
        senderHeader.setAttribute("class", "sender-header");

        timestamp = emails[email].timestamp
        subj = emails[email].subject
        sender = emails[email].sender


        timeStampHeader.append(timestamp);
        subjHeader.append(subj);
        senderHeader.append(sender);

        messageBox.appendChild(senderHeader);
        messageBox.appendChild(subjHeader);
        messageBox.appendChild(timeStampHeader);



        document.querySelector("#emails-view").appendChild(messageBox);


        console.log("Email id is:" + emails[email].id);
        btnId



      }
    })
  event.preventDefault();
}


// Function to view individual email
function view_email(id) {
  // Clear other mailbox views, show individual email view
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Set listener for email reply button
  reply_button = document.querySelector('#email-reply');
  reply_button.addEventListener('click', reply_to_email)

  // Get individual email
  fetch('/emails/' + id)
  .then(response => response.json())
  .then(email => {
    console.log(email.subject)

    let from = document.querySelector('#view-sender');
    let to = document.querySelector('#view-recipient');
    let subj = document.querySelector('#view-subject');
    let time = document.querySelector('#view-timestamp');
    let body = document.querySelector('#email-body')
    
    from.append(email.sender);
    to.append(email.recipients);
    subj.append(email.body)
    time.innerHTML = email.timestamp
    body.innerHTML = email.body

    // Mark email as read
    email.read = true

  })

}


function reply_to_email() {
  console.log("Replying to email")
}




function isRead(email) {
  if (email.read === true) {
    messageBox.style.backgroundColor = "gray";
    console.log(email.read)
  }
}

// Return id field of clicked button
function btnId() {
  console.log("This button's id is:" + this.id);
}














