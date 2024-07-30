import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io('http://localhost:8000')

function App() {

  const [msgText, setMsgText] = useState('')
  const [msgReceived, setMsgReceived] = useState('')
  const [room, setRoom] = useState('')
  const [isJoined, setIsJoined] = useState(false)

  const sendMsg = () => {
    socket.emit('sendMsg', { msgText, room })
    setMsgText('')
  }

  const joinRoom = () => {
    if (room !== '') socket.emit('joinRoom', room)
    setIsJoined(true)
  }

  useEffect(() => {
    socket.on('receiveMsg', msg => setMsgReceived(msg))

  }, [socket])


  return (
    <div className="App">
      {
        !isJoined ? (
          <div>
            <input type="number" placeholder='Room No' onChange={(e) => setRoom(e.target.value)} />
            <button onClick={joinRoom}>Join Room</button>
          </div>
        ) : (
          <div>
            <h1>You are in room {room}</h1>
            <button onClick={() => { setRoom(''); setIsJoined(false) }} >Exit the Room</button>
          </div>
        )
      }

      <div>
        <input type="text" placeholder='Message..' onChange={(e) => setMsgText(e.target.value)} />
        <button onClick={sendMsg}>Send Message</button>
      </div>
      <div>
        <h1>Received last Message:</h1>
        {msgReceived}
      </div>

    </div>
  );
}

export default App;
