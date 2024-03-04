import $ from 'jquery';
import { useState } from "react";
import axios from 'axios';
import Button from '../Button/Button';


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
            {friendObject.balance < 0 && <p className='red'> You owe {friendObject.name} <span className='numbers'>{Math.abs(friendObject.balance)}£</span> </p>}
            {friendObject.balance > 0 && <p className='green'>  {friendObject.name} owe You <span className='numbers'>{Math.abs(friendObject.balance)}£</span></p>}
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

export default FriendContainer;