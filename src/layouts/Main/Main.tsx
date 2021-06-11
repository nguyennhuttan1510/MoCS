import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';

import 'style/_Main.scss';
import { upCaseFirst } from 'config/func/handleString';

const Main: React.FC = (props: {
    children?: React.ReactNode;
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const dashboard = useSelector((state: any) => state.dashboard);
    const staffs = useSelector((state: any) => state.staffs.data);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    const { children } = props;
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={() => { onCollapse() }}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Dashboard
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Staff" className={`${staffs.length === 0 && "hide-icon"}`}>
                            {staffs.length !== 0 && staffs.map((e: any, key: number) => {
                                return e.position === "Staff" && <Menu.Item key={key + 10}>{upCaseFirst(e.name)}</Menu.Item>
                            })
                            }
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Chef" className={`${staffs.length === 0 && "hide-icon"}`} >
                            {staffs.length !== 0 && staffs.map((e: any, key: number) => {
                                return e.position === "Chef" && (<Menu.Item key={key + 20}>{upCaseFirst(e.name)}</Menu.Item>)
                            })
                            }
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
                            <Breadcrumb.Item>{dashboard.table ? dashboard.table.name : "default table"}</Breadcrumb.Item>

                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    );
};

Main.propTypes = {

};

export default Main;