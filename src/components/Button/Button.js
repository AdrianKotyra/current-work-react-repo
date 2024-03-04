
import axios from 'axios';
import $ from 'jquery';
export default function  Button({
    setmodalWindow,
    setItems,
    items,
    selectedFriendObject,
    newValueFriendBill,
    setMessage,
    selectedFriendObjectSingleDelete,
    setmodalWindowSearch,
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
    billPersonPaying,
    onSplitBill
     }) 
    {
    
    function readBalance(e) {
      function animateNumber(){
        $(".red").css("display", "none")
        $(".green").css("display", "none")
        setTimeout(() => {
          $(".red").css("display", "block")
          $(".green").css("display", "block")
        }, 1);
       
      
      }
    
    


      function getIdByName(items, targetName) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === targetName) {
                return items[i].id;
            }
        }
        return null; // Return null if no matching item found
      }
      let selectedIdFriendPaying = [getIdByName(items, billPersonPaying)]
     


      let setSelectedUserAmounttoPay = 0;
      if(bill===0) {
        setmodalWindowSearch(true)
        setMessage("Your bill cant be empty")
        setTimeout(() => {
          setmodalWindowSearch(false)
        }, 3000);
      }
      else {

      

      if(billPersonPaying==="user") {
       

        setSelectedUserAmounttoPay = (myExpenses - (((bill -  myExpenses) / selectedFriendObject.length) * selectedFriendObject.length)) / selectedFriendObject.length
        axios.post('http://localhost/data_inject_balance.php', {
          id: selectedFriendObject,
          balance: setSelectedUserAmounttoPay,
          user_id: userLoggedDetails[2],


        }).then(response => {
       
          console.log('Data sent successfully:', response.data);
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
            setmodalWindowSearch(true)
            setMessage("Your expenses has been updated" )
            animateNumber()
       
          
          })


        }).catch(error => {
          
          console.error('Error sending data:', error);
        })
          
      
      }
      else {
        setSelectedUserAmounttoPay = setSelectedUserAmounttoPay*2 -((newValueFriendBill - (((bill -  newValueFriendBill) / selectedFriendObject.length) * selectedFriendObject.length)) / selectedFriendObject.length) 
        axios.post('http://localhost/data_inject_balance.php', {
          id: selectedIdFriendPaying,
          balance: setSelectedUserAmounttoPay,
          user_id: userLoggedDetails[2],
        }).then(response => {
       
          console.log('Data sent successfully:', response.data);
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
            setmodalWindowSearch(true)
            setMessage("Your expenses has been updated" )
            animateNumber()
          
          
          
          })
        })
        .catch(error => {
          
          console.error('Error sending data:', error);
        });
      }
       
      }
      e.preventDefault();
      
    
        
       
       
       
  
  
      // online
      // axios.post('https://adriankotyraprojects.co.uk/websites/react_apps/eat-n-split/data_inject_balance.php', {
      //   id: selectedFriendObject.id,
      //   balance: selectedFriendObject.balance,
      //   user_id: userLoggedDetails[2],
      // })
     
     
    
  
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
    function namesAnimation() {
      $(".friendselectedNames").css("display", "none")
      setTimeout(() => {
        $(".friendselectedNames").css("display", "inline")
      }, 1);
  


    }
    function onSelectFriendHandler(friendSelected) {
    namesAnimation()
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
  