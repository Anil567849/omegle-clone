import { Socket } from 'dgram';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { io } from 'socket.io-client';
const URL = 'http://localhost:8000';

function Room() {
    let [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [lobby, setLobby] = useState<Boolean>(true);
    
    useEffect(() => {
      const socket = io(URL);

      socket.on('send-offer', ({roomId}) => {
        alert("send offer please");
        socket.emit("offer", {
          sdp: "",
          roomId,
        });
      })

      socket.on('offer', ({sdp, roomId}) => {
        alert("send answer please");
        socket.emit("answer", {
          sdp,
          roomId,
        });
      })
      socket.on('answer', ({sdp, roomId}) => {
        alert("connection done");
        setLobby(false);
      })
      
    }, [name])
    
  return (
    <>
      {
        lobby ? <div>Waiting for another person to connect...</div> : <div>
          <h1>Done: {name}</h1>
        </div>
      }
    </>
  )
}

export default Room