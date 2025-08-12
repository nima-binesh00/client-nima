import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
// import SidebarDemo from "./New";
import "bootstrap-icons/font/bootstrap-icons.css";
import DefaultExample from "./components/Sidebar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SignupForm from "./components/Signup ";
import LoginForm from "./components/Login";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function App() {
  const token = useSelector((state) => state.Card.Token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={token ? <DefaultExample /> : <Navigate to={"/Login"} />}
          />
          <Route
            path="/Signup"
            element={token ? <Navigate to={"/"} /> : <SignupForm />}
          />
          <Route
            path="/Login"
            element={token ? <Navigate to={"/"} /> : <LoginForm />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
