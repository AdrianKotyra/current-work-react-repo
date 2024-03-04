import $ from 'jquery';
import { useState } from "react";
import axios from 'axios';
function RegisterForm({onSetRegForm, onChangeImage, setmodalWindowSearch, setMessage}){
    const [nameUser, setNameUser] = useState();
    const [lastnameUser, setLastnameUser] = useState();
    const [emailUser, setEmailUser] = useState();
    const [passwordUser, setPasswordUser] = useState("");
    const [passwordConfirmUser, setPasswordConfirmUser] = useState();
    function backToLoginHandler(){
      setmodalWindowSearch(false)
      onSetRegForm(false)
      onChangeImage("img/undraw_mobile_pay_re_sjb8.svg")
      // onSetRegForm(true);
     
    }
    function registrationSubmitHandler(e) {
      e.preventDefault();
  
      if(passwordUser !== passwordConfirmUser) {
        $(".message_reg").html("Password Doesnt match")
      } 
      else if (passwordUser==="" ) {
        $(".message_reg").html("Password cannot be empty")
      }
      else if (passwordUser.length< 6) {
        $(".message_reg").html("Password needs to be at least 6 digits")
      }
      // else {
       
      //   axios.post('https://adriankotyraprojects.co.uk/websites/react_apps/eat-n-split/data_inject_registration.php', {
      //   nameUser: nameUser,
      //   lastnameUser: lastnameUser, 
      //   emailUser: emailUser,
      //   passwordUser: passwordConfirmUser
        
      
      else {
      
        axios.post('http://localhost/data_inject_registration.php', {
        nameUser: nameUser,
        lastnameUser: lastnameUser, 
        emailUser: emailUser,
        passwordUser: passwordConfirmUser
        
      }).then(response => {
        setmodalWindowSearch(true)
        if(response.data==="Your account have been created") {
          setMessage(<> {response.data}  {nameUser} <br></br><button onClick={backToLoginHandler}className='btn btn-lg btn-primary'>  Back to Log in</button></>)
        }
        else {
          setMessage(<> {response.data}  {nameUser}</>)
        }
      
        // $(".message_reg").html(`${response.data }  ${nameUser} `)
        
      }).catch(error => {
        console.error('Error sending data:', error);
      });
      }
      
   
     
    } 
    function regHandler() {
      onSetRegForm(false);
      onChangeImage("img/undraw_mobile_pay_re_sjb8.svg")
    }
    return <form class="form">
    <p class="title">Register </p>
    <p class="message">Signup now and get access to My app. </p>
        <div class="flex">
        <label>
            <input required="" name = "name" placeholder="Firstname" type="text" class="input" onChange={(e)=>setNameUser(e.target.value)}></input>
        </label>
  
        <label>
            <input required=""  name = "lastname"placeholder="Lastname" type="text" class="input" onChange={(e)=>setLastnameUser(e.target.value)}></input>
        </label>
    </div>  
            
    <label>
        <input required=""  name = "email" placeholder="Email" type="email" class="input" onChange={(e)=>setEmailUser(e.target.value)}></input>
       
    </label> 
        
    <label>
        <input required=""  name = "password" placeholder="Password" type="password" class="input" onChange={(e)=>setPasswordUser(e.target.value)}></input>
      
    </label>
    <label>
        <input required=""  name = "password_confirmed"placeholder="Confirm password" type="password" class="input" onChange={(e)=>setPasswordConfirmUser(e.target.value)}></input>
      
    </label>
    <button onClick={registrationSubmitHandler}class="submit">Submit</button>
    <p class="signin">Already have an acount ? <a onClick={regHandler} href="#">Signin</a> </p>
    <h3 class="message_reg"></h3>
  </form>
}
export default RegisterForm;
  