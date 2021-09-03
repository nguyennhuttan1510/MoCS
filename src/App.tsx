import React from "react";
import "./App.css";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

import { socket } from "service/WebSocket/ConnectSocket";

socket.on("connect", () => {
  console.log(socket.id + " đã kết nối!");
});

const App: React.FC = (props) => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
