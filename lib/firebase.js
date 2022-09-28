//we have to load the firebase admin in order to interact with our firebase project
import admin from "firebase-admin";

//to get ready to send an authentication request to firebase, we load the json
const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_PRIVATE_KEY
);

//let's wrap all of our code that tries to talk to firebase in a try{}
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_URL,
  }
);  
} catch(err){
  if ( err.message.indexOf("already exists") === -1 ) {
    console.log("firebase err:", err.stack);
  }
}

export default admin.firestore();