import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" };

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const fruitCollection = db.collection('fruits');

async function createFruit(fruit) {
    return fruitCollection.add({
        type: fruit,
        status: "new",
        qty: 0
    })
}

async function createFruits(fruitList) {
    return await fruitList.map(fruit => createFruit(fruit));
}

// createFruit

const fruits = ["apple", "mango", "grapes"];

await createFruits(fruits);


