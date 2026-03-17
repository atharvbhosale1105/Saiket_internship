import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import Navbar from "../components/Navbar";
import { LoginContext } from "../App";
import "./UserHome.css";

function UserHome() {
  const { loginStatus, role } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate('/login');
    }
    if (role !== 'USER') {
      navigate('/home');
    }
  }, [loginStatus, role]);

  return (
    <>
      <Navbar />
      
      <div className="user-home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="welcome-container">
            <div className="avatar-circle">
              <svg className="user-icon" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="welcome-title">
              Welcome Back, <span className="gradient-text">Learner</span>! 👋
            </h1>
            <p className="welcome-subtitle">
              Continue your educational journey with personalized resources, 
              track your progress, and achieve your learning goals.
            </p>
            <Link to="/profile" className="profile-btn">
              <svg className="btn-icon" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Manage Your Profile
            </Link>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-container">
                <svg className="stat-icon" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-value">5</span>
                <p className="stat-label">Active Courses</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-container">
                <svg className="stat-icon" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-value">12 days</span>
                <p className="stat-label">Learning Streak</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-container">
                <svg className="stat-icon" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-value">3</span>
                <p className="stat-label">Certificates</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-container">
                <svg className="stat-icon" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-value">48</span>
                <p className="stat-label">Hours Learned</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">
            Your Learning <span className="gradient-text">Dashboard</span>
          </h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon book-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="feature-title">Course Library</h3>
              <p className="feature-description">Access 1000+ curated courses and learning materials</p>
              <div className="feature-link">
                Explore now
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon calendar-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Schedule Manager</h3>
              <p className="feature-description">Plan and track your learning journey</p>
              <div className="feature-link">
                Explore now
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon award-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Achievements</h3>
              <p className="feature-description">Earn badges and certificates</p>
              <div className="feature-link">
                Explore now
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon community-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0a4 4 0 110 5.292" />
                </svg>
              </div>
              <h3 className="feature-title">Community</h3>
              <p className="feature-description">Connect with peers and mentors</p>
              <div className="feature-link">
                Explore now
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="actions-section">
          <div className="actions-content">
            <div className="actions-text">
              <h2 className="actions-title">Ready to Learn Today?</h2>
              <p className="actions-subtitle">Pick up where you left off or discover something new</p>
            </div>
            <div className="actions-buttons">
              <button className="primary-action-btn">Continue Learning</button>
              <button className="secondary-action-btn">Explore Courses</button>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="activity-section">
          <div className="activity-header">
            <h2 className="section-title">Recent Learning Activity</h2>
            <Link to="/activity" className="view-all-link">
              View All
              <svg className="link-arrow" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="activity-details">
                <h4 className="activity-course">Advanced JavaScript</h4>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <p className="progress-text">75% complete</p>
              </div>
              <span className="activity-time">2 hours ago</span>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="activity-details">
                <h4 className="activity-course">Data Structures</h4>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '45%' }}></div>
                </div>
                <p className="progress-text">45% complete</p>
              </div>
              <span className="activity-time">Yesterday</span>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="activity-details">
                <h4 className="activity-course">Web Development</h4>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '90%' }}></div>
                </div>
                <p className="progress-text">90% complete</p>
              </div>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default UserHome;