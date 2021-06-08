import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import '../../style/_Home.scss'

import TableDetail from './components/TableDetail';
import ListTable from './components/ListTable';

import { food, order } from '../../interfaces/Home';

import { addMenuOfTable, addTable, table, removeMenuOfTable } from 'Reduces/dashboard'

import { handleAddTable, handleAddMenuTable, handleRemoveFood } from 'util/socket/action';


const Home: React.FC = props => {
    const state = useSelector((state: any) => state.dashboard);
    const tableCurrent = state.table
    const order: order[] = state.data

    const [isDetail, setIsDetail] = useState<boolean>(false);
    const [orders, setOrders] = useState<Array<order>>(order);
    const dispatch = useDispatch();

    useEffect(() => {
        setOrders(order);
        console.log("render home")
    }, [order]);

    const handleGetTableDetail = () => {
        if (!orders) return
        const result = orders.filter((item) => item.id === tableCurrent.id);
        return result[0];
    }

    const onClose = (isClose: boolean) => {
        setIsDetail(isClose)
        dispatch(table(false));
    }

    const handleSelectTable = (objTable: order) => {
        if (objTable?.id) {
            const initObjTable = {
                id: objTable.id,
                name: objTable.name,
                menu: [],
                total_cost: 0
            }
            const result = orders.filter((item) => item.id === objTable.id);
            console.log(result)
            console.log("into handleSelectTable");
            if (result.length === 0) {
                handleAddTable(initObjTable)
            }
            setIsDetail(!isDetail);
            dispatch(table(objTable));
        }
    }

    const handleRemoveMenu = (objFood: any, idTable: number) => {
        console.log(idTable)
        const payload = { id: idTable, food: objFood }
        handleRemoveFood(payload)
        // const action = removeMenuOfTable(payload)
        // dispatch(action);
    }

    const handleAddMenu = (objFood: any, idTable: number) => {
        // TODO: DUMMY DISCOUNT
        const total = (objFood?.price * (100 - 20) / 100) //THIS IS DUMMY DATA DISCOUNT
        const menu = {                                    //a new food is added into list menu 
            id: objFood?.id,
            name: objFood?.name,
            count: 1,
            price: objFood?.price,
            discount: 20,
            total: total,
        }
        const payload = {
            id: idTable, food: menu
        }
        handleAddMenuTable(payload)
    }

    return (
        <>
            {isDetail ? <TableDetail order={handleGetTableDetail()} handleAddMenu={handleAddMenu} handleRemoveMenu={handleRemoveMenu} onClose={onClose} /> : <ListTable listTable={orders} handleSelectTable={handleSelectTable} />}
        </>
    );
};

Home.propTypes = {

};

export default Home;