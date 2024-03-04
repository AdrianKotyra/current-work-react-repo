import './mobileNavigation.css';
import axios from 'axios';
import Button from '../Button/Button'
import { useState } from 'react';
function AddFriendTabMobile({
    setAddFriendMobile,
    sethambChange,
    setShowMobileDrop,
    setMessage, 
    setmodalWindowSearch, 
    items, 
    setOpenTab, 
    userPassword, 
    userEmail, 
    setItems, 
    onAddFriendName , 
    name, 
    image, 
    balance, 
    onLoader, 
    userLoggedDetails}) {

    


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
          setAddFriendMobile(false)
          setShowMobileDrop(false)
          sethambChange(false)
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
    
      
     
      
    return <><form className='form-add-friend mobile-add-friend' onSubmit={handleAddItems}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input required type='text' onChange={(e)=>onAddFriendName(e.target.value)}/>
    
  
   
      <Button >Submit</Button> 
      
    </form>
    
   
   
    </>
}
  
export default function MobileNavigation({
  setItems,
  items,
  setimageBackground,
  setloggedUser,
  setuserLoggedDetails,
  onAddFriend, 
  onAddfriendImage, 
  setMessage, 
  setmodalWindowSearch, 
 
  setOpenTab, 
  openTabHandler, 
  userPassword, 
  userEmail, 
 
  openTab, 
  onAddFriendName, 
  name, 
  image, 
  balance, 
  onLoader, 
  userLoggedDetails  
  }){
    const [hambChange, sethambChange] = useState(false);
    const [showMobileDrop, setShowMobileDrop] = useState(false);
    const [addFriendMobile, setAddFriendMobile] = useState(false);
    function LogOutHandler() {
      setloggedUser(false)
      setuserLoggedDetails([]);
      setimageBackground("img/undraw_mobile_pay_re_sjb8.svg")
    }
    function showMobileHandler() {
      setAddFriendMobile(false)
      setShowMobileDrop(!showMobileDrop)
      sethambChange(!hambChange)
    }
    return <div className='mobile-navigation-container'>
        <div id="menuToggle" >
            <input onClick={showMobileHandler} id="checkbox" type="checkbox" checked={hambChange}></input>
            <label  class="toggle" for="checkbox">
            <div class="bar bar--top"></div>
            <div class="bar bar--middle"></div>
            <div class="bar bar--bottom"></div>
            </label>
           
        </div>
        {showMobileDrop&& <div className='mobile-nav-background-container'>
            <div className='drop-down-mobile-nav'>
            <div className='link-mobile-container'> 
                <p className='link-mobile'>
                    <svg class="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
                    <div className='container-details-user'>
                        <div class="username">{userLoggedDetails[0]}</div>
                        <div class="lable-message">Message<span class="number-message">3</span></div>
                        <div class="user-id">{userLoggedDetails[1]}</div>

                    </div>
                   
                </p>
                {!addFriendMobile&&<p className='link-mobile' onClick={()=>setAddFriendMobile(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 23 21" 
                        height="10" 
                        width="10" 
                        class="svg-icon">
                        <path stroke-linejoin="round" 
                        stroke-linecap="round" 
                        stroke-width="1"
                        stroke="black" 
                        d="M1.97742 19.7776C4.45061 17.1544 7.80838 15.5423 11.5068 15.5423C15.2053 15.5423 18.5631 17.1544 21.0362 19.7776M16.2715 6.54229C16.2715 9.17377 14.1383 11.307 11.5068 11.307C8.87535 11.307 6.74212 9.17377 6.74212 6.54229C6.74212 3.91082 8.87535 1.77759 11.5068 1.77759C14.1383 1.77759 16.2715 3.91082 16.2715 6.54229Z">
                        </path>
                    </svg>Add friend
                  </p>
                }
                  {addFriendMobile&&<AddFriendTabMobile 
                  setAddFriendMobile={setAddFriendMobile}
                  sethambChange={sethambChange}
                  setShowMobileDrop={setShowMobileDrop}
                  setMessage={setMessage}
                  setmodalWindowSearch={setmodalWindowSearch}
                  setOpenTab={setOpenTab}
                  openTab={openTab}
                  openTabHandler={openTabHandler}
                  userEmail={ userEmail}
                  userPassword= {userPassword}

                  setItems={setItems}
                  userLoggedDetails = {userLoggedDetails}
                  onLoader={onLoader}
                  
                  onAddfriendImage={onAddfriendImage} 
                  onAddFriendName={onAddFriendName} 
                  name={name} 
                  onAddFriend={onAddFriend} 
                  image={image} 
                  balance={balance} 
                  items={items}/>
                }
                <p className='link-mobile'  onClick={LogOutHandler}>
                    <svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                        </path>
                    </svg>Log out
                </p>
            </div> 
          
            </div> 
        </div>}
       
    </div>
   
}

