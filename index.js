
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" };

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const fruits = ["apple"];

const fruitCollection = db.collection('fruits');

async function createFruits() {
    return await fruits.map(fruit => fruitCollection.add({
        type: fruit,
        status: "new",
        qty: 0
    }))
}

const fruitsQuery = await fruitCollection
    .where('type', '==', 'banana')
    .where('qty', '<', 17)
    .orderBy('qty');

const observer = fruitsQuery.onSnapshot(async snapshot => {
    
    console.log(snapshot.size);

    if (snapshot.size === 0) {
        console.log("... done with all the fruits!");
        observer();
    } else {
       
        // snapshot
        const queuedFruits = await fruitsQuery.limit(1).get();
        // queuedFruits.size
        console.log("Updating fruit...");
        if (!queuedFruits.empty){
            updateQty(queuedFruits.docs[0].id)
        }

        // queuedFruits.forEach(fruitSnapshot => updateQty(fruitSnapshot.id) )
    }

});

// console.log(list);
// await createFruits();
// await createFruits();

const fruitsFound = await fruitsQuery.get();
const fruitIds = [];

fruitsFound.forEach( apple => {
    console.log(apple.id)
    fruitIds.push(apple.id);
});


async function updateQty(id) {
    if (id) {
        const fruitRef = await fruitCollection.doc(id)
        const fruitDoc = await fruitRef.get();
        if (fruitDoc.exists) {
            await fruitRef.update({
                qty : Number(fruitDoc.data().qty) + 1,
                status : 'updated'
            });
        }
    }
}


updateQty('KDE7A2OlIaxhIKdinXF7')


// let index = 0;
// const interval = setInterval(async () => {
    
//     if (index === fruitIds.length) {
//         clearInterval(interval)
//         console.log("done with all...");
//         // observer();
//     }

//     await updateQty(fruitIds[index++])
//     // await city_ref.update({"capital": True})
    
// }, 1000)


// setTimeout(() => {
//     // observer();
// }, 5000);



console.log("done!")