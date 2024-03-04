import $ from 'jquery';
import { useState } from "react";
import axios from 'axios';
function LogginForm({
    userLoggedDetails,
    setMessage,
    setmodalWindowSearch,
    onChangeImage, 
    onSetRegForm, 
    onLoggin, 
    onAddIiemsData, 
    onLoader, 
    onLoggedUserDetails, 
    setUserEmail,
    setuserPassword, 
    userPassword, 
    userEmail 
    })
    {
    
    function regHandler() {
      onSetRegForm(true);
      onChangeImage("img/undraw_undraw_notebook_ask4_w99c.svg")
    }
    function logInHandler(e) {
    
      onLoader(true)
      e.preventDefault();
      // axios.post('https://adriankotyraprojects.co.uk/websites/react_apps/eat-n-split/loggin.php', {
      //   email: userEmail,
      //   password: userPassword,
      
      // }) 
      axios.post('http://localhost/loggin.php', {
        email: userEmail,
        password: userPassword,
      
      }) 
      .then(response => {
        
        console.log('Data sent successfully:', response.data);
        if(response.data[1] ==="true") {
          console.log(response.data[4])
          onLoggedUserDetails([response.data[2],response.data[3], response.data[4]])
          onLoggin(true)
          onLoader(false)
          let userName = response.data[2];
          setMessage(`Welcome back ${userName}`)
          setmodalWindowSearch(true)
          setTimeout(() => {
            setmodalWindowSearch(false)
          }, 3000);
          console.log(onLoggedUserDetails)
  
        }
        
        
       
        const transformedData = response.data[0].map(item => ({
          id: item.id,
          name: item.name,
          image: `https://i.pravatar.cc/48?u=${item.id}`, // Assuming 'id' is unique and can be used for generating the image URL
          balance: parseInt(item.balance) || 0, // Default balance to 0 if it's not provided
        }));
        
        onAddIiemsData(transformedData)
  
      })
      .catch(error => {
        onLoader(false)
        // console.error('Error sending data:', error);
        $(".Message-form-signin").html("Wrong Credentials<br> Try Again");
      });
     
      
    }
   
    return   <>
   
    <form class="form">
    <h1 className='title-app'>Welcome to my Tips App</h1>
    <p class="form-title">Sign in to your account</p>
      <div class="input-container">
        <input type="email" placeholder="Enter email" onChange={(e)=>setUserEmail(e.target.value)}></input>
        <span>
        </span>
    </div>
    <div class="input-container">
        <input type="password" placeholder="Enter password" onChange={(e)=>setuserPassword(e.target.value)}></input>
      </div>
      <button type="submit" class="submit" onClick={logInHandler}>
      Sign in
    </button>
  
    <p class="signup-link">
      No account?
      <a onClick={regHandler} href="#">Sign up</a>
    </p>
    <h1 className='Message-form-signin'></h1>
  </form>
    </>
    
}

export default LogginForm;
   