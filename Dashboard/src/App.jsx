import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import Homepage from "./components/Homepage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ManageTimeline from "./components/subcomponents/ManageTimeline";
import ManageSkill from "./components/subcomponents/ManageSkill";
import AddProject from "./components/subcomponents/AddProject";
import AddApplication from "./components/subcomponents/AddApplication";
import AddSkill from "./components/subcomponents/AddSkill";
import Account from "./components/subcomponents/Account";
import AddTimeline from "./components/subcomponents/AddTimeline";
import Messages from "./components/subcomponents/Messages";
import Dashboard from "./components/subcomponents/Dashboard";
import Main from "./components/main";
import EditSkill from "./components/subcomponents/EditSkill";
import ManageProjects from "./components/subcomponents/ManageProjects";
import ViewProject from "./components/subcomponents/ViewProject";
import UpdateProject from "./components/subcomponents/UpdateProject";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route element={<Dashboard />} path="/" />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/addApplication" element={<AddApplication />} />
          <Route path="/addSkill" element={<AddSkill />} />
          <Route path="/editSkill/:id" element={<EditSkill />} />
          <Route path="/account" element={<Account />} />
          <Route path="/addTimeline" element={<AddTimeline />} />
          <Route path="/message" element={<Messages />} />
          <Route path="/manage/timeline" element={<ManageTimeline />} />
          <Route path="/manage/skill" element={<ManageSkill />} />
          <Route path="/manage/projects" element={<ManageProjects />} />
          <Route path="/project/view/:id" element={<ViewProject />} />
          <Route path="/project/update/:id" element={<UpdateProject/>}/> 
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
