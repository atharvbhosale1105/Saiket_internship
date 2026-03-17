import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { LoginContext } from '../App';
import { createUserWithAddress } from '../services/adminService';
import { toast } from 'react-toastify';
import './AddUser.css';

function AddUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        bio: ''
    });

    const [addressData, setAddressData] = useState({
        street: '',
        city: '',
        state: '',
        country: 'India'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [includeAddress, setIncludeAddress] = useState(false);

    const { role } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== 'ADMIN') {
            navigate('/home');
        }
    }, [role, navigate]);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            toast.warning('Password must be at least 6 characters long');
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                ...formData,
                address: includeAddress ? addressData : null
            };

            const response = await createUserWithAddress(payload);

            if (response.data.status === 'success') {
                toast.success('✅ User created successfully!');

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    bio: ''
                });

                setAddressData({
                    street: '',
                    city: '',
                    state: '',
                    country: 'India'
                });

                setIncludeAddress(false);

                // Navigate to users page after delay
                setTimeout(() => navigate('/users'), 1200);

            } else {
                // Handle API error response
                toast.error(response.data.error || 'Failed to add user');
            }

        } catch (error) {
            console.error("API Error:", error);
            
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log("Server Response:", error.response.data);
                console.log("Status Code:", error.response.status);
                
                if (error.response.status === 409) {
                    toast.error('❌ Email already exists');
                } else if (error.response.status === 400) {
                    toast.error('❌ Invalid data provided');
                } else if (error.response.status === 401) {
                    toast.error('❌ Unauthorized. Please login again.');
                    navigate('/login');
                } else if (error.response.status === 403) {
                    toast.error('❌ Access denied. Admin only.');
                } else {
                    toast.error(`❌ Server error: ${error.response.status}`);
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.log("No response received:", error.request);
                toast.error('❌ Network error. Please check your connection.');
            } else {
                // Something happened in setting up the request
                console.log("Request setup error:", error.message);
                toast.error('❌ Failed to add user. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => navigate('/users');

    const isFormValid = () => {
        return formData.name && formData.email && formData.password && formData.password.length >= 6;
    };

    return (
        <>
            <Navbar />
            <div className="add-user-container">
                <div className="add-user-card">
                    {/* Form Header */}
                    <div className="form-header">
                        <div className="header-content">
                            <div className="header-icon">
                                <i className="bi bi-person-plus"></i>
                            </div>
                            <div className="header-text">
                                <h1 className="form-title">Add New User</h1>
                                <p className="form-subtitle">
                                    Create a new user account with optional address details
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
                                {/* Name Field */}
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
                                        value={formData.name}
                                        onChange={handleUserChange}
                                        placeholder="Enter user's full name"
                                        required
                                        maxLength="100"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="form-group">
                                    <label className="form-label">
                                        <i className="bi bi-envelope"></i>
                                        Email Address
                                        <span className="required-star">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        className="form-input"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleUserChange}
                                        placeholder="user@example.com"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="form-group">
                                    <label className="form-label">
                                        <i className="bi bi-key"></i>
                                        Password
                                        <span className="required-star">*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        className="form-input"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleUserChange}
                                        placeholder="Enter secure password"
                                        required
                                        minLength="6"
                                        disabled={isSubmitting}
                                    />
                                    <div className="password-hint">
                                        <i className="bi bi-info-circle"></i>
                                        Must be at least 6 characters long
                                    </div>
                                </div>

                                {/* Phone Field */}
                                <div className="form-group">
                                    <label className="form-label">
                                        <i className="bi bi-telephone"></i>
                                        Phone Number
                                    </label>
                                    <input 
                                        type="tel" 
                                        className="form-input"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleUserChange}
                                        placeholder="+91 1234567890"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Bio Field - Full Width */}
                                <div className="form-group full-width">
                                    <label className="form-label">
                                        <i className="bi bi-card-text"></i>
                                        Bio / Description
                                    </label>
                                    <textarea 
                                        className="form-input"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleUserChange}
                                        placeholder="Tell us about the user (optional)"
                                        rows="3"
                                        maxLength="500"
                                        disabled={isSubmitting}
                                    />
                                    <div className="password-hint">
                                        <i className="bi bi-info-circle"></i>
                                        Brief description about the user (max 500 characters)
                                    </div>
                                </div>
                            </div>

                            {/* Address Information Section */}
                            <div className="section-header">
                                <div className="address-toggle">
                                    <h3 className="section-title">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        Address Information
                                    </h3>
                                    <label className="toggle-switch">
                                        <input 
                                            type="checkbox" 
                                            checked={includeAddress}
                                            onChange={(e) => setIncludeAddress(e.target.checked)}
                                            disabled={isSubmitting}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                                <p className="section-subtitle">
                                    {includeAddress ? 'Add address details (optional)' : 'Address section disabled'}
                                </p>
                            </div>

                            {includeAddress && (
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
                                            value={addressData.street}
                                            onChange={handleAddressChange}
                                            placeholder="Enter street address"
                                            disabled={isSubmitting}
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
                                            value={addressData.city}
                                            onChange={handleAddressChange}
                                            placeholder="City"
                                            disabled={isSubmitting}
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
                                            value={addressData.state}
                                            onChange={handleAddressChange}
                                            placeholder="State"
                                            disabled={isSubmitting}
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
                                            value={addressData.country}
                                            onChange={handleAddressChange}
                                            disabled={isSubmitting}
                                        >
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Australia">Australia</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="form-actions">
                                <button 
                                    type="submit" 
                                    className="submit-btn"
                                    disabled={isSubmitting || !isFormValid()}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            Creating User...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle"></i>
                                            Create User
                                        </>
                                    )}
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                >
                                    <i className="bi bi-x-circle"></i>
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="reset-btn"
                                    onClick={() => {
                                        setFormData({
                                            name: '',
                                            email: '',
                                            password: '',
                                            phone: '',
                                            bio: ''
                                        });
                                        setAddressData({
                                            street: '',
                                            city: '',
                                            state: '',
                                            country: 'India'
                                        });
                                        setIncludeAddress(false);
                                    }}
                                    disabled={isSubmitting}
                                >
                                    <i className="bi bi-arrow-clockwise"></i>
                                    Reset Form
                                </button>
                            </div>
                        </form>

                        {/* Form Footer */}
                        <div className="form-footer">
                            <div className="form-info">
                                <i className="bi bi-info-circle"></i>
                                <p>
                                    All fields marked with <span className="required-star">*</span> are required.
                                    Address information is optional and can be added later.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    );
} 

export default AddUser;