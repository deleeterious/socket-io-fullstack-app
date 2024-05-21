import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Room {
  id: number;
  name: string;
  messages: string[];
}

export const Rooms = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>([]);

  const handleJoinRoom = (roomId: number) => {
    navigate(`/rooms/${roomId}`);
  };

  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get<Room[]>("http://localhost:8080/rooms");

      setRooms(res.data);
    };

    getRooms();
  }, []);

  return (
    <div>
      {rooms.map((item) => (
        <div className="border-2 border-gray-600">
          <h1>{item.name}</h1>
          <button onClick={() => handleJoinRoom(item.id)}>Join room</button>
        </div>
      ))}
    </div>
  );
};
