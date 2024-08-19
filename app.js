const express = require('express')
const mySqlPool = require('./config/db')
const app = express()
const port = 3000

app.use('/medico', require('./routes/medicoRoutes'));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!')
})


mySqlPool.query("SELECT 1").then(() => {
    
    //MYSQL 
    console.log('CONNECTED TO MYSQL')
    //listen
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
}).catch((error) => {
    console.log(error);
})

