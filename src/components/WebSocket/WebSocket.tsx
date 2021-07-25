import React, { FunctionComponent } from "react";
import { addTable, staffs, listMenu, listTable } from "Reduces/dashboard";
import { managementStaff } from "Reduces/management-staff";

import { socket } from "components/WebSocket/connectSocket";
import { useDispatch } from "react-redux";

export interface Iwebsocket {
  children: React.ReactNode;
}

const WebSocket: FunctionComponent<Iwebsocket> = (props) => {
  const dispatch = useDispatch();

  socket.on("data-table", (listTable) => {
    dispatch(addTable(listTable));
  });

  socket.on("data-staff", (listStaff) => {
    dispatch(staffs(listStaff));
  });

  socket.on("data-management", (data) => {
    console.log(data);
    dispatch(managementStaff(data));
  });

  socket.on("data-menu", (data) => {
    console.log(data);
    dispatch(listMenu(data));
  });

  socket.on("data-default-table", (data) => {
    console.log(data);
    dispatch(listTable(data));
  });

  return <>{props.children}</>;
};

WebSocket.propTypes = {};

export default WebSocket;
