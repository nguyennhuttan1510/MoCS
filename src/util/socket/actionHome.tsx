import { socket } from "service/WebSocket/ConnectSocket";

export const handleAddTable = (payload: any) => {
  socket.emit("add-table", payload);
};

export const handleAddMenuTable = (payload: object) => {
  socket.emit("add-menu", payload);
};

export const handlePayBillTable = (payload: object) => {
  socket.emit("pay-bill", payload);
};

export const handleRemoveFood = (payload: object) => {
  socket.emit("remove-menu", payload);
};

export const handlePushMenuToChef = (payload: object) => {
  socket.emit("push-to-chef", payload);
};

export const handleChefSelectFood = (payload: object) => {
  socket.emit("make-food", payload);
};

/* 
    ACTION MANAGEMENT STAFF
*/

export const handleGetAllStaff = () => {
  socket.emit("get-all-staff");
};

export const handleGetAllMenu = () => {
  socket.emit("get-all-menu");
};

export const handleGetAllTableDefault = () => {
  socket.emit("get-all-table");
};

export const handleGetAllManagement = () => {
  socket.emit("get-data-management");
};
