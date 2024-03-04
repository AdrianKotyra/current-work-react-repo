
import { useState, useEffect } from 'react';
import './App.css';
import ModalWindow from "./components/modalWindow/modalWindow";
import MobileNavigation from "./components/mobileNavigation/mobileNavigation";
import Button from "./components/Button/Button"
import AddFriendContainer from './components/addfriendcontainer/addfriendcontainer';
import ImageAppFooter from './components/imagefooter/imagefooter';
import HeaderTitle from './components/headertitle/headertitle';
import LoggedOut from './components/loggedout/loggedout';
import RegisterForm from './components/registerForm/registerForm';
import LogginForm from './components/logginForm/logginForm';
import AddFriendTab from './components/addFriendTab/addFriendTab';
import Loader from './components/loader/loader';

import FormSplitBill from './components/formsSplitBill/formsSplitBill';
import FriendsList from './components/friendList/friendList';




function App() {
 

  const [imageBackground, setimageBackground] = useState("img/undraw_mobile_pay_re_sjb8.svg")
  const [regForm, setregForm] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setuserPassword] = useState();

  const [userLoggedDetails, setuserLoggedDetails] = useState([]);
  const [loggedUser, setloggedUser] = useState(false);
  const [loader, setLoader] = useState(false);
  
  const [billPersonPaying, setbillPersonPaying] = useState("user");
  const [bill, setBill] = useState(0);
  const [myExpenses, setMyExpenses] = useState(0);
  const [friendExpenses, setFriendExpenses] = useState(0);

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
    {loggedUser && <MobileNavigation 
      items={items}
      setimageBackground={setimageBackground}
      setloggedUser={setloggedUser}
      setuserLoggedDetails={setuserLoggedDetails}
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
       
    >
     



  </MobileNavigation>}
    {selectedFriendObjectSingleDelete&& modalWindow===false&&
    <ModalWindow setmodalWindowSearch={setmodalWindowSearch}
    message={message}setmodalWindow={setmodalWindow}
    selectedFriendObjectSingleDelete={selectedFriendObjectSingleDelete}>
      <>
      
        <Button 
          
          setItems={setItems}
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
      
      
        {regForm&&<RegisterForm 
        setMessage={setMessage}
        setmodalWindowSearch={setmodalWindowSearch}
        onChangeImage={setimageBackground} 
        onSetRegForm = {setregForm}/> }
      
        {!loggedUser&& !regForm && <LogginForm  
        userLoggedDetails={userLoggedDetails}
        setMessage={setMessage}
        setmodalWindowSearch={setmodalWindowSearch}
        onChangeImage={setimageBackground} 
        onSetRegForm = {setregForm}
        userEmail={userEmail} 
        userPassword={userPassword}
        setUserEmail={setUserEmail} 
        setuserPassword={setuserPassword} 
        onLoggedUserDetails={setuserLoggedDetails}
        onLoader={setLoader} 
        onLoggin = {setloggedUser} 
        onAddIiemsData={setItems}/>} 
    
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
        setmodalWindowSearch={setmodalWindowSearch}
        setMessage={setMessage}
        setmodalWindow={setmodalWindow}
        setLoader={setLoader}
        setItems={setItems}
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









  export default App;
   