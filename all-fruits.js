import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" };

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const fruitCollection = db.collection('fruits');

const fruits = await fruitCollection.get();

fruits.forEach(fruit => console.log(fruit.data()));

    // const snapshot = await citiesRef.get();
    // snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
    // });