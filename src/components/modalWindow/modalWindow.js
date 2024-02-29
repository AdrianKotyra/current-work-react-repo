import './modalWindow.css';
import React from 'react';


function ModalWindow({children, setmodalWindow}){
  function ModalWindowHandler() {
    setmodalWindow(true)
  }
    return <div class="container-modal">
    <div class="cookiesContent" id="cookiesPopup">
      <button onClick={ModalWindowHandler}class="close">✖</button>
     
      <p>{children}</p>
      
    </div>
  </div>
}
export default ModalWindow;
