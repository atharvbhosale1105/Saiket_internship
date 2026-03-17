import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { LoginContext } from "../App";
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { loginStatus, role } = useContext(LoginContext)
  useEffect(() => {
    if (!loginStatus) {
    navigate('/login');
  }
  
  if (role !== 'ADMIN') {
    navigate('/user-home');
  }
}, [loginStatus, role]);


  if (!loginStatus) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* ================= HERO SECTION ================= */}
        <section className="hero-section">
          <div className="container">
            <div className="row align-items-center">
              {/* Left Column - Content */}
              <div className="col-lg-6 order-lg-1 order-2">
                <div className="hero-content animate-fade-in-left">
                  <div className="badge-container">
                    <span className="hero-badge">
                      <i className="bi bi-shield-check me-2"></i>
                      Secure Platform
                    </span>
                  </div>
                  <h1 className="hero-title">
                    Modern User
                    <span className="gradient-text"> Management</span>
                    System
                  </h1>
                  <p className="hero-subtitle">
                    Streamline user registration, profile management, access control, 
                    and analytics with our powerful, secure platform.
                  </p>
                  
                  <div className="hero-stats">
                    <div className="stat-item">
                      <h4>100%</h4>
                      <p>Secure Data</p>
                    </div>
                    <div className="stat-item">
                      <h4>24/7</h4>
                      <p>Uptime</p>
                    </div>
                    <div className="stat-item">
                      <h4>1M+</h4>
                      <p>Users Managed</p>
                    </div>
                  </div>

                  <div className="hero-buttons">
                    <Link to="/users" className="btn btn-primary btn-lg me-3">
                      <i className="bi bi-people me-2"></i>
                      View Users
                    </Link>
                    <Link to="/add-user" className="btn btn-outline-primary btn-lg">
                      <i className="bi bi-person-plus me-2"></i>
                      Add User
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column - Illustration */}
              <div className="col-lg-6 order-lg-2 order-1">
                <div className="hero-illustration animate-fade-in-right">
                  
                  <div className="dashboard-preview">
                    <div className="dashboard-header">
                      <div className="dashboard-title">Dashboard Preview</div>
                      <div className="dashboard-stats">
                        <span className="stat-online">
                          <i className="bi bi-circle-fill"></i> Online
                        </span>
                      </div>
                    </div>
                    <div className="dashboard-content">
                      <div className="metric">
                        <div className="metric-label">Active Users</div>
                        <div className="metric-value">1,234</div>
                      </div>
                      <div className="chart-placeholder"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      

        {/* ================= CTA SECTION ================= */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h2 className="cta-title">Ready to Transform Your User Management?</h2>
                  <p className="cta-subtitle">
                    Join thousands of organizations using our platform for efficient user management
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <Link to="/register" className="btn btn-light btn-lg">
                    Get Started Free
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="footer-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div className="footer-brand">
                  <div className="footer-logo">
                    <i className="bi bi-person-workspace"></i>
                  </div>
                  <h4 className="footer-title">UserPortal</h4>
                  <p className="footer-description">
                    Advanced user management solution for modern organizations
                  </p>
                </div>
              </div>
              
              <div className="col-lg-2 col-md-4 mb-4">
                <h5 className="footer-heading">Product</h5>
                <ul className="footer-links">
                  <li><Link to="/features">Features</Link></li>
                  <li><Link to="/pricing">Pricing</Link></li>
                  <li><Link to="/demo">Demo</Link></li>
                </ul>
              </div>
              
              <div className="col-lg-2 col-md-4 mb-4">
                <h5 className="footer-heading">Company</h5>
                <ul className="footer-links">
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              
              <div className="col-lg-4 mb-4">
                <h5 className="footer-heading">Stay Updated</h5>
                <p className="footer-newsletter">Subscribe to our newsletter</p>
                <div className="input-group mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email" 
                  />
                  <button className="btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="row">
                <div className="col-md-6">
                  <p className="copyright">
                    © {new Date().getFullYear()} UserPortal. All rights reserved.
                  </p>
                </div>
                <div className="col-md-6 text-md-end">
                  <div className="social-links">
                    <a href="#"><i className="bi bi-twitter"></i></a>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                    <a href="#"><i className="bi bi-github"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;