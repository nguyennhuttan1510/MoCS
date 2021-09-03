import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../style/_Home.scss";

import TableDetail from "views/Home/components/TableDetail";
import ListTable from "views/Home/components/ListTable";
import ChefDetail from "views/Home/components/ChefDetail";

import { table, setIsDetail } from "reduces/dashboard";

import {
  handleAddTable,
  handleAddMenuTable,
  handleRemoveFood,
} from "util/socket/ActionHome";
import { openNotificationWithIcon } from "components/Notification/Notification";

const Home = () => {
  const state = useSelector((state) => state.dashboard);
  const { isRedirectDetail } = state;
  const profile = useSelector((state) => state.user.profile);
  const tableCurrent = state.table;
  const tablesActive = state.data;
  const dispatch = useDispatch();

  const handleGetTableDetail = () => {
    if (!tablesActive) return;
    const result = tablesActive.filter((item) => item.id === tableCurrent.id);
    return result[0];
  };

  const onClose = () => {
    dispatch(setIsDetail(false));
    dispatch(table(false));
  };

  const handleSelectTable = (objTable) => {
    if (profile.position === "Staff") {
      // IF POSITION IS STAFF => TABLE IS CREATED
      if (objTable?.id) {
        const initObjTable = {
          id: objTable.id,
          name: objTable.name,
          menu: [],
          total_cost: 0,
        };
        handleAddTable(initObjTable);
      }
    }
    dispatch(setIsDetail(true));
    dispatch(table(objTable));
  };

  const handleRemoveMenu = (objFood, idTable) => {
    const payload = { id: idTable, food: objFood };
    handleRemoveFood(payload);
  };

  const handleAddMenu = (objFood, idTable) => {
    if (profile.position === "Admin") {
      openNotificationWithIcon(
        "error",
        "Error",
        "Admin isn't allow do this action"
      );
    }
    const total = (objFood?.price * (100 - objFood.discount)) / 100;
    const menu = {
      //a new food is added into list menu
      id: objFood?.id,
      name: objFood?.name,
      count: 1,
      price: objFood?.price,
      discount: objFood.discount,
      total: total,
      chef: false,
      status: "Order", // Order| Pending | Done
    };
    const payload = {
      id: idTable,
      food: menu,
    };
    handleAddMenuTable(payload);
  };

  return (
    <>
      {isRedirectDetail ? (
        profile.position === "Staff" || profile.position === "Admin" ? (
          <TableDetail
            order={handleGetTableDetail()}
            handleAddMenu={handleAddMenu}
            handleRemoveMenu={handleRemoveMenu}
            onClose={onClose}
          />
        ) : (
          <ChefDetail table={handleGetTableDetail()} />
        )
      ) : (
        <ListTable
          listTable={tablesActive}
          handleSelectTable={handleSelectTable}
        />
      )}
    </>
  );
};

export default Home;
