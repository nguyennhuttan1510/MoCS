import { socket } from 'components/WebSocket/connectSocket'
import { addTable } from 'Reduces/dashboard';

export const handleAddTable = (payload: any) => {
    socket.emit("add-table", payload);
};

export const handleAddMenuTable = (payload: object) => {
    socket.emit("add-menu", payload);
};

export const handlePayBillTable = (payload: number) => {
    socket.emit("pay-bill", payload);
};

export const handleRemoveFood = (payload: object) => {
    socket.emit("remove-menu", payload)
};

export const handlePushMenuToChef = (payload: object) => {
    socket.emit("push-to-chef", payload)
};

export const handleChefSelectFood = (payload: object) => {
    socket.emit("make-food", payload)
};

