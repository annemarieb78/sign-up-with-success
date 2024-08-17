const form = document.getElementById("container-signup");
const email = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const emailValue = emailInput.value.trim();
  messageElement.className = "";
  messageElement.textContent = "";

  if (validateEmail(emailValue)) {
    sendDataToAPI(emailValue);
  } else {
    messageElement.className = "error";
    messageElement.textContent = "Please enter a valid email address.";
  }
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Assuming you have a real API endpoint to send email data

function sendDataToAPI(email) {
  const apiUrl = "https://api.apispreadsheets.com/data/viXsgKp9LABNAE2N/";
}

fetch(apiUrl, {
  method: "POST", // We are sending data, so we use POST
  headers: {
    "Content-Type": "application/json", // Tell the server we are sending JSON data
  },
  body: JSON.stringify({ email: email }), // Convert the email data to JSON format
})
  .then((response) => response.json()) // Convert the server's response to JSON
  .then((data) => {
    if (data.success) {
      // Handle successful response
      //   form.style.display = "none";
      //   successMessage.style.display = "block";
      messageElement.className = "success";
      messageElement.textContent =
        "Thanks for subscribing! A confirmation email has been sent to ${email}. Please open it and click the button inside to confirm your subscription";
    } else {
      // Handle error case
      message.textContent = "Something went wrong. Please try again.";
      message.style.color = "red";
    }
  })
  .catch((error) => {
    // Handle network errors
    message.textContent = "Network error. Please try again later.";
    message.style.color = "red";
  });
