'use strict'

const socket = io()

// // Send a message to say that I've connected
// socket.emit('newuser', {user: 'Grace Hopper'})

// // Event listener, waiting for an incoming "newuser"
// socket.on('newuser', (data) => console.log(`${data.user} has connected!`))


// Listen for the 'submit' of a form
// 	 event.preventDefault()  (prevent the form from leaving the page)
//   Emit a message using "chatmsg"
// Listen for "chatmsg"
//   add a <li> with the chat msg to the <ol>

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $userName = document.getElementById('userInput')
let enteredUserName

$userName.addEventListener('submit',(event) =>{
	event.preventDefault()
	enteredUserName = event.currentTarget.userName.value
	socket.emit('username',{name: event.currentTarget.userName.value})
	// console.log(event.currentTarget.userName.value)
})

socket.on('username' , (data) => {
	console.log(`Hello ${data.name}`)
	
})


$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()
	if(enteredUserName)
	{
		socket.emit('chatmsg', {msg: event.currentTarget.txt.value , user: enteredUserName})	
	}
	
	event.currentTarget.txt.value = ''
})





	socket.on('chatmsg', (data) => {
		
	
		console.log(`${data.user} : ${data.msg}`)
		const newMsg = document.createElement('p')
		$msgList.appendChild(newMsg)
		
		newMsg.textContent =  data.msg
		if(data.user == enteredUserName){
			newMsg.style.textAlign="right"
			newMsg.style.color = "red"
			console.log("giiiii")
		}
	})