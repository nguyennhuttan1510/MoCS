import React, { FunctionComponent, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { addTable, staffs } from 'Reduces/dashboard';

import { socket } from 'components/WebSocket/connectSocket'
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
        dispatch(staffs(listStaff))
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