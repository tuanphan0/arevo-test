import { Card, Layout } from "antd";
import Summary from "../../features/summary/Summary";

const { Content } = Layout;
const AppContent = () => {
    return (
        <Content style={{ margin: 16 }}><Card style={{ minHeight: '60vh'}}><Summary /></Card></Content>
    );
}
export default AppContent;