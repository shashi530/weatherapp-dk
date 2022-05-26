const express = require('express');
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors())
require('dotenv').config({path:'./.env'})

const weather  = require('./controller/Wether.ctrl')
app.use('/weather',weather)


const Port = process.env.PORT ||3444
const connect = require('./configs/db')
app.listen(Port,async()=>{
    try{
        await connect()
        console.log('Working',Port);
    }catch(e){
        console.log('Nikal L**de Pahil fursat');
    }
})