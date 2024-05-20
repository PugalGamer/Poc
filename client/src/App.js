import "./App.css";
import { registerLicense } from "@syncfusion/ej2-base";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Log/Register";
import Login from "./Log/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import Updatepage from "./pages/Updatepage";
import Data from "./pages/Data";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cWWFCeEx0WmFZfVpgdV9FZlZTRWYuP1ZhSXxXdkBjX39dc3VURmhZUEA="
);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/updatepage" element={<Updatepage />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
