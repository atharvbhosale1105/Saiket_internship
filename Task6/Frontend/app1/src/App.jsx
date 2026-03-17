import { Routes, Route, Navigate } from 'react-router'
import { createContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Users from './pages/Users'
import EditUser from './pages/EditUser'
import UserHome from './pages/UserHome'
import AddUser from './pages/AddUser'

export const LoginContext = createContext()

function App() {

  const [loginStatus, setLoginStatus] = useState(
    sessionStorage.getItem('token') ? true : false
  )

  const [role, setRole] = useState(
    sessionStorage.getItem('role') || 'USER'
  )

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus, role, setRole }}>

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN HOME ================= */}
        <Route
          path="/home"
          element={
            loginStatus && role === 'ADMIN'
              ? <Home />
              : <Navigate to="/login" />
          }
        />

        {/* ================= USER HOME ================= */}
        <Route
          path="/user-home"
          element={
            loginStatus && role === 'USER'
              ? <UserHome />
              : <Navigate to="/login" />
          }
        />

        {/* ================= USER PROFILE ================= */}
        <Route
          path="/profile"
          element={
            loginStatus
              ? <Profile />
              : <Navigate to="/login" />
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/users"
          element={
            loginStatus && role === 'ADMIN'
              ? <Users />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/edit-user/:userId"
          element={
            loginStatus && role === 'ADMIN'
              ? <EditUser />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/add-user"
          element={
            loginStatus && role === 'ADMIN'
              ? <AddUser />
              : <Navigate to="/login" />
          }
        />

        {/* ================= DEFAULT ROUTE ================= */}
        <Route
          path="/"
          element={
            loginStatus
              ? role === 'ADMIN'
                ? <Navigate to="/home" />
                : <Navigate to="/user-home" />
              : <Navigate to="/login" />
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={
            <Navigate to={loginStatus
              ? role === 'ADMIN'
                ? "/home"
                : "/user-home"
              : "/login"}
            />
          }
        />

      </Routes>

      <ToastContainer/>

    </LoginContext.Provider>
  )
}

export default App
