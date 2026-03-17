import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import {getUserById,updateUser,addUserAddress,updateUserAddress,getUserAddress} from '../services/adminService';

import { toast } from 'react-toastify';
import './EditUser.css';

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    is_active: 1
  });
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: 'India'
  });
  
  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {

  try {

    const userResponse = await getUserById(userId);

    if (userResponse.data.status === 'success') {

      const userData = userResponse.data.data;

      setUser({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        bio: userData.bio || '',
        is_active: userData.is_active ?? 1
      });

      // ✅ Load Address separately
      const addressResponse = await getUserAddress(userId);

      if (addressResponse.data.status === 'success' && addressResponse.data.data) {

        setAddress(addressResponse.data.data);
        setHasAddress(true);

      }

    } else {
      toast.error('Failed to load user');
    }

  } catch {
    toast.error('Error loading user data');
  } finally {
    setLoading(false);
  }
};


  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Update user details
      const userResponse = await updateUser(userId, user);
      
      if (userResponse.data.status === 'success') {
        // Handle address
        if (address.street || address.city || address.state) {
          if (hasAddress) {
            await updateUserAddress(userId, address);
          } else {
            await addUserAddress(userId, address);
          }
        }
        
        toast.success('✅ User updated successfully!');
        setTimeout(() => navigate('/users'), 1000);
      } else {
        toast.error(userResponse.data.error || 'Failed to update user');
      }
    } catch (err) {
      toast.error('❌ Error updating user');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading user data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="edit-user-container">
        <div className="edit-user-card">
          {/* Header */}
          <div className="form-header">
            <div className="header-content">
              <div className="header-icon">
                <i className="bi bi-person-gear"></i>
              </div>
              <div className="header-text">
                <h1 className="form-title">Edit User Profile</h1>
                <p className="form-subtitle">
                  Update user information and address details
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="form-body">
            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="section-header">
                <h3 className="section-title">
                  <i className="bi bi-person-circle me-2"></i>
                  Personal Information
                </h3>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-person"></i>
                    Full Name
                    <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    name="name"
                    value={user.name}
                    onChange={handleUserChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-envelope"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={user.email}
                    disabled
                    style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}
                  />
                  <div className="form-hint">Email cannot be changed</div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-telephone"></i>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    name="phone"
                    value={user.phone}
                    onChange={handleUserChange}
                    placeholder="+91 1234567890"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-toggle-on"></i>
                    Account Status
                  </label>
                  <select
                    className="form-input"
                    name="is_active"
                    value={user.is_active}
                    onChange={handleUserChange}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <i className="bi bi-card-text"></i>
                    Bio / Description
                  </label>
                  <textarea
                    className="form-input"
                    name="bio"
                    value={user.bio}
                    onChange={handleUserChange}
                    placeholder="User bio or description"
                    rows="4"
                    maxLength="500"
                  />
                  <div className="form-hint">
                    <i className="bi bi-info-circle"></i>
                    Brief description about the user (max 500 characters)
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="section-header">
                <h3 className="section-title">
                  <i className="bi bi-geo-alt me-2"></i>
                  Address Information
                </h3>
                <div className="section-subtitle">
                  {hasAddress ? 'Update existing address' : 'Add new address'}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">
                    <i className="bi bi-house-door"></i>
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="Enter street address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-building"></i>
                    City
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-map"></i>
                    State
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-globe"></i>
                    Country
                  </label>
                  <select
                    className="form-input"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="submit" className="update-btn">
                  <i className="bi bi-check-circle"></i>
                  Update User
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  <i className="bi bi-x-circle"></i>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="view-btn"
                  onClick={() => navigate(`/users`)}
                >
                  <i className="bi bi-arrow-left"></i>
                  Back to Users
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;