# Chatbot made with JavaScript

## Intro
This is a chatbot made in HTML, CSS, JavaScript. It's themed as a recruiter-screening chatbot. A user is supposed to be an applicant who applies for a job and the bot asks questions about name, email address, what kind of job they reply and how much experience they have. 

## Breaking down the code
I use plenty of conditional statements.
The code starts by obtaining a reference to the HTML element with the if "chat" using `document.getElementById("chat")`
One of the most crucial function is `const showMessage` which checks if the sender is the user or the bot. This function takes two parametres - `message` and `sender`. 
`chat.scrollTop = chat.scrollHeight;` - scrollTop and scrollHeight properties - This ensures that the chat interface is scrolled to the bottom, revealing the most recent message.
I use a lot of `setTimeout` function that allows to postpone calling a chosen function by a chosen value. 

## Demo
Click <a href="https://statuesque-elf-9e2d22.netlify.app/"> here </a>.