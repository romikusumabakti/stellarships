import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Planets from "./pages/planets/Index.jsx";
import PlanetDetail from "./pages/planets/Detail.jsx";
import PlanetEdit from "./pages/planets/Edit.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "planets",
        children: [
          {
            index: true,
            element: <Planets />,
          },
          {
            path: ":id",
            element: <PlanetDetail />,
          },
          {
            path: ":id/edit",
            element: <PlanetEdit />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
