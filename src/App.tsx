import "./App.css";
import { Route, Routes } from "react-router-dom";

import { AppRoutes } from "./components/Routes";

const allRoutes = [...AppRoutes];

function App() {
  return (
    <>
      <Routes>
        {allRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.Element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
