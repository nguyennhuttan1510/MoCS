import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Badge } from 'antd';

import { food, IChefDetail } from 'interfaces/Home';
import ModalHome from "components/Modal/Modal"
import { handleChefSelectFood } from 'util/socket/actionHome';

import 'style/_Home.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ChefDetail: React.FC<IChefDetail> = props => {
    const { table } = props;
    const [isVisible, setIsVisible] = useState(false)
    const [currentFood, setcurrentFood] = useState<any>(null)
    const [makeFood, setMakeFood] = useState({
        idFood: 0,
        idTable: 0,
    })

    console.log(currentFood)
    const profile = useSelector((state: any) => state.staffs.profile);

    const handleMakeFood = (idFood: number, idTable: number) => {
        setMakeFood({
            idFood: idFood,
            idTable: idTable,
        })
        const detailFood = table?.menu.find((e) => e.id === idFood)
        if (!detailFood) return
        setcurrentFood({ ...detailFood, profile })
    }

    const handleFoodReceive = () => {
        const payload = {
            id: makeFood.idTable,
            food: makeFood.idFood,
            chef: profile,
            statusFood: "Pending"
        }
        handleChefSelectFood(payload);
    }


    const handleSetIsVisible = () => {
        setIsVisible(false)
    }

    return (
        <>
            <div id="detail-chef">
                <ModalHome contents="foodOfTable" data={currentFood} isVisible={isVisible} handleSetIsVisible={handleSetIsVisible} handleClickOK={handleFoodReceive} timeout={500} />
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {table && table.isMakeFood ? table.menu.map((e, key) => (
                            <Col key={key} span={6}>
                                <Badge count={e.count}>
                                    <Card title={e.name} className={`cardfood ${e.status === "Pending" ? "pending" : (e.status === "Done" && "done")}`} bordered={false} onClick={() => { setIsVisible(!isVisible); handleMakeFood(e.id, table.id) }} >
                                        <div>note</div>
                                        {e.chef && (<><span className="mr-2" >{e.chef.name}</span><div className="icon-avatar"></div></>)}
                                    </Card>
                                </Badge>
                            </Col>
                        )) : <h3>No Food</h3>}
                    </Row>
                </div>
            </div>
        </>
    );
};

ChefDetail.propTypes = {

};

export default ChefDetail;