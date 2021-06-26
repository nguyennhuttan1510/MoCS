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
import { useDispatch, useSelector } from 'react-redux';

import 'style/_Main.scss';
import { upCaseFirst } from 'config/func/handleString';
import { setIsDetail, table } from 'Reduces/dashboard';
import { NavLink } from 'react-router-dom';

const Main: React.FC = (props: {
    children?: React.ReactNode;
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const dashboard = useSelector((state: any) => state.dashboard);
    const profile = useSelector((state: any) => state.staffs.profile);
    const dispatch = useDispatch();
    const { staffs } = dashboard
    // const staffs = useSelector((state: any) => state.staffs.data);
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
                            <NavLink to="/">
                                Dashboard
                            </NavLink>
                        </Menu.Item>
                        {profile && profile.position === "Admin" && (
                            <>
                                <Menu.Item key="2" icon={<DesktopOutlined />}>
                                    <NavLink to="/admin">
                                        Financial Analytics
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="9" icon={<FileOutlined />}>
                                    <NavLink to="/management-staff">
                                        Management Staff
                                    </NavLink>
                                </Menu.Item>
                            </>
                        )}
                        <>
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
                        </>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background header_home_page" ><div className="header-left" >Header</div><div className="header-right" ><span className="username-header" >{profile.name}</span><UserOutlined className="icon-header-right" /></div></Header>
                    <Content className="content">
                        <Breadcrumb className="breadcrumb_title">
                            <Breadcrumb.Item onClick={() => { dispatch(setIsDetail(false)); dispatch(table(false)); }} >Map</Breadcrumb.Item>
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