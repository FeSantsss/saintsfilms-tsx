import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./saints-ui/foundation/tokens.css";
import "./saints-ui/foundation/base.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./routes/Home.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
const Service = lazy(() => import("./routes/Service.tsx"));
const About = lazy(() => import("./routes/About.tsx"));
import "react-loading-skeleton/dist/skeleton.css";
import Cases from "./routes/Cases.tsx";
import CasesList from "./components/components-cases/CasesList.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "sobre", element: <About /> },
      {
        path: "projetos",
        element: <Cases />,
        children: [{ index: true, element: <CasesList /> }],
      },
      { path: "serviços", element: <Service /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
);
