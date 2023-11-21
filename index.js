document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dobInput = document.getElementById("dob");
  var dob = new Date(dobInput.value);
  var termsCheckbox = document.getElementById("termsCheckbox");

  // Additional validation for date of birth
  var currentDate = new Date();
  var minDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
  var maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

  if (dob < minDate || dob > maxDate) {
    alert("Please enter a valid date of birth between 18 and 55 years old.");
    return;
  }

  // Save the user data
  var userData = JSON.parse(localStorage.getItem("userData")) || [];
  userData.push({
    name: name,
    email: email,
    password: password,
    dob: dobInput.value,
    acceptedTerms: termsCheckbox.checked
  });

  localStorage.setItem("userData", JSON.stringify(userData));

  // Display the updated user data in the table
  loadSavedData();

  // Clear the form fields
  this.reset();
});

// Load saved data from web storage on page load
document.addEventListener("DOMContentLoaded", function() {
  loadSavedData();
});

// Load data from web storage
function loadSavedData() {
  var userData = JSON.parse(localStorage.getItem("userData")) || [];
  displayUserData(userData);
}

// Display user data in the table
function displayUserData(userData) {
  var tableBody = document.getElementById("userData");
  tableBody.innerHTML = "";

  userData.forEach(function(user) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = user.name;
    cell2.innerHTML = user.email;
    cell3.innerHTML = user.password;
    cell4.innerHTML = user.dob;
    cell5.innerHTML = user.acceptedTerms ? "Yes" : "No";
  });
}
