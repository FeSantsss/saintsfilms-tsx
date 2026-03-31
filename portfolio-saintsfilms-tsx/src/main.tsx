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
const Home = lazy(() => import("./routes/Home.tsx"));
import ErrorPage from "./routes/ErrorPage.tsx";
const About = lazy(() => import("./routes/About.tsx"));

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "sobre", element: <About /> },
      { path: "projetos", element: <Navigate to={"/"} /> },
      { path: "serviços", element: <Navigate to={"/"} /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
);
