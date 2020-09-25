var userName = document.getElementById("addUser");
var userEmail = document.getElementById("addEmail");
var list = document.getElementById("listContact");



// firebase.database().ref('users/' + getId + '/' + 'Contacts/' + userName.value + '/' + userEmail.value).on('child_added', (data) => {
//   var getMessagesFromDatabase = data.val().messages;
//   var setKeyfromDatabase = data.key;
//   let msgBox = document.getElementById("messageBox");
//   // let messages = document.getElementById("sendMessages");
//   var addingp = document.createElement("p");
//   addingp.setAttribute("class", "bg-primary d-flex justify-content-end text-white p-2")
//   addingp.setAttribute("style", "border-radius: 10px")
//   addingp.setAttribute("id", "showMessages")

//   let getMessages = document.createTextNode(getMessagesFromDatabase);
//   addingp.appendChild(getMessages)
//   msgBox.appendChild(addingp);
// })





let displayPreviousUsers = (Id) => {

  firebase.database().ref('users/' + Id + '/' + 'Contacts').on('child_added', (data) => {
    var name = data.val().contactname;
    var contactId = data.key
    var addingtr = document.createElement("tr")
    list.appendChild(addingtr);


    var addingtd = document.createElement("td")
    addingtr.appendChild(addingtd);

    var addingA = document.createElement("a")
    var AText = document.createTextNode(name);

    addingA.appendChild(AText)
    addingA.setAttribute("onclick", "displayName(this)")
    // addingLi.setAttribute("id", setKeyfromDatabase);

    addingA.setAttribute("id", contactId)
    addingtd.appendChild(addingA);
  })

}


let loginGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);

    var userId = firebase.auth().currentUser.uid;
    var name = user.displayName;
    var email = user.email;
    var imageUrl = user.photoURL;

    console.log(userId, name, email, imageUrl)

    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });


    var pfp = document.getElementById("avatar");
    pfp.setAttribute("src", imageUrl)
    pfp.parentNode.setAttribute("Id", userId)
    console.log(pfp.parentNode);

    alert("Login Successfully")
    // displayPreviousUsers(userId)

  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorMessage)
  });


}

let addContact = () => {

  var getavatar = document.getElementById("avatar");
  var getNode = getavatar.parentNode;
  const getId = getNode.getAttribute("id");
  console.log(getId)

  if (getId == "null") {
    alert("User must be logged In First")
  }
  else {

    if (userName.value == "" || userEmail.value == "") {
      alert("Name and Email cannot be null")
    }

    else {
      var list = document.getElementById("listContact");
      var addingtr = document.createElement("tr")
      list.appendChild(addingtr);


      var addingtd = document.createElement("td")
      addingtr.appendChild(addingtd);

      var addingA = document.createElement("a")
      var AText = document.createTextNode(userName.value);
      addingA.appendChild(AText)
      addingA.setAttribute("onclick", "displayName(this)")
      // addingLi.setAttribute("id", setKeyfromDatabase);

      var key = firebase.database().ref().push().key;
      addingA.setAttribute("id", key)
      addingtd.appendChild(addingA);

      firebase.database().ref('users/' + getId + '/' + 'Contacts/' + key).set({
        contactname: userName.value,
        useremail: userEmail.value,
      });
      userName.value = ""
      userEmail.value = ""
    }
  }
}




let displayName = (e) => {
  // var userId = firebase.auth().currentUser.uid;
  // var userName = document.getElementById("addUser");
  // firebase.database().ref('users/' + userId + '/' + 'Contacts/' + userName.value).set({
  //   Id: key,
  //   email: userEmail,
  // });
  var settingId = document.getElementById("display")
  settingId.parentNode.setAttribute("class" , "");
  var getIdofUser = e.getAttribute("id")
  var nextUser = e.firstChild.nodeValue;
  var check = settingId.parentNode.setAttribute("class" , getIdofUser)
  var recheck = document.getElementById(getIdofUser);
  var check2 = document.getElementsByClassName(getIdofUser);
  console.log(check2);  
  console.log(recheck.parentNode);
  console.log(check)
  console.log(nextUser)
  console.log(e.parentNode)
  console.log(e);
  console.log(settingId);
  console.log(getIdofUser);
  document.getElementById("toDisplayName").innerHTML = nextUser;
}


let displayMessage = () => {
  let msgBox = document.getElementById("messageBox");
  let messages = document.getElementById("sendMessages");
  var addingp = document.createElement("p");

  var getavatar = document.getElementById("avatar");
  var getNode = getavatar.parentNode;
  const getId = getNode.getAttribute("id");

  firebase.database().ref('users/' + getId + '/' + 'Contacts/' + userName.value + '/' + userEmail).set({
    text: messages.value,
  })

  addingp.setAttribute("class", "bg-primary d-flex justify-content-end text-white p-2")
  addingp.setAttribute("style", "border-radius: 10px")
  addingp.setAttribute("id", "showMessages")

  let getMessages = document.createTextNode(messages.value);
  addingp.appendChild(getMessages)
  msgBox.appendChild(addingp);

  messages.value = "";
}