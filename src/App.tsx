import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import { Controls } from "./components/Controls/Controls";
import { Overlay } from "./components/Overlay/Overlay";
import { Settings } from "./components/Settings/Settings";
import { AppRoutes, BroadcastChannels, StorageKeys } from "./types";

const defaultGlobalInformation = {
  showTimer: false,
  timerStatus: false
};

const App: React.FC = () => {
  const [globalInformation, setGlobalInformation] = React.useState<any>(
    defaultGlobalInformation
  );

  React.useEffect(() => {
    const globalInformation = window.localStorage.getItem(
      StorageKeys.GlobalInformation
    );

    if (globalInformation) setGlobalInformation(JSON.parse(globalInformation));
  }, []);

  const channelGlobal = new BroadcastChannel(BroadcastChannels.Global);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;

    setGlobalInformation((prev: any) => ({
      ...prev,
      [name]: checked
    }));

    const information = JSON.stringify({
      ...globalInformation,
      showTimer: checked
    });

    window.localStorage.setItem(StorageKeys.GlobalInformation, information);
    channelGlobal.postMessage({ action: name, value: checked });
  };

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
      element: (
        <Settings
          globalInformation={globalInformation}
          handleCheckBoxChange={handleCheckBoxChange}
        />
      )
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
