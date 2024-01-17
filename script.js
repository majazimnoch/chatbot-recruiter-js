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
  inputWrapperEmail.innerHTML = "";

  // Add an input form for the user's email
  inputWrapperEmail.innerHTML += `
      <div class="input-form" id="email-input-form">
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
    setTimeout(() => whichRole(email), 1000);
  } else {
    // Handle the case where the user submits an empty email
    showMessage("Please provide a valid email address.", "bot");
  }
};

// Inside showNextQuestion function, handle the next question or interaction with the user
const whichRole = (email) => {
  showMessage(`${email} registered! What role are you applying for?`, "bot");

  // Remove the existing input form
  const inputWrapper = document.getElementById("input-wrapper");
  inputWrapper.innerHTML = "";

  // Add three buttons for the user to choose from
  inputWrapper.innerHTML += `
    <div id="role-buttons">
      <button onclick="chooseRole('Senior Art Director')">Senior Art Director</button>
      <button onclick="chooseRole('Managing Partner')">Managing Partner</button>
      <button onclick="chooseRole('Client Accountant')">Client Accountant</button>
    </div>
  `;
};

const chooseRole = (role) => {
  showMessage(`${role}`, "user");

  // Remove the existing input form
  const inputWrapper = document.getElementById("input-wrapper");
  inputWrapper.innerHTML = "";

  if (role === "Senior Art Director") {
    setTimeout(() => sadQuestion(), 1000);
  } else if (role === "Managing Partner") {
    setTimeout(() => mpQuestion(), 1000);
  } else if (role === "Client Accountant") {
    setTimeout(() => caQuestion(), 1000);
  }

  const sadQuestion = () => {
    showMessage("Do you have experience leading a team of creatives?", "bot");

    inputWrapper.innerHTML += `
    <div id="role-buttons">
        <button onclick="answerExperience('yes')">Yes</button>
        <button onclick="answerExperience('no')">No</button>
    </div>
    `;
  };

  const mpQuestion = () => {
    showMessage("Do you have experience managing creative agencies?", "bot");

    inputWrapper.innerHTML += `
    <div id="role-buttons">
        <button onclick="answerExperience('yes')">Yes</button>
        <button onclick="answerExperience('no')">No</button>
    </div>
    `;
  };

  const caQuestion = () => {
    showMessage("Do you have experience working with campaigns?", "bot");

    inputWrapper.innerHTML += `
    <div id="role-buttons">
        <button onclick="answerExperience('yes')">Yes</button>
        <button onclick="answerExperience('no')">No</button>
    </div>
    `;
  };
};

const answerExperience = (response) => {
  showMessage(response, "user");

  if (response === "yes") {
    // If the user has experience, ask about salary expectations
    setTimeout(() => salaryExpectation(), 1000);
  } else {
    // Remove the existing input form
    const inputWrapper = document.getElementById("input-wrapper");
    inputWrapper.innerHTML = "";

    // Handle the case where the user does not have experience
    showMessage(
      "Thank you for sharing your experience with us. We look for someone with experience in that field, so we will not consider your application.",
      "bot"
    );

    // Show the additional message for 3 seconds and then redirect
    setTimeout(() => {
      showMessage("You will now be redirected to another page.", "bot");
      
      setTimeout(() => {
        window.location.href = "https://arbetsformedlingen.se/other-languages/english-engelska";
      }, 3000);
    }, 5000);
  }
};

const handleSalaryInput = (event) => {
  event.preventDefault();
  const salaryInput = document.getElementById("salaryInput"); // Corrected ID
  const salary = salaryInput.value.trim();

  if (salary !== "") {
    showMessage(`Salary expectations: ${salary}`, "user");
    salaryInput.value = "";

    // After showing salary expectations, call the final message function
    setTimeout(() => finalMessage(), 1000);
  } else {
    showMessage("Please, provide your salary expectations", "bot");
  }
};

const salaryExpectation = () => {
  showMessage("What's your monthly salary expectation? In Swedish krona", "bot");

  // Remove the existing input form
  const inputWrapper = document.getElementById("input-wrapper");
  inputWrapper.innerHTML = "";

  const salaryWrapper = document.getElementById("input-wrapper");
  salaryWrapper.innerHTML += `
    <div id="input-salary">
      <form onsubmit="handleSalaryInput(event)">
        <input type="text" id="salaryInput" />
        <button type="submit">Submit</button>
      </form>
    </div>
    `;
};

const finalMessage = () => {
  showMessage("Thank you for taking your time to answer this questions!");
  showMessage("We think that you are a brilliant candidate!");
  showMessage("One of our Talent Managers will contact your in no time");
};

// Here we invoke the first function to get the chatbot to ask the first question when
// the website is loaded. Normally we invoke functions like this: greeting()
// To add a little delay to it, we can wrap it in a setTimeout (a built-in JavaScript function):
// and pass along two arguments:
// 1.) the function we want to delay, and 2.) the delay in milliseconds
// This means the greeting function will be called one second after the website is loaded.
setTimeout(askIfInterested, 1000);
