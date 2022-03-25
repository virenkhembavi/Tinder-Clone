const express = require('express');
const cors = require('cors')
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { json } = require('express');

const URI = `mongodb+srv://tinderclone:Happy31@cluster0.nob8w.mongodb.net/Cluster0?retryWrites=true&w=majority`

const PORT = 8080

const app = express()
app.use(cors())

app.use(express.json())

app.get('/', async (req, res) => {
    // console.log("got 1")
    res.status(200).json('WE GOT THE RESPONSE!...')
})

app.post('/signup', async (req, res) => {
    // console.log("login-data")
    const client = new MongoClient(URI)
    console.log(req.body)
    const { email, password } = req.body

    const genrateUserId = uuidv4()

    const hashPasswod = await bcrypt.hash(password, 10)
    try {
        await client.connect()
        const dataBaseName = client.db('app-data')
        const users = dataBaseName.collection('Data')

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(401).send('User Already Exists Please Login.')
        }
        const sanitizedEmail = email.toLowerCase();

        const data = {
            user_id: genrateUserId,
            email: sanitizedEmail,
            hashed_password: hashPasswod
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        })
        // , userId: genrateUserId, email: sanitizedEmail 
        res.status(201).json({ token, userId: genrateUserId })
    } catch (err) {
        console.log(err)
    }
})


app.post('/login', async (req, res) => {
    const client = new MongoClient(URI)
    // console.log("login-using-login-button")
    const { email, password } = req.body

    try {
        await client.connect()
        const dataBaseName = client.db('app-data')
        const users = dataBaseName.collection('Data')

        const user = await users.findOne({ email })

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            // , userId: user.user_id, email 
            res.status(201).json({ token, userId: user.user_id })
        }
        // res.status(400).send('Invalid Ceredintial')
    } catch (err) {
        console.log(err)
    }

})

// for single user
app.get('/userdata', async (req, res) => {
    const client = new MongoClient(URI)
    const userId = req.query.userId
    // console.log(req.query.userId)
    try {
        await client.connect()
        const dataBaseName = client.db('app-data')
        const users = dataBaseName.collection('Data')

        const query = { user_id: userId }
        // console.log(query)
        const user = await users.findOne(query)
        res.send(user)
        // res.send('we got response')
    } finally {
        await client.close()
    }
})

app.get('/generateduser', async (req, res) => {
    const client = new MongoClient(URI)
    const gender = req.query.gender
    // console.log(gender)
    try {
        await client.connect()
        const dataBaseName = client.db('app-data')
        const users = dataBaseName.collection('Data')
        const query = { gender_identity: gender }
        const foundUsers = await users.find(query).toArray()

        // const returedUsers = await users.find().toArray()
        res.send(foundUsers)
    } finally {
        await client.close()
    }
})

app.put('/users', async (req, res) => {
    const client = new MongoClient(URI)
    const formData = req.body.formData
    console.log(formData)
    try {
        await client.connect()
        const dataBaseName = client.db('app-data')
        const users = dataBaseName.collection('Data')

        const query = { user_id: formData.user_id }

        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches,
            }
        }
        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)
    } finally {
        await client.close()
    }

})

app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(URI)
    const { userId, matchedUserId } = req.body

    // console.log(req.body)
    try {
        await client.connect()
        const dataBaseName = client.db('app-data')
        const users = dataBaseName.collection('Data')

        const query = { user_id: userId }

        const updateDocument = {
            $push: {
                matches: { user_id: matchedUserId },
            }
        }

        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})
// match users

app.get('/match', async (req, res) => {
    console.log("OK!")
    const client = new MongoClient(URI)
    const matchedUserId = JSON.parse(req.query.userID)
    console.log(req.query.userID + "1")
    console.log(typeof matchedUserId + "2")

    try {
        await client.connect()
        const dataBaseName = client.db('app-data')
        const users = dataBaseName.collection('Data')
        const pipeline =
            [
                {
                    $match: {
                        "user_id": {
                            '$in': matchedUserId
                        }
                    }
                }
            ]
        const foundUser = await users.aggregate(pipeline).toArray()
        console.log(foundUser)
        res.send(foundUser)
    } finally {
        await client.close()
    }
})

app.get('/messages', async (req, res) => {
    const client = new MongoClient(URI)
    const { userId, correspondingUserId } = req.query
    console.log(userId, correspondingUserId)
    try {
        await client.connect()
        const dataBaseName = client.db('app-data')
        const messages = dataBaseName.collection('Message')

        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }

        const foundMessages = await messages.find(query).toArray()

        res.send(foundMessages)

    } finally {
        await client.close()
    }
})



app.listen(PORT, (() => console.log(`port is running on : ${PORT}`)))