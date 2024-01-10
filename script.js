// DOM selectors (variables that point to selected DOM elements) goes here :point_down:
const chat = document.getElementById("chat");

// Functions goes here :point_down:
// A function that will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // The if statement checks if the sender is the user and if that's the case it inserts
  // an HTML section inside the chat with the posted message from the user
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />
      </section>
    `;
    // The else if statement checks if the sender is the bot and if that's the case it inserts
    // an HTML section inside the chat with the posted message from the bot
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  }
  // This little thing makes the chat scroll to the last message when there are too many to
  // be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
};

// options for the function after
const decideIfInterested = (decision) => {
  showMessage(decision, "user");

//   if (decision.toLowerCase() === "yes") {
//     setTimeout(() => showMessage("Great, please provide your name.", "bot"), 1000);

if (decision === "Yes") {
    setTimeout(() => {
      showMessage("Great! What's your full name?", "bot");

    // Remove the 'yes' and 'no' buttons
    const decisionButtons = document.getElementById("decision-buttons");
    decisionButtons.parentNode.removeChild(decisionButtons);

      // Add an input form for the user's name
      const inputWrapperInput = document.getElementById("input-wrapper");
      inputWrapperInput.innerHTML += `
        <div id="name-input-form">
          <form onsubmit="handleNameInput(event)">
            <input type="text" id="nameInput" />
            <button type="submit">Submit</button>
          </form>
        </div>
      `;
    }, 1000);
    
  } else if (decision === "No") {
    setTimeout(() => showMessage("Ok. Bye", "bot"), 1000);

    // Remove the 'yes' and 'no' buttons
    const decisionButtons = document.getElementById("decision-buttons");
    decisionButtons.parentNode.removeChild(decisionButtons);


    // If not interested, two buttons (choices) appears
    const inputWrapperLink = document.getElementById("input-wrapper");
    inputWrapperLink.innerHTML += `
        <form action="https://arbetsformedlingen.se/other-languages/english-engelska" target="_blank">
            <input type="submit" value="Leave the page" />
        </form>
        `;
    inputWrapperLink.innerHTML += `
        <form action="https://statuesque-elf-9e2d22.netlify.app/" target="_blank">
            <input type="submit" value="Start again" />
        </form>
        `;
  }
};

// A function to start the conversation
const askIfInterested = () => {
  showMessage(
    "Hello there, are you interested in the recruitment process for Create&Cry Agency?",
    "bot"
  );

  const inputWrapperButton = document.getElementById("input-wrapper");
  inputWrapperButton.innerHTML += `
    <div id="decision-buttons">
      <button onclick="decideIfInterested('Yes')">Yes</button>
      <button onclick="decideIfInterested('No')">No</button>
    </div>
    `;

};

const handleNameInput = (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("nameInput");
    let name = nameInput.value;
    // Capitalize the first letter
    name = name.charAt(0).toUpperCase() + name.slice(1);
    showMessage(name, "user");
    nameInput.value = "";
  
    // After 1 second, ask for the user's email
    setTimeout(() => askForEmail(name), 1000);
  };
  
  const askForEmail = (name) => {
    showMessage(`Nice to meet you ${name}! What's your email address?`, "bot");
  
    // Clearing the existing content of the email input form
    const inputWrapperEmail = document.getElementById("input-wrapper");
    inputWrapperEmail.innerHTML = '';
  
    // Add an input form for the user's email
    inputWrapperEmail.innerHTML += `
      <div id="email-input-form">
        <form onsubmit="handleEmailInput(event)">
          <input type="email" id="emailInput" />
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
  };
  
  const handleEmailInput = (event) => {
    event.preventDefault();
    const emailInput = document.getElementById("emailInput");
    const email = emailInput.value.trim();
  
    if (email !== "") {
      showMessage(email, "user");
      emailInput.value = "";
  
      // After 1 second, show the next question or interaction by invoking the next function.
      // Pass the email along if needed.
      setTimeout(() => showNextQuestion(email), 1000);
    } else {
      // Handle the case where the user submits an empty email
      showMessage("Please provide a valid email address.", "bot");
    }
  };
  
  // ... (Your existing code)
  
  // Inside showNextQuestion function, handle the next question or interaction with the user
  const showNextQuestion = (email) => {
    // Modify this function to handle the next question or interaction with the user
    // using the user's email (email).
  };
  
  // ... (Your existing code)
  
  // Eventlisteners go here
  // Here we invoke the first function to get the chatbot to ask the first question when
  // the website is loaded. Normally we invoke functions like this: greeting()
  // To add a little delay to it, we can wrap it in a setTimeout (a built-in JavaScript function):
  // and pass along two arguments:
  // 1.) the function we want to delay, and 2.) the delay in milliseconds
  // This means the greeting function will be called one second after the website is loaded.
  setTimeout(askIfInterested, 1000);