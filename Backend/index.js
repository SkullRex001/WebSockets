import  { WebSocketServer , WebSocket } from "ws";

import http from 'http'


const server = http.createServer((request , response)=>{

    console.log((new Date()) + 'Recieved request for' + request.url)

    response.end("hello")

})

const wss = new WebSocketServer({server}) 

wss.on('connection' , (socket)=>{
    socket.on('error' , (err)=> console.log(err))

    socket.on('message' , (data , isBinary)=>{
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(data , {binary : isBinary})
            }
        })
    })

    // as soon as the user connect , send them this messasge
})

server.listen(8080 , ()=>{
    console.log((new Date()) + 'Server is listening on port 8080')
})