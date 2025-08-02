import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  InstructionsPage,
  WelcomePage,
  QuizPage,
  ReportPage,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <WelcomePage />,
      },
      {
        path: "instructions",
        element: <InstructionsPage />,
      },
      {
        path: "quiz",
        element: <QuizPage />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
