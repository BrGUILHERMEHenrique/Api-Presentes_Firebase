import firebaseConfig from "../infrastructure/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, query, where, doc, getDocsFromCache, getDoc } from "firebase/firestore";
 
class DataExporter{
    constructor(){
        this.firebase = initializeApp(firebaseConfig);
        this.store = getFirestore(this.firebase);
        this.data = this.RetriveAll();
    }

    async RetriveAll() {
        if (this.data) return this.data;

        let doc = null;
        let data = []

        try {
            doc = await getDocs(collection(this.store, 'presentes')); 
            if (!doc.empty) {
                doc.forEach((Doc) => data.push(Doc.data()));
            }           
        } catch (error) {
            console.log(error);
        } finally {
            if (data) return data
            else return null
        }
    }

    // async RetriveById(id){
    //     try {
    //         let docs = await getDocs(collection(this.store, 'presentes'));
    //         let doc = null;

    //         docs.forEach((d) => {
    //             console.log(d.data().id);
    //             if (d.data().id == id) {
    //                 doc = d.data();
    //             }
    //         });

    //         if (doc) return doc;

    //     } catch (error) {
    //         console.log(error);
    //     }        
    // }

    async RetriveById(id){
        try {
            let q = query(collection(this.store, 'presentes'), where('id', '==', Number(id)));
            let document = await getDocs(q);
            if (!document.empty) return document.docs.at(0).data();
            else return null;

        } catch (error) {
            console.log(error);
        }        
    }

    Search(s){
        this.data.sort((a, b) => b > a);

        return this.data.filter((item) => {
            if (item.nome.indexOf(s)) return item;
        });
    }
}

export default DataExporter;