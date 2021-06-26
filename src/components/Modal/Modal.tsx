import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { Form, Input } from 'antd';

export interface Imodal {
    timeout?: number,
    data?: object,
    contents: string,
    className?: string,
    isVisible: boolean,
    handleSetIsVisible: Function,
    handleChangeData?: Function,
    handleClickOK?: Function,
}

const ModalHome: React.FunctionComponent<Imodal> = (props: any) => {

    const { contents, data, isVisible, handleSetIsVisible, handleChangeData, handleClickOK, timeout, ...rest } = props;

    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            handleSetIsVisible();
            setConfirmLoading(false);
            handleClickOK()
        }, timeout);
    };

    const handleCancel = () => {
        handleSetIsVisible();

    };

    const displayStatusButton = () => {
        if (!data?.chef || !data?.profile) return "Ok"
        let result = ""
        if (data?.status === "Order") {
            result = "OK"
        } else if (data.profile?.name == data.chef?.name) {
            result = "Done"
        }
        else {
            result = "Recieve"
        }
        console.log(result)
        return result
        // data?.status === "Order" ? "OK" : (data.profile?.name == data.chef?.name ? "Done" : "Recieve")
    }
    return (
        <>
            <Modal
                title="Payment"
                visible={isVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
                        {contents === "foodOfTable" ? displayStatusButton() : "OK"}
                        {/* {data?.status === "Order" ? "OK" : "Done"} */}
                    </Button>,
                ]}
            >
                {contents === "priceBill" ? (
                    <Form
                        name="basic"
                        initialValues={{ remember: false }}
                    >
                        <div className="total_cost" >{data?.cost.format}</div>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input cost!' }]}
                        >
                            <Input maxLength={9} type="number" autoComplete="off" onChange={(e) => { handleChangeData(e.target.value) }} />
                        </Form.Item>
                        <div className="total_cost" style={{ marginTop: "20px", color: `${data.cash >= 0 ? "green" : "red"}` }} >{new Intl.NumberFormat().format(data?.cash)}</div>

                    </Form>
                ) : (contents === "foodOfTable" ? (
                    <>
                        {
                            data?.note ? (<div>{data?.note.map((item: any) => {
                                return (
                                    <h4>{item}</h4>
                                )
                            })}</div>) : "No Note"
                        }
                    </>
                ) : <></>)
                }
            </Modal>
        </>
    );
};

ModalHome.propTypes = {

};

ModalHome.defaultProps = {
    isVisible: false,
    timeout: 2000,
    contents: "priceBill",
    data: {},
}

export default ModalHome;