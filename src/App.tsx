import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import { Controls } from "./components/Controls/Controls";
import { Overlay } from "./components/Overlay/Overlay";
import { Settings } from "./components/Settings/Settings";
import { AppRoutes } from "./types";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: AppRoutes.Controls,
      element: <Controls />
    },
    {
      path: AppRoutes.Overlay,
      element: <Overlay />
    },
    {
      path: AppRoutes.Settings,
      element: <Settings />
    }
  ]);

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
