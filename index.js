
const connectToMongo = require('./db.js');
connectToMongo();
const express = require('express')
const app = express()
const port = 5000  //port for backend

//middleware
app.use(express.json())


//Available Routes

app.use('/api/register',require('./routes/register'))

app.use('/api/notes',require('./routes/notes'))


app.use('/api/login',require('./routes/login'))
 

app.use('/api/getUser',require('./routes/getUser'))

app.use('/api/getNotes',require('./routes/notes'))


app.use('/api/addNotes',require('./routes/addNotes'))


app.use('/api/updateNote',require('./routes/updateNote'))

app.use('/api/deleteNote',require('./routes/deleteNote'))
app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
})
