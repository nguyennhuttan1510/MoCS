import React, { FunctionComponent, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { addTable } from 'Reduces/dashboard';
import { addStaff } from 'Reduces/staffs';

import { socket } from 'config/connectSocket'
import { useDispatch } from 'react-redux';

export interface Iwebsocket {
    children: React.ReactNode
}

const WebSocket: FunctionComponent<Iwebsocket> = (props) => {
    const dispatch = useDispatch();

    socket.on("data-table", (listTable) => {
        dispatch(addTable(listTable))
    });

    socket.on("data-staff", (listStaff) => {
        console.log(listStaff)
        dispatch(addStaff(listStaff))
    });

    return (
        <>
            {props.children}
        </>
    );
};

WebSocket.propTypes = {

};

export default WebSocket;