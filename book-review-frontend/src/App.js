import { Route, Routes } from "react-router-dom";
import UpdateDelete from "./pages/Profile/UpdateDelete";
import Home from "./pages/Home/index";
import Profile from "./pages/Profile";
import Header from "./pages/Header/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:userID" element={<Profile/>} />
        <Route path="/profile/:reviewID" element={<UpdateDelete/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
