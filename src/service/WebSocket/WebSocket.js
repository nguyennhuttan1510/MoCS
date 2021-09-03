import React from "react";
import { addTable, staffs, listMenu, listTable } from "reduces/dashboard";
import { managementStaff, foodBestSeller } from "reduces/management-staff";

import { socket } from "service/WebSocket/ConnectSocket";
import { useDispatch } from "react-redux";

const WebSocket = (props) => {
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

  socket.on("data-best-seller", (data) => {
    console.log(data);
    dispatch(foodBestSeller(data));
  });
  return <>{props.children}</>;
};

WebSocket.propTypes = {};

export default WebSocket;
