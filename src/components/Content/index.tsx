import { Card, Layout } from "antd";
import SummaryPage from "../../app/page/SummaryPage";

const { Content } = Layout;
const AppContent = () => {
    return (
        <Content style={{ margin: 16 }}><Card style={{ minHeight: '60vh'}}><SummaryPage /></Card></Content>
    );
}
export default AppContent;