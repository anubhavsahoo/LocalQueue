/* 
   LSQueue:  easy-to-use queue, using LocalQueue.

      Can be used as a higher performance queue, for larger string data, such as DOM images, etc.
      If not already, the user must stringify the payload first.

   It creates a LocalQueue object for use as an index.  
     Then, the functions below handle index and payload.

    Available functions 
      	pushLSQueue("","mystuff") or pushLSQueue("myindex","mystuff")
    	popLSQueue,  
    	getFrontLSQueue, 
    	getFrontLSQueueIndex, 
    	getBackLSQueue, 
    	getBackLSQueueIndex, 
    	deleteFrontLSQueue 
    
   The queue will persist between windows ...

*/


function incrementString(str) {
  // Find the trailing number or it will match the empty string
  if (str != null)
  { var count = str.match(/\d*$/);
    // Take the substring up until where the integer was matched
    // Concatenate it to the matched count incremented by 1
    return str.substr(0, count.index) + (++count[0]);
  }
    else return "0";  
};

var plLocalQueueVar = new LocalQueue("plLQVIndex");  //   instance

// just for string payloads
 function pushLSQueue(theIndexNm,thePayload) {
   var thePushIStr = incrementString(plLocalQueueVar.getBack());   // incrementString handles nulls
   // check for valid string input for the the index name
   if ((typeof theIndexNm == 'string') || (theIndexNm instanceof String)) 
   { if (theIndexNm.length > 1) 
   	  thePushIStr = theIndexNm; // allow the user to specify the index
   }	  
   /* perform the push of the index and the payload ... don't check payload for type */
   if (plLocalQueueVar.push(thePushIStr))
     localStorage.setItem(thePushIStr,thePayload);
}

function popLSQueue() {
   var theIStr = plLocalQueueVar.pop();   
   if (theIStr != null)
   { var theStrPayload = localStorage.getItem(theIStr);
     localStorage.removeItem(theIStr);
     return(theStrPayload);
   }
   else
     return null;  
}

function getFrontLSQueue() {
   var theIStr = plLocalQueueVar.getFront();   
   if (theIStr != null)
		return(localStorage.getItem(theIStr));
   else
		return null;  
}

function getFrontLSQueueIndex() {
   return  (plLocalQueueVar.getFront());
}

function getBackLSQueue() {
   var theIStr = plLocalQueueVar.getBack();   
   if (theIStr != null)
     return(localStorage.getItem(theIStr));
   else
     return null;  
}

function getBackLSQueueIndex() {
   return  (plLocalQueueVar.getBack());  
}


function deleteFrontLSQueue() {
   var theIStr = plLocalQueueVar.pop();
   if (theIStr != null) localStorage.removeItem(theIStr);
}

