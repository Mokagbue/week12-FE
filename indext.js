let form = document.getElementById("form");
let input = document.getElementById("input");
let author = document.getElementById("author");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

//this will hold our user post submissions, "mock server"
let data = [];

class DataObj {
  constructor(author, post) {
    this.author = author;
    this.post = post;
  }
}

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
  msg.innerHTML = "post added";
  let newPost = new DataObj(author.value, input.value);
  data.push(newPost);
  //   data["text"] = input.value;

  displayPosts();
  console.log("post added:", data);
  console.log("new posts:", newPost);
};

let displayPosts = () => {
  let displayCurrent = data.slice(-1);
  let name = displayCurrent[0].author;
  let note = displayCurrent[0].post;

  posts.innerHTML += `
  <div class="post-content d-flex justify-content-center flex-row">
    <div class="border"> 
      <p class="content px-3">${note}</p>
      <p class="author p-3">- ${name}</p>
    </div>
    <div class=" d-flex justify-content-center align-items-center">
        <span class="options d-flex flex-column ">
        <button class="btn btn-outline-warning m-1"><img onClick="editPost(this)" src="001-pen.png" alt="flaticon"></img></button>
        <button class="btn btn-outline-danger m-1"><img onClick="deletePost(this)" src="002-delete.png" alt="flaticon"></img></button>
        </span>
    </div>
  </div>`;

  //^'this' refers to the object wrapping the post and those specific buttons.
  //so when 'edit' or 'delete' are clicked they will interact with their obj

  //this sets the input box back to empty after submission
  input.value = "";
  author.value = "";
};

let deletePost = (event) => {
  //grabs the post
  event.parentElement.parentElement.parentElement.previousElementSibling.remove();
  //grabs the buttons
  event.parentElement.parentElement.remove();
  console.log("deleted?", data);

  msg.innerHTML = "";
};

let editPost = (event) => {
  //previousElementSibling.children is how we are targeting the post and author nodes to edit: https://www.w3schools.com/jsref/prop_element_previouselementsibling.asp
  input.value =
    event.parentElement.parentElement.parentElement.previousElementSibling.children[0].innerHTML;
  author.value =
    event.parentElement.parentElement.parentElement.previousElementSibling.children[1].innerHTML;

  //if a post is selected to edit, it is removed as a created post
  //we aren't dealing in ids so we are basically 'copying' the
  //input text value and putting it in the input field to 'edit'(making a whole new post/obj)
  // and then deleting the old post and buttons
  deletePost(event);
};
