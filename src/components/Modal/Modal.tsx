import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { Form, Input } from 'antd';

export interface Imodal {
    content?: object,
    isVisible: boolean,
    handleSetIsVisible: Function,
    handleChangeContent: Function,
    handleClickOK: Function,
}

const ModalHome: React.FunctionComponent<Imodal> = (props: any) => {


    const { content, isVisible, handleSetIsVisible, handleChangeContent, handleClickOK } = props;

    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            handleSetIsVisible();
            setConfirmLoading(false);
            handleClickOK()
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        handleSetIsVisible();

    };


    return (
        <>
            <Modal
                title="Payment"
                visible={isVisible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: false }}
                >
                    <div className="total_cost" >{content?.cost.format}</div>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input cost!' }]}
                    >
                        <Input maxLength={9} type="number" autoComplete="off" onChange={(e) => { handleChangeContent(e.target.value) }} />
                    </Form.Item>
                    <div className="total_cost" style={{ marginTop: "20px" }} >{new Intl.NumberFormat().format(content?.cash)}</div>

                </Form>
            </Modal>
        </>
    );
};

ModalHome.propTypes = {

};

ModalHome.defaultProps = {
    isVisible: false
}

export default ModalHome;