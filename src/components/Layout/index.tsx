import { Layout } from "antd";
import AppContent from "../Content";
import AppFooter from "../Footer";
import AppHeader from '../Header/index';
import './index.less';
const AppLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }} className="maincontent" >
            <Layout>
                <AppHeader />
                <AppContent />
                <AppFooter />
            </Layout>
        </Layout>
    );
}
export default AppLayout;