# Khat : A safe mailing and messaging website
<p>The website Khat is designed for the purpose of having a secure message channel between 2 individuals.
It is designed such that a person can easily send a mail from in side the website to the other individual with a secure code that gives them access to a secure chat room where none of their conversations are stored. And for sending the mail with secure code also the user doesn’t have to go out as the feature of sending mail is integrated with the website.</p>
<br>

[Website link](https://join-khat.herokuapp.com/)

[Github Repo Link](https://github.com/MayankShrivastava17/khat)

## Technologies used:
<li> Front-End :  HTML, CSS ,Bulma 
<li> Back-End : JavaScipt, NodeJS(Express, Passport, Googleapis, Nodemailer, Socket.io)
<li> APIs : Socket.io, Google Apis, Node Mailer, Socket.io
<li> Deployment : Heoku  
  
  ## Salient Features
  
 <li>  In the home page we are having a carousel which is rendered and is having its functionalities due to javascript.

 <li> The feedback form is connected with firebase which is live and storing data.

 <li> The whole website is responsive and adjusts itself according to every device size.

 <li> The password that is stored in the database is encrypted using passport package in node.

 <li> For sending emails from the app we have created a project on google developer’s console and used there api to establish SMT protocols to send mails.

 <li> The api is activated and the client Id and access tokens are procured from console and used to create a transport that makes the data package to send mail. 

 <li> Along with this a javascript function is invoked to generate a room code to create a communication channel in messaging platform.

 <li> The chatting feature is live and doesn’t record any of the communication. It is achieved by the help of the api Socket.io.

 <li> The website is fully functional as of now and is deployed on Heroku.
