import "./App.css";
import { Route, Routes } from "react-router-dom";

import { AppRoutes } from "./components/Routes";
import Layout from "./Layout";

const allRoutes = [...AppRoutes];

function App() {
  return (
    <>
      <Layout>
        <Routes>
          {allRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.Element} />
          ))}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
("");
