const control_of_toggle_btn = document.getElementById("toggle");
  control_of_toggle_btn.addEventListener( 'click' , function(){
    document.body.classList.toggle("dark-theme");
  });

const control_of_admin_btn = document.getElementById("admin-btn");
const control_of_user_response = document.getElementById("user-response");
const control_of_admin_section = document.getElementById("admin-login");
  control_of_admin_btn.addEventListener( 'click' , function(){
    control_of_admin_section.style.display="block";
  });

const db_url="https://script.google.com/macros/s/AKfycbxxfnnR2B054Q5fgv1JD2rAMpuJMqKs65TG1p_qzx9HdURMvkbhekEmWA2kIPt4c2ok/exec" 

const control_of_contact_form = document.getElementById("contact-form");
  control_of_contact_form.addEventListener( 'submit' , async function(event){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let msg = document.getElementById("message").value;
    let date = new Date().toLocaleString();

    try {
     let response = await fetch (
    db_url, 
    {
      method: "POST",
      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },
      body: JSON.stringify({ 
        action: "save_message",
        name: name,
        email: email,
        msg: msg
      })
        
    }
  );
  
  let result = await response.json();
  if (result.success) {
    alert("Message submitted, will get back to you shortly!");
  }
  else{
    alert("Message could not be saved!");
  }
}
  catch(error){
    console.error(error);
    alert("There was a problem submitting the message!");
  }
});

const control_of_admin_form = document.getElementById("admin-form");
  control_of_admin_form.addEventListener( 'submit' , async function(event){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    

    try {
     let response = await fetch (
    db_url, 
    {
      method: "POST",
      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },
      body: JSON.stringify({ 
        action: "login",
        username: username,
        password: password,
        
      })
        
        
    }
  );
  
  let result = await response.json();
  if (result.success) {
    alert("login successfull");

    control_of_admin_section.style.display="none";
    control_of_user_response.style.display="block";

    getusermessage();      //function call

  } 
  else{
    alert("Access denied, please try again!");
  }
}
  catch(error){
    console.error(error);
    alert("There was a problem in login!");
  }
})


async function getusermessage() {
  try{
    let respone = await fetch(
      db_url, 
    );
    
    let result = await response.json();
    if(!result.success){
       alert("could not fetch the message!");
      return;
    }
    const control_of_user_msg_div = document.getElementById("user-msg");

    result.message.forEach(
      responses => {
        let control_of_new_div = document.createElement("div");

        let namepara = document.createElement("p");
        namepara.textContent ="Name: " + responses.name;

        let emailpara = document.createElement("p");
        emailpara.textContent ="Email: " + responses.email;

        let messagepara = document.createElement("p");
        messagepara.textContent ="Message: " + responses.msg;

        let datepara = document.createElement("p");
        datepara.textContent ="Date: " + responses.date;

        let seperator = document.createElement("hr");

        control_of_user_new_div.appendchild(namepara);

        control_of_user_new_div.appendchild(emailpara);

        control_of_user_new_div.appendchild(messagepara);

        control_of_user_new_div.appendchild(datepara);

        control_of_user_new_div.appendchild(seperator);

        control_of_user_msg_div.appendchild(control_of_user_new_div);
      }
    )
  }
  catch(error){
    console.error(error);
    alert("There was a problem in fetching message from DB!");
    
  }
}









