import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import UserResponse from "../components/UserResponse";
import UserList from "../components/UserList";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path:"/user/:id",
        element: <UserResponse />,
    },
    {
      path:"/user",
      element: <UserList />
    }
  ]);

  export default router;