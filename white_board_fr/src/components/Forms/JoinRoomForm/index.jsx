import { useState } from "react";
import { useNavigate } from "react-router-dom";


const JoinRoomForm = ({uuid, socket, setUser}) =>{

    const  [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleJoinRoom = (e)=>{
        e.preventDefault();

        const roomData={
            name,
            roomId,
            userId: uuid(),
            host: false,
            presenter: false,
        };
        setUser(roomData);
        navigate(`/${roomId}`);
        socket.emit("userJoined", roomData);
    }

    return (
        <form className="form  col-md-12 mt-5">

        <div className="form-group">
            <input
                type="text"
                className="form-control my-2"
                value={name}
                placeholder="Enter your name"
                onChange={(e)=>setName(e.target.value)}
            />

        </div>

        <div className="form-group  ">


            
                <input
                    type="text"
                    className="form-control my-2 "
                    value={roomId}
                    placeholder="Enter room code"
                    onChange={(e)=>setRoomId(e.target.value)}
                />

                
            
        </div>
        <button type="submit" uuid={uuid} onClick={handleJoinRoom} className="mt-4 btn-primary btn-block form-control">
            Join Room
        </button>


    </form>

                
    );

    
};

export default JoinRoomForm;