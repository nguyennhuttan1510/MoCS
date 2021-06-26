import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import '../../style/_Home.scss'

import TableDetail from 'views/Home/components/TableDetail';
import ListTable from 'views/Home/components/ListTable';
import ChefDetail from 'views/Home/components/ChefDetail';

import { food, order } from '../../interfaces/Home';

import { addMenuOfTable, addTable, table, setIsDetail, removeMenuOfTable } from 'Reduces/dashboard'

import { handleAddTable, handleAddMenuTable, handleRemoveFood } from 'util/socket/actionHome';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';


const Home: React.FC = props => {
    // const history = useHistory();

    const state = useSelector((state: any) => state.dashboard);
    const { isRedirectDetail } = state;
    const profile = useSelector((state: any) => state.staffs.profile);
    const tableCurrent = state.table
    const tables: order[] = state.data


    // const [isDetail, setIsDetail] = useState<boolean>(false);
    const [orders, setOrders] = useState<Array<order>>(tables);
    const dispatch = useDispatch();

    useEffect(() => {
        setOrders(tables);
    }, [tables]);

    const handleGetTableDetail = () => {
        if (!orders) return
        const result = orders.filter((item) => item.id === tableCurrent.id);
        return result[0];
    }

    const onClose = (isClose: boolean) => {
        dispatch(setIsDetail(false))
        dispatch(table(false));
    }

    const handleSelectTable = (objTable: order) => {
        if (profile.position === "Staff") {               // IF POSITION IS STAFF => TABLE IS CREATED
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

            }
        }
        dispatch(setIsDetail(true));
        dispatch(table(objTable));

    }

    const handleRemoveMenu = (objFood: any, idTable: number) => {
        console.log(idTable)
        const payload = { id: idTable, food: objFood }
        handleRemoveFood(payload)
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
            chef: false,
            status: "Order"                 // Order| Pending | Done 
        }
        const payload = {
            id: idTable, food: menu
        }
        handleAddMenuTable(payload)
    }

    return (
        <>
            {isRedirectDetail ? (profile.position === "Staff" || profile.position === "Admin" ? <TableDetail order={handleGetTableDetail()} handleAddMenu={handleAddMenu} handleRemoveMenu={handleRemoveMenu} onClose={onClose} /> : <ChefDetail table={handleGetTableDetail()} />) : <ListTable listTable={orders} handleSelectTable={handleSelectTable} />}
        </>
    );
};

Home.propTypes = {

};

export default Home;