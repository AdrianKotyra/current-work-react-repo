import $ from 'jquery';
import { useState } from "react";
import axios from 'axios';
import Button from '../Button/Button';
import FriendContainer from '../friendContainer/friendContainer';
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

export default FriendsList;
  