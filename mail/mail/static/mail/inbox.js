document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Listener for reply button on email view
  document.querySelector('#email-reply').addEventListener('click', reply_to_email);

  // Set eventListener for all buttons to return button id

  const buttons = document.querySelectorAll("button");
  buttons.forEach(function (btn) {
    btn.addEventListener('click', btnId
    )
  }, false
  );




  // Submit email form
  document.querySelector("#compose-form").onsubmit = submit_email;

  // Listener for inbox button click
  document.querySelector('#inbox').addEventListener('click', () => { get_email("inbox")});

  // Listener for sent button click
  document.querySelector('#sent').addEventListener('click', () => {get_email("sent")});

  // Listener for archive button click
  document.querySelector('#archived').addEventListener('click', () => { get_email("archive")});

  // By default, load the inbox
  load_mailbox('inbox');
  get_email("inbox");


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


function get_email(mailbox) {
  fetch("emails/" + mailbox)
    .then(response => response.json())
    .then(emails => {

      console.log(emails);

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


        timeStampHeader.innerHTML = timestamp;
        subjHeader.innerHTML = subj;
        senderHeader.innerHTML = sender;

        messageBox.appendChild(senderHeader);
        messageBox.appendChild(subjHeader);
        messageBox.appendChild(timeStampHeader);


        // Listener for each email entry to show in individual view
        messageBox.addEventListener('click', () => {
          view_email(email_id);
        });

        document.querySelector("#emails-view").appendChild(messageBox);

        if (emails[email].read === true) {
          messageBox.style.backgroundColor = "gray";
        }


      }
    })
  event.preventDefault();

}





// View archive mail
function view_archive_mail() {

  // Clear other mailbox views, show individual email view
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

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

      // Add listener for reply button
      document.querySelector('#email-reply').addEventListener('click', function () {
        // Go to compose form with properties of this email
        reply_to_email(email.id)
      });

      // Add listener for archive button
      document.querySelector('#email-archive').addEventListener('click', function () {
        add_to_archive(email.id)
      });

      let from = document.querySelector('#view-sender');
      let to = document.querySelector('#view-recipients');
      let subj = document.querySelector('#view-subject');
      let time = document.querySelector('#view-timestamp');
      let body = document.querySelector('#email-body');


      // Add data to form
      from.innerHTML = email.sender
      to.innerHTML = email.recipients
      subj.innerHTML = email.subject
      time.innerHTML = email.timestamp;
      body.innerHTML = email.body

      // Mark email as read
      isRead(email.id)


    })

}


function reply_to_email(id) {

  // Show compose view and hide other views
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  fetch('emails/' + id)
    .then(response => response.json())
    .then(email => {

      // Populate forms with values from viewed email
      let to = email.recipients;
      let from = email.sender
      let subj = email.subject;
      let body = email.body;
      let timestamp = email.timestamp;

      let to_field = document.querySelector('#compose-recipients');
      let subj_field = document.querySelector('#compose-subject');
      let body_field = document.querySelector('#compose-body');

      // Determine if subject already contains 'Re:' prefix
      let num = toString(subj).indexOf(":");
      console.log("This is the index of 'subject" + num)
      if (num === -1) {
        subj_field.value = "Re: " + subj;
      }
      else {
        subj_field.value = subj;

      }

      // Add reply header to body of reply email
      let reply_body = "On " + timestamp + ", " + from + " wrote: \n" + body

      // Add values to form
      to_field.value = to;
      body_field.innerHTML = reply_body;
    })

}

function add_to_archive(id) {
  fetch('/emails/' + id, {
    method: 'PUT',
    body: JSON.stringify({
      archived: true
    })
  })
  console.log("Email id:" + id + " has been archived.")
}


// Change read property in email database
function isRead(id) {
  fetch('/emails/' + id, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  })
  console.log("Email id:" + id + "has been marked read.")
}

// Return id field of clicked button
function btnId() {
  console.log("This button's id is:" + this.id);
}














