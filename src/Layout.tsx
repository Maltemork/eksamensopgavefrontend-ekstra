import Sidebar from "./components/sidebar/Sidebar";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className={`page-content`}>{children}</main>
    </div>
  );
};

export default Layout;
