document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Get id of any button clicked
  document.querySelectorAll("button")



  // By default, load the inbox
  load_mailbox('inbox');

  // Submit email form
  document.querySelector("#compose-form").onsubmit = submit_email
  // Get email


  document.querySelector('#inbox').addEventListener('click', () => get_email());



});


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

        let card_div = document.createElement("div");
        let card_body_div = document.createElement("div");
        let subj_div = document.createElement("h5");
        let sender_div = document.createElement("h6");
        let body_div = document.createElement("p");
        let timestamp = document.createElement("p")
        

        card_div.setAttribute("class", "card");
        card_body_div.setAttribute("class", "card-body")
        subj_div.setAttribute("class", "card-title")
        sender_div.setAttribute("class", "card-subtitle")
        body_div.setAttribute("class", "card-text");
        timestamp.setAttribute("class", "time-stamp")
        

        subj_div.innerHTML = emails[email].subject
        sender_div.innerHTML = emails[email].sender;
        body_div.innerHTML = emails[email].body;
        timestamp.innerHTML = emails[email].timestamp

        
        document.querySelector("#emails-view").appendChild(card_div);
        card_div.appendChild(card_body_div);
        card_body_div.appendChild(subj_div);
        card_body_div.appendChild(sender_div);
        card_body_div.appendChild(body_div);
        card_body_div.appendChild(timestamp);

        console.log(emails[email].id);
      }
    })


  fetch("emails/sent")
    .then(response => response.json())
    .then(emails => {

      for (email in emails) {

        let card_div = document.createElement("div");
        let card_body_div = document.createElement("div");
        let subj_div = document.createElement("h5");
        let sender_div = document.createElement("h6");
        let body_div = document.createElement("p");
        let timestamp = document.createElement("p")
        

        card_div.setAttribute("class", "card");
        card_body_div.setAttribute("class", "card-body")
        subj_div.setAttribute("class", "card-title")
        sender_div.setAttribute("class", "card-subtitle")
        body_div.setAttribute("class", "card-text");
        timestamp.setAttribute("class", "time-stamp")
        

        subj_div.innerHTML = emails[email].subject
        sender_div.innerHTML = emails[email].sender;
        body_div.innerHTML = emails[email].body;
        timestamp.innerHTML = emails[email].timestamp

        
        document.querySelector("#emails-view").appendChild(card_div);
        card_div.appendChild(card_body_div);
        card_body_div.appendChild(subj_div);
        card_body_div.appendChild(sender_div);
        card_body_div.appendChild(body_div);
        card_body_div.appendChild(timestamp);

        console.log(emails[email].id);
      }
    })
  console.log(email.id);
}















