// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import our firebase lib so we get connected to the firebase db
import firebase from "../../lib/firebase";

//export our asyncnphronous default api function (async so we can use await inside)
export default async function handler(req, res) {
  //wrap try around our code to catch any errors that happen
  try {

    //ask the firestore to get EVERY document in the "resources" collection
    const snapshot = await firebase.collection("resources").get();

    //loop through each document in the returned array in snapshot
    let output = [];

    snapshot.forEach(
      (doc) => {
        output.push(
          {
            id: doc.id,
            data: doc.data()
          }
        );
      }
    );

    console.log(output);

    //return the newly constructed object value of all firestore document data
    res.statusCode = 200;
    res.setHeader( "Content-Type", "application/json");
    res.json( {output} );
    
  } catch(err) {
    //if error, show in the node console the whole error object
    console.error(err);
    //also send back to the browser a 500 server erro status and text of error msg
    res.status(500).end(err.message);
  }
}
