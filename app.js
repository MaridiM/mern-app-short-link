const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const path = require('path')

require('dotenv').config({ path: './config/config.env' })
require('./models/user.model')
require('./models/link.model')


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))


// Во время продашена мы отправляем  статическую  папку client/build
// на все пути  отправляем файл client/build/index.html
if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client',  'build', 'index.html'))
    })

}



const PORT = process.env.PORT || 8000

async function start () {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
        app.listen(PORT, () => console.log('[+] Listening has bin started on port' + PORT))
    } catch (error) {
        console.log('[-] Server Error', error.message)
        process.exit(1)
    }
}

start()