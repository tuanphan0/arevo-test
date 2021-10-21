import { Layout, Menu, Row } from "antd";
import './index.css';
const { Header } = Layout;
const AppHeader = () => {
  return (
    <Header style={{ background: '#fff', minHeight: 52, padding: 0 }}>
      <Row className={'header-container'}>
        <Header className="header" style={{ width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
            <Menu.Item key="1">Countries</Menu.Item>
            <Menu.Item key="2">Summary</Menu.Item>
            <Menu.Item key="3">About</Menu.Item>
          </Menu>
        </Header>
      </Row>
    </Header>
  );
}
export default AppHeader;