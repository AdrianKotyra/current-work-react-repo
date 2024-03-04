import $ from 'jquery';
import { useState } from "react";
import axios from 'axios';
import Button from '../Button/Button';

function AddFriendTab({setMessage, setmodalWindowSearch, items, setOpenTab, openTabHandler, userPassword, userEmail, setItems, openTab, onAddFriendName , name, image, balance, onLoader, userLoggedDetails }) {
  
    function generateRandomNumber() {
      const min = 100000; // Minimum 6,-digit number
      const max = 999999; // Maximum 6-digit number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    let newFriend = {generateRandomNumber, name, image, balance };
  
  
  
    function handleAddItems(e) {
      e.preventDefault();
  
      let found = false;
      items.forEach(obj => {
  
        if (obj.name === newFriend.name) {
          found = true;
        }
      });
  
      if (found) {
        setmodalWindowSearch(true)
        setMessage("Person with this name already exists")
        setTimeout(() => {
          setmodalWindowSearch(false)
        }, 3000);
      } 
      else {
        onLoader(true);
  
        // local
        axios.post('http://localhost/data_inject_friends.php', {
          user_id: userLoggedDetails[2],
          id: newFriend.generateRandomNumber(),
          name: newFriend.name,
          balance: newFriend.balance,
          image: newFriend.image
        })
        // online
        // axios.post('https://adriankotyraprojects.co.uk/websites/react_apps/eat-n-split/data_inject_friends.php', {
        //   user_id: userLoggedDetails[2],
        //   id: newFriend.generateRandomNumber(),
        //   name: newFriend.name,
        //   balance: newFriend.balance,
        //   image: newFriend.image
          
        // })
        .then(response => {
          setmodalWindowSearch(true)
          setMessage(`Person with name ${newFriend.name} has been added to your list`)
          setTimeout(() => {
            setmodalWindowSearch(false)
          }, 3000);
          setOpenTab(false)
          console.log('Data sent successfully:', response.data);
          onLoader(false);
          
          // window.location.reload();
          axios.post('http://localhost/loggin.php', {
            email: userEmail,
            password: userPassword,
          }).then(response => {
          // axios.post('https://adriankotyraprojects.co.uk/websites/react_apps/eat-n-split/loggin.php', {
          //   email: userEmail,
          //   password: userPassword,
          // }).then(response => {
            
            console.log('Data sent successfully:', response.data);
            if(response.data[1] ==="true") {
              console.log(response.data[4])
              // onLoggedUserDetails([response.data[2],response.data[3], response.data[4]])
              // onLoggin(true)
              onLoader(false)
            }
         
          
         
         
          const transformedData = response.data[0].map(item => ({
            id: item.id,
            name: item.name,
            image: `https://i.pravatar.cc/48?u=${item.id}`, // Assuming 'id' is unique and can be used for generating the image URL
            balance: parseInt(item.balance) || 0, // Default balance to 0 if it's not provided
          }));
          
          setItems(transformedData)
    
        })
        .catch(error => {
        
          console.error('Error sending data:', error);
         
        });
          
      }) 
     
     
    
  
      
        .catch(error => {
          onLoader(false)
          console.error('Error sending data:', error);
        });
      
  
        
            
            
        
        
      }
  
    }
    
      
     
      
    return openTab&&<><form className='form-add-friend' onSubmit={handleAddItems}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input required type='text' onChange={(e)=>onAddFriendName(e.target.value)}/>
    
  
   
      <Button >Submit</Button> 
      
    </form>
    <Button setOpenTab={setOpenTab}>Close</Button> 
   
   
    </>
}

export default AddFriendTab;