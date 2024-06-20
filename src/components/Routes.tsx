import HomePage from "./pages/HomePage/HomePage";
import AthletesPage from "./pages/AthletesPage/AthletesPage";

export const AppRoutes = [
  {
    path: "/",
    Element: <HomePage />,
  },
  {
    path: "/athletes",
    Element: <AthletesPage />,
  },
];
