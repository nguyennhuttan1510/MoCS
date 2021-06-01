import React, { useState } from 'react';
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

export interface Iredux {
    dashboard: any
}

const Main: React.FC = (props: {
    children?: React.ReactNode;
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const dashboard = useSelector((state: Iredux) => state.dashboard);
    console.log(dashboard)
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