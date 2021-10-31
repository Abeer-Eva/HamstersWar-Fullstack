const { connect } = require('../hamsterbase')
const db = connect()
const HAMSTERS = 'HAMSTERS'
const MATCHES = 'matches'



//-----------------Functions-----------------//




//Get All Hamsters like an array

async function getAll() {

    console.log('Retrieving all documents from database...');

    const hamstersRef = db.collection(HAMSTERS)
    const hamstersSnapshot = await hamstersRef.get()

    if (hamstersSnapshot.empty) {
        console.log('Nothing to show in collection.')
        return []
    }

    const hamsterArray = []

    await hamstersSnapshot.forEach(async docRef => {
        const data = await docRef.data()
        //  plucka id I will use to put or delet or ...
        data.id = docRef.id
        hamsterArray.push(data)

    })
    // console.log('Data from database:', hamsterArray);
    return hamsterArray
}

//GET a Hamster with  specific Id

async function getOneById(id) {
    const docRef = db.collection(HAMSTERS).doc(id)
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
        return null
    } else {
        return await docSnapshot.data()


    }
}

//GET random Hamster
const getRandom = async () => {


    const dataRef = db.collection(HAMSTERS)
    const dataSnapshot = await dataRef.get()

    if (dataSnapshot.empty) {
        return []
    }

    const array = []

    await dataSnapshot.forEach(async docRef => {
        const data = await docRef.data()
        data.id = docRef.id
        array.push(data)
    })
    const randomElement = array[Math.floor(Math.random() * array.length)]
    return randomElement
}




//DELET ONE HAMSTER

const deleteOne = async (id) => {
    console.log("delet1")
    const docRef = db.collection(HAMSTERS).doc(id)
    console.log("delet2")
    const docSnapshot = await docRef.get()
    console.log("delet3")
    if (docSnapshot.exists) {
        console.log(`Deleting hamster with id ${id} `);
        await docRef.delete()
        return true
    } else {
        return false
    }
}


//POST   ADD A NEW HAMSTER 

const addOne = async (body) => {
    const docRef = await db.collection(HAMSTERS).add(body)
    console.log(`Added hamster named ${body.name} with id ${docRef.id}.`);
    const idObject = {
        id: docRef.id
    }
    return idObject;
}
// PUT - RESULTS
const updateOne = async (id, updates) => {
    const docRef = db.collection(HAMSTERS).doc(id)
    // console.log(`Updated  ${maybeHamster.name} with id ${docRef.id}`)
    // const updates = {
    //     wins: wins,
    //     defeats: defeats,
    //     games: games
    // }
    const settings = { merge: true }
    await docRef.set(updates, settings)
    // docRef.update(updates)

}



//GET CUTEST
const getCutest = async () => {

    const hamstersRef = db.collection(HAMSTERS)

    const hamstersSnapshot = await hamstersRef.get()
    if (hamstersSnapshot.empty) {
        return false
    }
    const array = []
    await hamstersSnapshot.forEach(async docRef => {
        const data = await docRef.data()
        data.id = docRef.id
        array.push(data)
    })
    // Sorterar alla hamstrar baserat på diff
    array.sort((a, b) => {
        let aDiff = a.wins - a.defeats
        let bDiff = b.wins - b.defeats
        return bDiff - aDiff

    })
    console.log("6")
    // Högsta diff-värdet
    let maxScore = array[0].wins - array[0].defeats
    // Dubbelkollar om flera har samma poäng
    let allWinners = array.filter(x => x.wins - x.defeats === maxScore)
    return allWinners
}
//-------CLEAR------------
async function clear() {
    const collectionRef = db.collection(HAMSTERS)
    const collectionSnapshot = await collectionRef.get()

    if (collectionSnapshot.empty) {
        return
    }

    collectionSnapshot.forEach(docRef => {
        collectionRef.doc(docRef.id).delete()
    })
}


//------Hamster is Object----------
function isHamsterObject(maybe) {
    if ((typeof maybe) !== 'object') {
        return false
    }

    let keys = Object.keys(maybe)
    if (
        !keys.includes('name') ||
        !keys.includes('age') ||
        !keys.includes('favFood') ||
        !keys.includes('loves') ||
        !keys.includes('imgName') ||
        !keys.includes('wins') ||
        !keys.includes('defeats') ||
        !keys.includes('games')
    ) {
        return false
    }
    return true
}


function isGameObject(maybe) {
    if ((typeof maybe) !== 'object') {
        return false
    }
    ////body måste inhålla Keys för win och games
    let keys = Object.keys(maybe)
    if (
        keys.length < 1
        // !keys.includes('wins') || 
        // !keys.includes('games')
    ) {
        return false
    }

    return true
}

module.exports = { isGameObject, getAll, getOneById, getRandom, getCutest, updateOne, deleteOne, clear, addOne, isHamsterObject }