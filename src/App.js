
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import $ from 'jquery';
import ModalWindow from "./components/modalWindow/modalWindow";
import MobileNavigation from "./components/mobileNavigation/mobileNavigation";
import Button from "./components/Button/Button"


function AddFriendContainer({children, openTabHandler, openTab}){

  return <div className='button-friend-container'>
    {openTab=== false && 
    <button class="button-friend" onClick={openTabHandler} >
    <strong>{openTab===false? 'Add Friend' : 'Close'}</strong>
    <span class="span"><svg xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 23 21" 
    height="21" 
    width="23" 
    class="svg-icon">
    <path stroke-linejoin="round" 
    stroke-linecap="round" 
    stroke-width="2"
     stroke="black" 
     d="M1.97742 19.7776C4.45061 17.1544 7.80838 15.5423 11.5068 15.5423C15.2053 15.5423 18.5631 17.1544 21.0362 19.7776M16.2715 6.54229C16.2715 9.17377 14.1383 11.307 11.5068 11.307C8.87535 11.307 6.74212 9.17377 6.74212 6.54229C6.74212 3.91082 8.87535 1.77759 11.5068 1.77759C14.1383 1.77759 16.2715 3.91082 16.2715 6.54229Z">
    
    </path>
    </svg></span>
  
    </button>}
  {children}
</div>
 
}
function ImageAppFooter({imageBackground, loggedUser, onChangeImage}) {
  loggedUser&&onChangeImage("img/undraw_transfer_money_re_6o1h.svg")
  return   <div className={loggedUser?'img_footer_container_logged' : 'img_footer_container'}>
    <img className='img_footer' src={imageBackground}></img>
</div>
 
}
function HeaderTitle(){
  return  <>
    <h1 className='title-app'>Select and split your costs</h1>
   
  </>
}


function LoggedOut({onLoggin, userLoggedDetails, onLoggedUserDetails, onChangeImage}) {
  function LogOutHandler() {
    onLoggin(false)
    onLoggedUserDetails([]);
    onChangeImage("img/undraw_mobile_pay_re_sjb8.svg")
  }
  return <div className="logoutContainer "><button id="btn-message" class="button-message">
 
	<div class="content-avatar">
		<div class="status-user"></div>
		<div class="avatar">
			<svg class="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
		</div>
	</div>
	<div class="notice-content">
		<div class="username">{userLoggedDetails[0]}</div>
		<div class="lable-message">Message<span class="number-message">3</span></div>
		<div class="user-id">{userLoggedDetails[1]}</div>
	</div>
  </button>
  
  <button class="Btn" >
  
  <div class="sign"><svg viewBox="0 0 512 512"><path 
  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
  </path></svg></div>
  
  <div class="text" onClick={LogOutHandler}>Logout</div>
  </button>
  </div>



}

