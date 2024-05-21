import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useStore } from "./context";

const socket = io("http://localhost:8080");

export const Room = () => {
  const { id } = useParams();
  const { userName } = useStore();

  const [room, setRoom] = useState({});

  useEffect(() => {
    socket.emit("join room", { userName, roomId: id });
  }, [id, userName]);

  useEffect(() => {
    socket.on("room update", (data) => {
      console.log(data);
    });
  }, []);

  useEffect(
    () => () => {
      socket.emit("disconnect room", { userName, roomId: id });
    },
    []
  );

  return <div></div>;
};
