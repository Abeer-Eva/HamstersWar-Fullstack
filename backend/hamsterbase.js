const admin = require("firebase-admin");
   
let privateKey;

if( process.env.HAMSTERSKEY ){
    privateKey = JSON.parse(process.env.HAMSTERSKEY)
} else{
    privateKey = require('./secrets/HAMSTERSKEY.json')
}

//var serviceAccount = require("./secrets/firebase-key.json");
function connect() {
  if (admin.apps.length === 0) {
    
  
  admin.initializeApp({
    credential: admin.credential.cert(privateKey)
    
    
    }) };
 

    
  

     const db = admin.firestore();
    
      //   var hamster= require('./hamster.json')
    
      //  hamster.forEach(function(obj) {
         
      //      db.collection("HAMSTERS").add({
            
      //         name : obj.name,
      //        age :obj.age,
      //        favFood:obj.favFood,
      //        loves:obj.loves,
      //        imgName: obj.imgName,
      //        wins:obj.wins,
      //        defeats:obj.defeats,
      //         games:obj.games
      //       })
           
            
            
      //        .catch(function(error) {
      //         console.error("Error adding document: ", error);
      //      });
      //  });
      
 return db;   
}

module.exports = { connect }
