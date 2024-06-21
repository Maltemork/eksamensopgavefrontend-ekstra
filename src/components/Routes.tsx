import HomePage from "./pages/HomePage/HomePage";
import AthletesPage from "./pages/AthletesPage/AthletesPage";
import AthleteDetails from "./pages/AthletesPage/DetailPage/AthleteDetails";
import AddPage from "./pages/AthletesPage/AddPage/AddPage";
import AthleteEdit from "./pages/AthletesPage/DetailPage/EditPage/AthleteEdit";
import DisciplinesPage from "./pages/DisciplinesPage/DisciplinesPage";
import ResultAdd from "./pages/AthletesPage/ResultAdd/ResultAdd";
import ResultEdit from "./pages/AthletesPage/ResultEdit/ResultEdit";
import DisciplineResults from "./pages/DisciplinesPage/DisciplineResults/DisciplineResults";
import DisciplineAddResult from "./pages/DisciplinesPage/DisciplineResults/DisciplineAddResult/DisciplineAddResult";
import DisciplineEditResult from "./pages/DisciplinesPage/DisciplineResults/DisciplineEditResult/DisciplineEditResult";

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
    path: "/athletes/:id/results/add",
    Element: <ResultAdd />,
  },
  {
    path: "/athletes/:athleteId/results/:resultId",
    Element: <ResultEdit />,
  },
  {
    path: "/disciplines",
    Element: <DisciplinesPage />,
  },
  {
    path: "/disciplines/:id",
    Element: <DisciplineResults />,
  },
  {
    path: "/disciplines/:disciplineId/results/:resultId",
    Element: <DisciplineEditResult />,
  },
  {
    path: "*",
    Element: <div>404 - page not found</div>,
  },
  {
    path: "/disciplines/:disciplineId/results/add",
    Element: <DisciplineAddResult />,
  },
];
