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

export default AddFriendContainer;