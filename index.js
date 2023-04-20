let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

//this will hold our user post submissions, "mock server"
let data = {};

//submit eventlistener, with preventDefault to stop...
//target the submit button, on e (event),
//first we will add form validation
form.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidation();

  //testing
  console.log("submit button clicked");
});

let formValidation = () => {
  let validation =
    input.value === ""
      ? (msg.innerHTML = "Submissions can't be blank.")
      : addPost();

  return validation;
};

//we collect the posts made by the user and store them in our mock server: "data" object
let addPost = () => {
  msg.innerHTML = "submission successful";
  data["text"] = input.value;

  createPost();
  console.log("post added:", data);
};

let createPost = () => {
  posts.innerHTML += `
  <div class="border d-flex justify-content-center flex-row">
    <p>${data.text}</p>
    <span class="options">
    <img onClick="editPost(this)" src="001-pen.png" alt="flaticon"></img>
    <img onClick="deletePost(this)" src="002-delete.png" alt="flaticon"></img>
    </span>
  </div>`;
  //^'this' refers to the object wrapping the post and those specific buttons.
  //so when 'edit' or 'delete' are clicked they will interact with their obj

  //this sets the input box back to empty after submission
  input.value = "";
};

let deletePost = (event) => {
    //we write .parentElement twice as the delete button is wrapped in a div and a span
    event.parentElement.parentElement.remove();
}

let editPost = (event) => {
    //previousElementSibling is how we are targeting the poat to edit: https://www.w3schools.com/jsref/prop_element_previouselementsibling.asp
    input.value = event.parentElement.previousElementSibling.innerHTML;

    //if a post is selected to edit, it is removed as a created post
    //we aren't dealing in ids so we are basically 'copying' the
    //input text value and putting it in the input field to 'edit'
    event.parentElement.parentElement.remove();
}
