
import axios from 'axios';

export default function  Button({
    setMessage,
    selectedFriendObjectSingleDelete,
    setmodalWindow,
    SetSelectedFriendObjectSingleDelete,
    setOpenTab,
    userLoggedDetails,
    onAddIiemsData,
    userEmail, 
    userPassword,
    onLoader,
    children, 
    onSetFriends,
    onSetSplitTips, 
    onSelectFriend, 
    friendObject, 
    onMyExpenses, 
    onFriendBill, 
    onBill, 
    bill, 
    friendExpenses, 
    myExpenses, 
    selectedFriendObject, 
    billPersonPaying,
    onSplitBill
     }) 
    {
    
    function readBalance(e) {
      console.log(userLoggedDetails);
      const myBalance = (bill/2-friendExpenses-myExpenses)
      e.preventDefault();
      billPersonPaying==="user"? selectedFriendObject.balance = selectedFriendObject.balance - myBalance  :  
      selectedFriendObject.balance = selectedFriendObject.balance + myBalance
      onSplitBill(false)
      // local
      axios.post('http://localhost/data_inject_balance.php', {
        id: selectedFriendObject.id,
        balance: selectedFriendObject.balance,
        user_id: userLoggedDetails[2],
      })
  
  
      // online
      // axios.post('https://adriankotyraprojects.co.uk/websites/react_apps/eat-n-split/data_inject_balance.php', {
      //   id: selectedFriendObject.id,
      //   balance: selectedFriendObject.balance,
      //   user_id: userLoggedDetails[2],
      // })
      .then(response => {
       
        console.log('Data sent successfully:', response.data);
        // window.location.reload();
        
      })
      .catch(error => {
        
        console.error('Error sending data:', error);
      });
     
    
  
    }
    function PickFriendToDeleteHandler(e) {
  
      e.preventDefault();
      const selectedFriendToDelete={ 
        id: friendObject.id,
        name: friendObject.name,
        balance: friendObject.balance,
        image: friendObject.image
      }
      
      setMessage("Are you sure you want to delete your friend?");
      setmodalWindow(false)
      
  
      SetSelectedFriendObjectSingleDelete(selectedFriendToDelete)
  
    }
   
    
    function deleteFriendHandler(e) {
      
      
      e.preventDefault();
      
      onLoader(true);
  
      // local
      axios.post('http://localhost/data_delete_friends.php', {
        id: selectedFriendObjectSingleDelete.id,
        name: selectedFriendObjectSingleDelete.name,
        balance: selectedFriendObjectSingleDelete.balance,
        image: selectedFriendObjectSingleDelete.image
        
      })
  
      // online
      // axios.post('https://adriankotyraprojects.co.uk/websites/react_apps/eat-n-split/data_delete_friends.php', {
      //   id: friendObject.id,
      //   name: friendObject.name,
      //   balance: friendObject.balance,
      //   image: friendObject.image
        
      // })
  
     
      .then(response => {
        onSetSplitTips(false);
        setmodalWindow(true)
  
  
        console.log('Data sent successfully:', response.data);
        onLoader(false)
        axios.post('http://localhost/loggin.php', {
          email: userEmail,
          password: userPassword,
        
        }) 
        // axios.post('https://adriankotyraprojects.co.uk/websites/react_apps/eat-n-split/loggin.php', {
        //   email: userEmail,
        //   password: userPassword,
        
        // }) 
        .then(response => {
         
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
          onSetFriends(transformedData)
    
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
        
  
        // window.location.reload();
      })
      .catch(error => {
        onLoader(false)
        console.error('Error sending data:', error);
      });
  
     
    
     
      
    }
    
    function onSelectFriendHandler(friendSelected) {
    onSelectFriend((selectedFriendObject) => {
        // Check if friendSelected.id already exists in the array
        if (!selectedFriendObject.some(id => id === friendSelected.id)) {
            // If it doesn't exist, add it
            return [...selectedFriendObject, friendSelected.id];
        } else {
            // If it already exists, return the array unchanged
            return selectedFriendObject;
        }
    });
    }
  
  
    function splitBillHandlerOpen() {
      onMyExpenses(0);
      onFriendBill(0);
      onBill(0);
      onSetSplitTips(true);
      // onSelectFriend(friendObject);
      onSelectFriendHandler(friendObject)
      
    }
  
    function UnselectFriendHandler() {
      unSelectFriend(friendObject)
     
      onBill(0)
    
    }
  
    function unSelectFriend(friendSelected) {
      onSelectFriend((selectedFriendObject) => {
          // Check if friendSelected.id already exists in the array
          const updatedSelectedFriendObject = selectedFriendObject.filter(id => id !== friendSelected.id);
          return updatedSelectedFriendObject;
      });
  }
  
    
  
    function splitBillHandlerClose() {
  
      onMyExpenses(0);
      onFriendBill(0);
      onBill(0);
  
      onSelectFriend(null);
    }
    if(children==="Select") {
      return <button onClick={splitBillHandlerOpen} className='button' type='submit'>
      {children}
     </button> 
    }
    if(children==="Apply") {
      return <button onClick={readBalance} className='button' type='submit'>
      {children} 
     </button> 
    }
    if(children==="UnSelect") {
    return <button onClick={UnselectFriendHandler} className='button' type='submit'>
    {children}</button>
    }
    if(children==="Delete Friend") {
    return <button onClick={deleteFriendHandler} className='button' type='submit'>
    {children}</button> 
    
    }
    if(children==="Delete") {
      return <button onClick={PickFriendToDeleteHandler} className='button' type='submit'>
     {children}</button> 
    }
    if(children==="Close") {
      return <button onClick={()=>setOpenTab(false)} className='button' type='submit'>
     {children}</button> 
      }
  
  
    else {
      return  <button className='button' type='submit'>
      {children}
     </button>
    }
   
  
}
  