import { io } from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_API_SERVER;

export const socket = io(ENDPOINT, {
  transports: ["websocket"],
});
