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
export default LoggedOut;
  