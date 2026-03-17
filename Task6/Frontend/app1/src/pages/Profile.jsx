import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { LoginContext } from '../App'
import { getMyProfile, changePassword } from '../services/userService'
import { toast } from 'react-toastify'
import './Profile.css'

function Profile() {
  const { loginStatus } = useContext(LoginContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    street: '',
    city: '',
    state: '',
    country: 'India'
  })

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const [showPasswordForm, setShowPasswordForm] = useState(true)

  useEffect(() => {
    if (!loginStatus) {
      navigate('/login')
      return
    }
    fetchProfile()
  }, [loginStatus])

  const fetchProfile = async () => {
    try {
      const response = await getMyProfile()
      
      if (response.status === 'success') {
        setProfile(response.data)
      } else {
        toast.error(response.data || 'Failed to load profile')
      }
    } catch (err) {
      console.error(err)
      toast.error('Session expired. Please login again.')
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      const response = await changePassword(passwordData)

      if (response.status === 'success') {
        toast.success('Password changed successfully')
        setPasswordData({ newPassword: '', confirmPassword: '' })
      } else {
        toast.error(response.error || 'Failed to change password')
      }
    } catch (err) {
      toast.error('Error changing password')
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner-circle"></div>
            <div className="spinner-text">Loading your profile...</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header-section">
          <div className="header-content">
            <div className="user-avatar">
              <div className="avatar-circle">
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
            <div className="header-text">
              <h1 className="profile-title">My Profile</h1>
              <p className="profile-subtitle">Manage your personal information and security settings</p>
            </div>
          </div>
        </div>

        <div className="profile-content">
          {/* Profile Information Card */}
          <div className="profile-info-card animate-fade-in">
            <div className="card-header-gradient">
              <div className="header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="card-title">Personal Information</h2>
            </div>
            
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Full Name</span>
                </div>
                <div className="info-value">{profile.name || 'Not provided'}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email Address</span>
                </div>
                <div className="info-value email-value">{profile.email || 'Not provided'}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Phone Number</span>
                </div>
                <div className="info-value">{profile.phone || 'Not provided'}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>Bio</span>
                </div>
                <div className="info-value bio-value">{profile.bio || 'No bio added yet'}</div>
              </div>

              <div className="info-item full-width">
                <div className="info-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Address</span>
                </div>
                <div className="address-details">
                  <div className="address-line">{profile.street || 'Street not provided'}</div>
                  <div className="address-line">
                    {profile.city && <span>{profile.city}, </span>}
                    {profile.state && <span>{profile.state}, </span>}
                    <span>{profile.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Change Card */}
          <div className="password-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="card-header-warning">
              <div className="header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="card-title">Security Settings</h2>
              <button 
                className="toggle-password-btn"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                {showPasswordForm ? 'Hide Password Form' : 'Change Password'} 
              </button>
            </div>
            
            {showPasswordForm && (
              <div className="password-form-container">
                <form onSubmit={handlePasswordChange} className="password-form">
                  <div className="form-group">
                    <label className="form-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-input password-input"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      required
                      placeholder="Enter new password (min 6 characters)"
                    />
                    <div className="password-hint">Minimum 6 characters required</div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-input password-input"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      required
                      placeholder="Re-enter new password"
                    />
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="update-password-btn"
                      disabled={!passwordData.newPassword || !passwordData.confirmPassword}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Password
                    </button>
                    
                    <button 
                      type="button" 
                      className="clear-btn"
                      onClick={() => setPasswordData({ newPassword: '', confirmPassword: '' })}
                    >
                      Clear Fields
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="security-tips">
              <div className="tips-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>Security Tips</h3>
              </div>
              <ul className="tips-list">
                <li>Use a combination of letters, numbers, and symbols</li>
                <li>Avoid using personal information in passwords</li>
                <li>Change your password regularly</li>
                <li>Never share your password with anyone</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile