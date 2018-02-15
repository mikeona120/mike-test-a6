//Simulate login
function fakeLogin(){
	var user = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	if(user == "user" && pass == "pass"){
		window.location = "/home";
	}
	else{
		alert("Incorrect username/password");
	}
}