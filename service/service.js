import app from "../infrastructure/firebaseConfig";
import "firebase/firestore";

class firebaseServices{
    constructor (){}

    Save(obj){
        app.firebase.firestore.collection('presentes').add(obj);
    }
}

export default firebaseServices;