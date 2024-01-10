// DOM selectors (variables that point to selected DOM elements) goes here :point_down:
const chat = document.getElementById('chat');
// Functions goes here :point_down:
// A function that will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // The if statement checks if the sender is the user and if that's the case it inserts
  // an HTML section inside the chat with the posted message from the user
  if (sender === 'user') {
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
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  };
  // This little thing makes the chat scroll to the last message when there are too many to
  // be shown in the chat box
  chat.scrollTop = chat.scrollHeight
}

// options for the function after
const decideIfInterested = (decision) => {
    if (decision === 'yes') {
        showMessage("Great, please provide your name.", 'bot')
    } else if (decision === 'no') {
        showMessage("Ok. Bye", 'bot')
    }
}

// A function to start the conversation
const askIfInterested = () => {
    showMessage("Hello there, are you interested in the recruitment process for Create&Cry Agency?", 'bot')
  
    const inputWrapperButton = document.getElementById('input-wrapper');
    inputWrapperButton.innerHTML += `
    <div id="decision-buttons">
      <button onclick="decideIfInterested('yes')">Yes</button>
      <button onclick="decideIfInterested('no')">No</button>
    </div>
    `;
  }


const handleNameInput = (event) => {
    event.preventDefault()
    // Store the value in a variable so we can access it after we 
      // clear it from the input
    const name = nameInput.value
    showMessage(name, 'user')
    nameInput.value = ''
  
    // After 1 second, show the next question by invoking the next function.
      // passing the name into it to have access to the user's name if we want
      // to use it in the next question from the bot.
    setTimeout(() => showFoodOptions(name), 1000)
  }


// Eventlisteners goes here
// Here we invoke the first function to get the chatbot to ask the first question when
// the website is loaded. Normally we invoke functions like this: greeting()
// To add a little delay to it, we can wrap it in a setTimeout (a built in JavaScript function):
// and pass along two arguments:
// 1.) the function we want to delay, and 2.) the delay in milliseconds
// This means the greeting function will be called one second after the website is loaded.
setTimeout(askIfInterested, 1000)