function RegisterForm({onSetRegForm, onChangeImage}){
  const [nameUser, setNameUser] = useState();
  const [lastnameUser, setLastnameUser] = useState();
  const [emailUser, setEmailUser] = useState();
  const [passwordUser, setPasswordUser] = useState();
  const [passwordConfirmUser, setPasswordConfirmUser] = useState();

  function registrationSubmitHandler(e) {
    e.preventDefault();
    if(passwordUser !== passwordConfirmUser) {
      $(".message_reg").html("Password Doesnt match")
    } 
    else if (passwordUser.length> 6) {
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
      
      $(".message_reg").html(`${response.data }  ${nameUser} `)
      console.log(response.data);
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


function LogginForm({onChangeImage, onSetRegForm, onLoggin, onAddIiemsData,  onLoader, onLoggedUserDetails, setUserEmail,setuserPassword, userPassword, userEmail }){
  
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
 



function App() {
  const [showMobileDrop, setShowMobileDrop] = useState(false);

  const [imageBackground, setimageBackground] = useState("img/undraw_mobile_pay_re_sjb8.svg")
  const [regForm, setregForm] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setuserPassword] = useState();

  const [userLoggedDetails, setuserLoggedDetails] = useState([]);
  const [loggedUser, setloggedUser] = useState(false);
  const [loader, setLoader] = useState(false);
  
  const [billPersonPaying, setbillPersonPaying] = useState("user");
  const [bill, setBill] = useState();
  const [myExpenses, setMyExpenses] = useState();
  const [friendExpenses, setFriendExpenses] = useState();

  const [selectedFriendObject, SetselectedFriendObject] = useState([]);
  const [selectedFriendObjectSingleDelete, SetSelectedFriendObjectSingleDelete] = useState(null);
  const [modalWindow, setmodalWindow] = useState(false);
  const [modalWindowSearch, setmodalWindowSearch] = useState(false);
  const [splitBill, SetSplitBill] = useState(false);

  const [friendImage, SetFriendImage] = useState();
  const [friendBalance, SetFriendBalance] = useState(0);
  const [friendName, SetFriendName] = useState(null);
  const [items, setItems] = useState();

  const [openTab, setOpenTab] = useState(false);
  const [message, setMessage] = useState(null);

  function handleAddItems(item) {
    setItems((items)=> [...items, item])
  }
  function openTabHandler(){
    setOpenTab(!openTab);
  }
 
 
 
  return (<>
    {loggedUser && <MobileNavigation  setMessage={setMessage}
        setmodalWindowSearch={setmodalWindowSearch}
        setOpenTab={setOpenTab}
        openTab={openTab}
        openTabHandler={openTabHandler}
        userEmail={ userEmail}
        userPassword= {userPassword}

        setItems={setItems}
        userLoggedDetails = {userLoggedDetails}
        onLoader={setLoader}
        
        onAddfriendImage={SetFriendImage} 
        onAddFriendName={SetFriendName} 
        name={friendName} 
        onAddFriend={handleAddItems} 
        image={friendImage} 
        balance={friendBalance} 
        items={items}
        setShowMobileDrop={setShowMobileDrop} 
        showMobileDrop={showMobileDrop}>
     



  </MobileNavigation>}
    {selectedFriendObjectSingleDelete&& modalWindow===false&&
    <ModalWindow setmodalWindowSearch={setmodalWindowSearch}
    message={message}setmodalWindow={setmodalWindow}
    selectedFriendObjectSingleDelete={selectedFriendObjectSingleDelete}>
      <>
      
        <Button 
          setMessage={setMessage}
          setmodalWindow={setmodalWindow}
          onSetFriends={setItems}
          userEmail={userEmail}
          userPassword={userPassword}
          onSelectFriend = {SetselectedFriendObject} 
          onSetSplitTips={SetSplitBill}
          selectedFriendObjectSingleDelete={selectedFriendObjectSingleDelete} 
          onLoader={setLoader} >Delete Friend
        </Button>
      </>
    </ModalWindow>
    }

    {modalWindowSearch===true&&
    <ModalWindow 
    
    
    setmodalWindowSearch={setmodalWindowSearch} message={message}setmodalWindow={setmodalWindow}selectedFriendObjectSingleDelete={selectedFriendObjectSingleDelete}>
    
    </ModalWindow >
    }
    {loggedUser &&<AddFriendContainer setOpenTab={setOpenTab}openTabHandler={openTabHandler} openTab={openTab}>
   
  
   
  
     
   <AddFriendTab 
     setMessage={setMessage}
     setmodalWindowSearch={setmodalWindowSearch}
     setOpenTab={setOpenTab}
     openTab={openTab}
     openTabHandler={openTabHandler}
     userEmail={ userEmail}
     userPassword= {userPassword}

     setItems={setItems}
     userLoggedDetails = {userLoggedDetails}
     onLoader={setLoader}
     
     onAddfriendImage={SetFriendImage} 
     onAddFriendName={SetFriendName} 
     name={friendName} 
     onAddFriend={handleAddItems} 
     image={friendImage} 
     balance={friendBalance} 
     items={items}
   />
   


     
     
    
    </AddFriendContainer>}
    {loggedUser && <LoggedOut onChangeImage={setimageBackground} userLoggedDetails={userLoggedDetails} onLoggin = {setloggedUser} onLoggedUserDetails={setuserLoggedDetails}/>}
    <div>
   
   
    <div className='wrapper'> 
 
    <div className='container-right-side'>
      {loggedUser &&<HeaderTitle/>}
      <div className='containerAll'>
      
      
        {regForm&&<RegisterForm onChangeImage={setimageBackground} onSetRegForm = {setregForm}/> }
      
        {!loggedUser&& !regForm && <LogginForm  onChangeImage={setimageBackground} onSetRegForm = {setregForm}userEmail={userEmail} userPassword={userPassword}setUserEmail={setUserEmail} setuserPassword={setuserPassword} onLoggedUserDetails={setuserLoggedDetails}onLoader={setLoader} onLoggin = {setloggedUser} onAddIiemsData={setItems}/>} 
    
        {loader&&<Loader/>}
        
        {loggedUser&&<div className="App col-lg-12">
       
      
        
        <FriendsList 
        setMessage={setMessage}
        selectedFriendObjectSingleDelete={selectedFriendObjectSingleDelete}
        setmodalWindow={setmodalWindow}
        SetSelectedFriendObjectSingleDelete={SetSelectedFriendObjectSingleDelete}
        onChangeImage={setimageBackground} 
        items = {items}
        userLoggedDetails={userLoggedDetails}
        userEmail={userEmail}
        userPassword={userPassword}
        onLoader={setLoader}
        onSetFriends = {setItems}
        myExpenses={myExpenses}
        friendExpenses={friendExpenses}
        bill={bill}
        onBill={setBill}
        onMyExpenses={setMyExpenses} 
        onFriendBill={setFriendExpenses}
        selectedFriendObject={selectedFriendObject} 
        onSelectFriend = {SetselectedFriendObject} 
        onOpentab = {setOpenTab} 
        openTab={openTab} 
        onSetSplitTips={SetSplitBill} 
        splitBill={splitBill}/>

        
      
        {selectedFriendObject.length !== 0 && <FormSplitBill 
        items={items}
        userLoggedDetails={userLoggedDetails}
        userEmail = {userEmail}
        userPassword = {userPassword}
        onAddIiemsData={setItems}
        friendExpenses={friendExpenses}
        onFriendBill={setFriendExpenses}
        myExpenses={myExpenses}
        bill={bill}
        billPersonPaying={billPersonPaying}
        onBillPerson = {setbillPersonPaying} 
        onBill={setBill}
        onMyExpenses={setMyExpenses}
        selectedFriendObject = {selectedFriendObject} 
        splitBill={splitBill} 
        onSplitBill={SetSplitBill}/>
        }
       
      </div>}
      
    </div>

  </div>
    
  <ImageAppFooter   onChangeImage={setimageBackground}  loggedUser={loggedUser}imageBackground={imageBackground}/>
  </div> </div></>
  
  );
}
function Loader() {

  return <div class="custom-loader"></div>
 
  
 
}


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

function FriendContainer({
  setMessage,
  selectedFriendObjectSingleDelete,
  setmodalWindow,
  SetSelectedFriendObjectSingleDelete,
  items,
  userLoggedDetails,
  userEmail,
  userPassword,
  onLoader,
  onSetFriends,
  friendObject, 
  onSetSplitTips, 
  splitBill, 
  onSelectFriend, 
  selectedFriendObject, 
  onMyExpenses, 
  onFriendBill, 
  onBill, 
  bill, 
  friendExpenses}) {


 
  return items[0].id !== undefined &&<li style={{backgroundColor: selectedFriendObject && selectedFriendObject.includes(friendObject.id) ? "#c5ebee" : "white"}}>
    <div className='friendContainer'>
      <div className='friendContainer-row'>
        <img src={friendObject.image}/>
        <div >
        
          <h3>{friendObject.name}</h3>
          {friendObject.balance < 0 && <p className='red'> You owe {friendObject.name} {Math.abs(friendObject.balance)}£</p>}
          {friendObject.balance > 0 && <p className='green'>  {friendObject.name} owe You {Math.abs(friendObject.balance)}£</p>}
          {friendObject.balance === 0 && <p> You and {friendObject.name} are even</p>}
        </div>
      </div>
    
  
   
    </div>
    <div className='friendContainer'>
      <div className='friendContainer-row'>
        <Button

          selectedFriendObject={selectedFriendObject}
          userLoggedDetails={userLoggedDetails}
          onSetFriends={onSetFriends}
          onLoader={onLoader}
          friendExpenses={friendExpenses}
          bill={bill}
          onBill={onBill}
          onMyExpenses={onMyExpenses} 
          onFriendBill={onFriendBill}
          friendObject={friendObject}
          onSelectFriend={onSelectFriend}
          onSetSplitTips={onSetSplitTips} 
          splitBill={splitBill}>
          {splitBill && selectedFriendObject.includes(friendObject.id) ?"UnSelect": "Select"}
        </Button>

        {selectedFriendObject.includes(friendObject.id)  ? 
        <Button 
        setMessage={setMessage}
        selectedFriendObjectSingleDelete={selectedFriendObjectSingleDelete}
        userEmail={userEmail} 
        setmodalWindow={setmodalWindow}
        SetSelectedFriendObjectSingleDelete={SetSelectedFriendObjectSingleDelete}
        friendObject={friendObject}
        userPassword={userPassword} 
        onSetFriends={onSetFriends} 
        selectedFriendObject={selectedFriendObject } 
        onSelectFriend={onSelectFriend } onLoader = {onLoader}onSetSplitTips={onSetSplitTips}>Delete
        </Button> : null }
    

      
      </div>

    </div>
    
    
   

  </li>
}
function FormSplitBill({
  items,
  userLoggedDetails,
  userEmail,
  userPassword,
  onAddIiemsData,
  onSplitBill, 
  friendExpenses, 
  splitBill, 
  selectedFriendObject, 
  onMyExpenses, 
  onBill, 
  onBillPerson, 
  billPersonPaying, 
  bill, 
  myExpenses, 
  onFriendBill}){
  




  function changeBillPerson(e) {
    onBill(0)
    onBillPerson(e.target.value)
    onMyExpenses(0);
    setSum(0);
    setnewValueFriendBill(0)
  }
  const listofFriendsSelected = items.filter(item => selectedFriendObject.includes(item.id));
  const listOfSelectedFriendsNames = items.filter(item => selectedFriendObject.includes(item.id)).map(item => (item.name + ", "));
  const [sumOfInput, setSumOfInput] = useState(parseInt(0));
  
  const [sum, setSum] = useState(0);
  const [sumValueDivided, setsumValueDivided ] = useState(sum/listofFriendsSelected.length);
  // Event handler to update the sum when any input changes
  const [newValueFriendBill, setnewValueFriendBill ] = useState(0);
 
   
  // setSum((prevSum) => prevSum + newValueFriendBill); // Update the sum
  
  

  return (
  
    <div className='form-split-bill-container'>
     
      {splitBill && <form className='form-split-bill'>
     
      {billPersonPaying==="user"?
      <>
      <h2>Split a bill with  {listOfSelectedFriendsNames}
      </h2>
      {/* Bill  */}
      <label for="money">💰Bill Value</label>
      <input onChange={(e)=>onBill(parseInt(e.target.value))} name="money"type='text' value={bill}/>
      {/* my Bill */}
      <label for="money">💰Your expenses</label>
      {billPersonPaying==="user"?<input onChange={(e)=>onMyExpenses(e.target.value)}name="money"type='text'value={myExpenses} /> : 
      <input onChange={(e)=>onMyExpenses(e.target.value)}name="money"type='text' disabled value={(bill-newValueFriendBill)/(parseInt(listofFriendsSelected.length))}/>}
      {/* friends bills */}
      {listofFriendsSelected.map(item => (
      <>
      <label For={`money${item.id}`}>💰{item.name} expenses</label>
       {billPersonPaying===item.name?<input onChange={(e)=>setnewValueFriendBill(e.target.value)}name="money"type='text'value={newValueFriendBill} /> : 
      <input onChange={(e)=>setnewValueFriendBill(e.target.value)}name="money"type='text' disabled value={(bill-myExpenses)/(parseInt(listofFriendsSelected.length))}/>}
      {/* friends bills */}
      </>
      ))}</> 

      : 
      <> 
      <h2>Split a bill with  {listOfSelectedFriendsNames}
      </h2>
      {/* Bill  */}
      <label for="money">💰Bill Value</label>
      <input onChange={(e)=>onBill(parseInt(e.target.value))} name="money"type='text' value={bill}/>
      {/* my Bill */}
      <label for="money">💰Your expenses</label>
      {billPersonPaying==="user"?<input onChange={(e)=>onMyExpenses(e.target.value)}name="money"type='text'value={myExpenses} /> : 
      <input onChange={(e)=>onMyExpenses(e.target.value)}name="money"type='text' disabled value={(bill-newValueFriendBill)/(parseInt(listofFriendsSelected.length))}/>}
      {/* friends bills */}
      {listofFriendsSelected.map(item => (
      <>
      <label For={`money${item.id}`}>💰{item.name} expenses</label>
       {billPersonPaying===item.name?<input onChange={(e)=>setnewValueFriendBill(e.target.value)}name="money"type='text'value={newValueFriendBill} /> : 
      <input onChange={(e)=>setnewValueFriendBill(e.target.value)}name="money"type='text' disabled value={(bill-newValueFriendBill)/(parseInt(listofFriendsSelected.length))}/>}
      
      </>
      ))}
      
      
      
      
      
      
      
      </>
      
      
      }
    

      
      <label>Who is paying the bill?</label>
      <select onChange={changeBillPerson}>
        <option value="user">You</option>
        {items.filter(item => selectedFriendObject.includes(item.id)).map(item => ( <option value={item.name}>{item.name}</option>))}
        


      </select>
      <Button 
      userLoggedDetails={userLoggedDetails}
      userEmail={userEmail} userPassword={userPassword}
      onAddIiemsData={onAddIiemsData}onSplitBill = {onSplitBill}
      splitBill={splitBill}billPersonPaying={billPersonPaying}
      selectedFriendObject={selectedFriendObject}
      myExpenses = {myExpenses} 
      bill={bill} 
      friendExpenses={friendExpenses}>
      Apply
      </Button>
    
    
    </form> }
  </div>
    
    
  )
}

function FriendsList({
  setMessage={setMessage},
  selectedFriendObjectSingleDelete={selectedFriendObjectSingleDelete},
  setmodalWindow={setmodalWindow},
  SetSelectedFriendObjectSingleDelete,
  items, 
  userLoggedDetails,
  userEmail,
  userPassword,
  onLoader,
  onSetFriends,

  onSetSplitTips,
  splitBill, 
  onSelectFriend, 
  selectedFriendObject, 
  onMyExpenses, 
  onFriendBill, 
  onBill, bill
  }) {
 
  
  
  return   <div className='sidebar col-lg-6'>
    <ul>
      {items.map((friend)=><FriendContainer 
      setMessage={setMessage}
      selectedFriendObjectSingleDelete={selectedFriendObjectSingleDelete}
      setmodalWindow={setmodalWindow}
      SetSelectedFriendObjectSingleDelete={SetSelectedFriendObjectSingleDelete}
      items = {items}
      userLoggedDetails={userLoggedDetails}
      userEmail={userEmail}
      userPassword={userPassword}
      onLoader={onLoader}
      onSetFriends = {onSetFriends}
      bill={bill}
      onBill={onBill}
      onMyExpenses={onMyExpenses}
      onFriendBill={onFriendBill}
      selectedFriendObject={selectedFriendObject}
      onSelectFriend={onSelectFriend }
      friendObject={friend} key={friend.id} 
      onSetSplitTips={onSetSplitTips} 
      splitBill={splitBill}/>)}
      
     
      
     
    </ul>
  </div>
   
  }


  export default App;
   