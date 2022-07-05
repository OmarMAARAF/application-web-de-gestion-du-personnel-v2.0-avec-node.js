const express = require('express');
const app =express();
const connectDb =require('./db/Connect')
const path =require('path');
const router =require('./router/main');
const WebSocket =require('ws');
var server1 = require('http').createServer(app);
require('dotenv').config()

//middleware
app.use(express.static(path.join(__dirname,'public')))
app.use('/',express.static(path.join(__dirname,'public/templates/admin/')))
app.use(express.json())

app.use('/api',router)


const wss =new WebSocket.Server({server : server1})
wss.on('connection', function connection(ws) {
    console.log("Connected to Server")
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
    ws.send('something');
});




//404 and 500 pages
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'public/templates/admin/404.html'))
    res.status(500).sendFile(path.join(__dirname,'public/templates/admin/500.html'))
  })



const port = 3000
const start = async()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        server1.listen(port,console.log(`Server listen on port ${port}...`));
    }catch(error){
        console.log(error)
    }
}
start();
