import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000/";


// call to server port 5000
// const ENDPOINT = "https://socketiosv.herokuapp.com/";
export const socket = io(ENDPOINT, {
    transports: ["websocket"],
});

