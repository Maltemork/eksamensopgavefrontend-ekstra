import HomePage from "./pages/HomePage/HomePage";
import AthletesPage from "./pages/AthletesPage/AthletesPage";
import AthleteDetails from "./pages/AthletesPage/DetailPage/AthleteDetails";
import AddPage from "./pages/AthletesPage/AddPage/AddPage";
import AthleteEdit from "./pages/AthletesPage/DetailPage/EditPage/AthleteEdit";
import DisciplinesPage from "./pages/DisciplinesPage/DisciplinesPage";

export const AppRoutes = [
  {
    path: "/",
    Element: <HomePage />,
  },
  {
    path: "/athletes",
    Element: <AthletesPage />,
  },
  {
    path: "/athletes/:id",
    Element: <AthleteDetails />,
  },
  {
    path: "/athletes/add",
    Element: <AddPage />,
  },
  {
    path: "/athletes/:id/edit",
    Element: <AthleteEdit />,
  },
  {
    path: "/disciplines",
    Element: <DisciplinesPage />,
  },
];
