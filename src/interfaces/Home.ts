export interface IListTable {
    handleSelectTable: Function,
}

export interface food  {
    id: number,
    name: string,
    count: number,
    price: number,
    discount: number,
    total: number,
}

export interface order {
    id: number,
    name: string,
    menu: Array<food>,
    total_cost: number,
};

export interface ITableDetail {
    order?: order,
    handleAddMenu: Function,
    onClose: Function
}