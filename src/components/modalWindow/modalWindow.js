import './modalWindow.css';
import React, { useState } from 'react';


function ModalWindow({setmodalWindowSearch, message, children, setmodalWindow, selectedFriendObjectSingleDelete}){
 
  
  function ModalWindowHandler() {
    setmodalWindow(true)
    setmodalWindowSearch(false)
  }
    return <div class="container-modal">

    <div class="cookiesContent" id="cookiesPopup">
      
      <button onClick={ModalWindowHandler}class="close">✖</button>
      <p>{message}</p>
      {children}
      
      
    </div>
  </div>
}
export default ModalWindow;
