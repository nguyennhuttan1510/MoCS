import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/_Home.scss'
import TableDetail from './components/TableDetail';
import ListTable from './components/ListTable';
import { Order } from '../../util/DataTable';
import { food, order } from '../../interfaces/Home';
import { useDispatch, useSelector } from 'react-redux';
import { addMenuOfTable, addTable, table, removeMenuOfTable } from 'Reduces/dashboard'



const Home: React.FC = props => {
    const order: order[] = useSelector((state: any) => state.dashboard.data);

    console.log(order);

    const [isDetail, setIsDetail] = useState<boolean>(false);
    const [orders, setOrders] = useState<Array<order>>(order);
    const [idTable, setIdTable] = useState<number>();
    const dispatch = useDispatch();

    useEffect(() => {
        setOrders(order);
        console.log("render home")
    }, [order]);

    const tableDetail = () => {
        if (!orders) return
        const result = orders.filter((item) => item.id === idTable);
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
                // setOrders([...orders, initObjTable])
                const action = addTable(initObjTable);
                dispatch(action);
            }
            setIdTable(objTable.id)
            setIsDetail(!isDetail);
            dispatch(table(objTable));

        }


    }

    const handleRemoveMenu = (objFood: any, idTable: number) => {
        console.log(idTable)
        const payload = { id: idTable, food: objFood }
        const action = removeMenuOfTable(payload)
        dispatch(action);
    }

    const handleAddMenu = (objFood: any, idTable: number) => {
        const menu = { //a new food is added into list menu 
            id: objFood?.id,
            name: objFood?.name,
            count: 1,
            price: objFood?.price,
            discount: 20,
            total: objFood?.price,
        }
        console.log(menu);
        let arrMenu: any = [];
        if (orders) {    // Get list menu of the table 
            arrMenu = orders.filter((e) => e.id === idTable)
            arrMenu = arrMenu[0].menu

        }
        const isHadFood = arrMenu?.some((e: any) => e.id === objFood?.id);
        let arrFood: food[] = [];
        console.log("have had food", isHadFood)
        console.log("list menu", arrMenu)
        if (isHadFood) {
            arrMenu?.map((e: any) => {   // find a food have had in list menu 
                if (e.id === objFood?.id) {  // if it have had in menu, sum total and count
                    let count = e.count + 1;
                    let total = e.price * count;
                    const item = { ...e, total: total, count: count }
                    console.log("update count food", item)
                    arrFood.push(item);
                } else {
                    arrFood.push(e);            // else keep it real
                }
            });
        } else {
            console.log("not have food");
            arrFood = [...arrMenu, menu]
        }


        // setOrders(
        //     orders.map((e) => e.id === idTable ? { ...e, menu: arrFood } : e)
        // );
        const payload = {
            id: idTable, food: arrFood
        }
        const action = addMenuOfTable(payload)
        dispatch(action);
    }

    return (
        <>
            {isDetail ? <TableDetail order={tableDetail()} handleAddMenu={handleAddMenu} handleRemoveMenu={handleRemoveMenu} onClose={onClose} /> : <ListTable listTable={orders} handleSelectTable={handleSelectTable} />}
        </>
    );
};

Home.propTypes = {

};

export default Home;