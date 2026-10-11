import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"; // ✅ FIX
import ProtectedRoute from "./components/ProtectedRoutes";
import LoginPage from './components/Login'
import SignupPage from './components/Signup'
import DashboardLayout from './pages/CandidateDashbaord/DashboardLayout'
import AppliedJobs from './pages/CandidateDashbaord/AppliedJobs'
import Profile from './pages/CandidateDashbaord/Profile'
import Resume from './pages/CandidateDashbaord/Resume'
import Home from './pages/CandidateDashbaord/Home'
import EmployerHome from './pages/HRdashboard/Home'
import PostJob from './pages/HRdashboard/PostJob'
import EmployerLayout from './pages/HRdashboard/EmployerLayout'
import CompanyProfile from './pages/HRdashboard/CompanyProfile'
import AdminLayout from './pages/AdminDashbaord/AdminLayout'
import AdminHome from './pages/AdminDashbaord/AdminHome'
import Users from './pages/AdminDashbaord/Users'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Jobs from './pages/AdminDashbaord/Jobs'
import Reports from './pages/AdminDashbaord/Reports'
import HomePage from './pages/Home/Home'
import JobPage from './pages/Jobs';
import ForCandidates from './pages/ForCandidates';
import ForEmployers from './pages/ForEmployer';

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobPage />} />
          <Route path="/candidates" element={<ForCandidates />} />
          <Route path="/employers" element={<ForEmployers />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin Routes */}

          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="users" element={<Users />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Candidate  Routes */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={["jobseeker"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="resume" element={<Resume />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
          </Route>

          {/* Employer Routes */}
          <Route
            path="/dashboard/employer"
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <EmployerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployerHome />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="post-job" element={<PostJob />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
