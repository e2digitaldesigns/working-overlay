import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import { Controls } from "./components/Controls/Controls";
import { Overlay } from "./components/Overlay/Overlay";
import { Settings } from "./components/Settings/Settings";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/controls",
      element: <Controls />
    },
    {
      path: "/overlay",
      element: <Overlay />
    },
    {
      path: "/settings",
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
