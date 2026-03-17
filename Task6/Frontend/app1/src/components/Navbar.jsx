import { Link, useNavigate } from "react-router"
import { useContext } from "react"
import { LoginContext } from "../App"
import "./Navbar.css"

function Navbar() {

  const { loginStatus, setLoginStatus, role, setRole } = useContext(LoginContext)
  const navigate = useNavigate()

  // ⭐ Role Based Home Path
  const homePath = role === "ADMIN" ? "/home" : "/user-home"

  const logout = () => {
    setLoginStatus(false)
    setRole("USER")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("role")
    navigate("/login")
  }

  return (
    <>
      <nav className="simple-nav animate-nav">
        <div className="nav-content">

          {/* ⭐ LOGO ROLE BASED */}
          <Link to={homePath} className="nav-logo">
            User<span>Portal</span>
          </Link>

          {loginStatus && (
            <div className="nav-items">

              {/* ⭐ HOME ROLE BASED */}
              <Link to={homePath} className="nav-link">
                Home
              </Link>

              {/* ⭐ ADMIN ONLY - Users */}
              {role === "ADMIN" && (
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              )}

              {/* ⭐ USER ONLY - Profile (Hidden for ADMIN) */}
              {role === "USER" && (
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              )}

              <button onClick={logout} className="logout-btn">
                Logout
              </button>

            </div>
          )}

        </div>
      </nav>

      <div className="nav-space"></div>
    </>
  )
}

export default Navbar