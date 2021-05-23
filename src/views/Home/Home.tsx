import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import '../../style/_Home.scss'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home: React.FC = props => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={() => { onCollapse() }}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Option 1
            </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
            </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
            </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background header_home_page" >Header</Header>
                    <Content className="content">
                        <Breadcrumb className="breadcrumb_title">
                            <Breadcrumb.Item>Map</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Row >
                                <Col className="list_table" span={4}><div className="table"><h4>table 1</h4></div></Col>
                                <Col className="list_table" span={4}><div className="table"><h4>table 2</h4></div></Col>
                                <Col className="list_table" span={4}><div className="table"><h4>table 3</h4></div></Col>
                                <Col className="list_table" span={4}><div className="table"><h4>table 4</h4></div></Col>
                                <Col className="list_table" span={4}><div className="table"><h4>table 4</h4></div></Col>
                                <Col className="list_table" span={4}><div className="table"><h4>table 4</h4></div></Col>
                                <Col className="list_table" span={4}><div className="table"><h4>table 4</h4></div></Col>
                                <Col className="list_table" span={4}><div className="table"><h4>table 4</h4></div></Col>
                                <Col className="list_table" span={4}><div className="table"><h4>table 4</h4></div></Col>
                            </Row>

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    );
};

Home.propTypes = {

};

export default Home;