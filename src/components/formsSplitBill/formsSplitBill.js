import $ from 'jquery';
import { useState } from "react";
import axios from 'axios';
import Button from '../Button/Button';

function FormSplitBill({
    setmodalWindowSearch,
    setMessage,
    setmodalWindow,
    setLoader,
    setItems,
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
  
   
    const listofFriendsSelected = items.filter(item => 
    selectedFriendObject.includes(item.id));
    const listOfSelectedFriendsNames = items.filter(item => 
    selectedFriendObject.includes(item.id)).map(item => (<span className='friendselectedNames'>{item.name + " "}</span> ));
    
    const [sumOfInput, setSumOfInput] = useState(parseInt(0));
    
    const [sum, setSum] = useState(0);
    const [sumValueDivided, setsumValueDivided ] = useState(sum/listofFriendsSelected.length);
  
    const [amountToPayReading, setamountToPayReading] = useState()
    // Event handler to update the sum when any input changes
    const [newValueFriendBill, setnewValueFriendBill ] = useState(0);
  
    
   
    
  
    function valueInputHandlerBill(e){
      onBill(parseInt(e.target.value));
      
    }
    function valueInputHandleronMyExpenses(e){
      onMyExpenses(parseInt(e.target.value));
      
    }
  
    function valueInputHandlerFriendBill(e){
      setnewValueFriendBill(parseInt(e.target.value));
      
    }
  
  
  
  
  
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
        <input onChange={(e)=>valueInputHandlerBill(e)} name="money"type='text' value={bill}/>
        {/* my Bill */}
        <label for="money">💰Your expenses</label>
        {billPersonPaying==="user"?<input onChange={(e)=>valueInputHandleronMyExpenses(e)}name="money"type='text'value={myExpenses} /> : 
        <input onChange={(e)=>valueInputHandleronMyExpenses(e)}name="money"type='text' disabled value={(bill-newValueFriendBill)/(parseInt(listofFriendsSelected.length))}/>}
        {/* friends bills */}
        {listofFriendsSelected.map(item => (
        <>
        <label For={`money${item.id}`}>💰{item.name} expenses</label>
         {billPersonPaying===item.name?<input onChange={(e)=>valueInputHandlerFriendBill(e)}name="money"type='text'value={newValueFriendBill} /> : 
        <input onChange={(e)=>valueInputHandlerFriendBill(e)}name="money"type='text' disabled value={(bill-myExpenses)/(parseInt(listofFriendsSelected.length))}/>}
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
        setmodalWindowSearch={setmodalWindowSearch}
        setMessage={setMessage}
        setmodalWindow={setmodalWindow}
        onLoader={setLoader}
        setItems={setItems}
        newValueFriendBill={newValueFriendBill}
        items={items}
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
export default FormSplitBill;