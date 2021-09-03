import React, { useMemo } from "react";
import { Row, Col, Badge } from "antd";
import { IListTable } from "interfaces/Home";
import { useSelector } from "react-redux";

const ListTable: React.FunctionComponent<IListTable> = (props) => {
  const { handleSelectTable, listTable } = props;
  const ListTables = useSelector((state: any) => state.dashboard.listTable);
  const isActiveTable = (item: any) => {
    const isActiveTable = listTable.some((e) => e.id === item.id);
    const isOrderedTable = listTable.some(
      (e) => e.id === item.id && e.isMakeFood
    );
    if (isActiveTable && isOrderedTable) {
      return "processing";
    }
    if (isActiveTable) {
      return "active";
    }
  };

  const foodStatusOrder = (item: any) => {
    const table = listTable.find((e) => e.id === item.id);
    if (!table) return;
    const countFoodHaveDone = table.menu.filter((e) => e.status !== "Done");
    return countFoodHaveDone.length;
  };

  const sortListTable = useMemo(() => {
    if (!ListTables) return [];
    const cloneListTables = [...ListTables];
    cloneListTables.sort((a: any, b: any) => {
      const wordA: any = a.name.split(" ");
      const wordB: any = b.name.split(" ");
      return wordA[1] && wordB[1] ? wordA[1] - wordB[1] : 0;
    });
    return cloneListTables;
  }, [ListTables]);

  return (
    <>
      <Row>
        {sortListTable.map((item: any, key: any) => (
          <Col key={key} className="list_table" span={4}>
            <Badge count={foodStatusOrder(item)}>
              <div
                className={`table noselect ${isActiveTable(item)}`}
                onClick={() => {
                  handleSelectTable(item);
                }}
              >
                <h4>{item.name}</h4>
              </div>
            </Badge>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ListTable;
