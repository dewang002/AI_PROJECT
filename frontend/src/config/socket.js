import socket from "socket.io-client"

let socketInstence = null;

export const initializeSocket =(projectId)=>{

    socketInstence = socket(import.meta.env.VITE_URL,{
        auth:{
            token:localStorage.getItem("token")
        },
        query :{
            projectId
        }
    })
    return socketInstence

}

export const sendMessage = (eventName,data) =>{
    socketInstence.emit(eventName,data)
}

export const reciveMessage = (eventName,cb) =>{
    socketInstence.on(eventName,cb)
}