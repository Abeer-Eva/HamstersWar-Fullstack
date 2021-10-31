const express = require('express')
const router = express.Router()
const { connect } = require('../hamsterbase')
const { isGameObject, getOneById, getRandom, addOne, deleteOne, getAll, getCutest, updateOne, clear, isHamsterObject } = require('../script/scripts')





//----------ENDPOINT-----------//
//GET All HAMSTERS
router.get('/', async (req, res) => {
    let hamsterArray = await getAll()
    res.send(hamsterArray)

})

//GET RANDOM HAMSTER
router.get('/random', async (req, res) => {
    console.log("random hamster")
    let randomHamster = await getRandom()
    res.send(randomHamster)

})


//CUTEST
router.get('/cutest', async (req, res) => {
    console.log("cute route")
    let array = await getCutest()
    res.send(array)
})


// GET HAMSTER WITH ID
router.get('/:id', async (req, res) => {
    const maybeHamster = await getOneById(req.params.id)
    if (!maybeHamster) {
        res.sendStatus(404)
    } else {
        res.send(maybeHamster)

    }
})




// POST  NEW HAMSTER
router.post('/', async (req, res) => {
    let body = await req.body

    if (!isHamsterObject(body)) {
        res.sendStatus(400).send('its not right object')
    } else {
        let newHamster = await addOne(body)

        res.status(200).send(newHamster)
    }

})


//DELET
router.delete('/:id', async (req, res) => {
    console.log("go to delet")
    let array = await deleteOne(req.params.id)
    if (array) {
        console.log("deleting ..")
        res.sendStatus(200)
    } else {
        console.log("  not deleting")
        res.sendStatus(404)
    }
})

//----put update to a hamster
router.put('/:id', async (req, res) => {
    let isHamster = await getOneById(req.params.id)
    const maybeHamster = req.body

    //kontrollera att hamster med id finns
    if (!isHamster) {

        res.sendStatus(404)
        //kontrollera att body är okej 
    } else if (!isGameObject(maybeHamster)) {



        res.sendStatus(400)
        return
    } else {

        await updateOne(req.params.id, maybeHamster)
        res.sendStatus(200)
    }


})
//------------MATCH-------------------

// //---get all matches
// router.get('/', async(req, res) => { 
//     let array = await getAllMatches()
//     if ( array.length > 0 ) {
//         res.status(200).send(array)
//     } else {
//         res.sendStatus(404)
//     }
// })
module.exports = router;
