import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { toast } from 'react-toastify'
import { registerUser } from '../services/commonServices'
import './Register.css'

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    street: '',
    city: '',
    state: ''
  })

  /* ---------------- VALIDATION ---------------- */

  const validateField = (name, value) => {
    let error = ''

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required'
        break
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email'
        break
      case 'phone':
        if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits'
        break
      default:
        break
    }

    setErrors(prev => ({ ...prev, [name]: error }))
  }

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    validateField(name, value)
  }

  const handleFocus = (field) => setFocusedField(field)

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value)
    setFocusedField('')
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  if (Object.values(errors).some(err => err)) {
    toast.warn('Please fix errors before submitting')
    setLoading(false)
    return
  }

  try {
    const result = await registerUser(formData)

    if (result.status === 'success' || result.success === true) {
      toast.success('User registered successfully!')
      setTimeout(() => navigate('/login'), 1500)
    } else {
      toast.error(result.message || result.data || 'Registration failed')
    }

  } catch (err) {
    toast.error('Server error. Please try again.')
    console.error(err)
  }

  setLoading(false)
}


  const isFormValid =
    formData.name &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    /^\d{10}$/.test(formData.phone)

  const fields = [
    { name: 'name', label: 'Full Name', icon: 'bi-person', type: 'text' },
    { name: 'email', label: 'Email Address', icon: 'bi-envelope', type: 'email' },
    { name: 'phone', label: 'Phone Number', icon: 'bi-phone', type: 'tel' },
    { name: 'bio', label: 'Bio', icon: 'bi-card-text', type: 'textarea' },
    { name: 'street', label: 'Street Address', icon: 'bi-geo-alt', type: 'text' },
    { name: 'city', label: 'City', icon: 'bi-building', type: 'text' },
    { name: 'state', label: 'State', icon: 'bi-map', type: 'text' }
  ]

  return (
    <div className="register-page">
      <div className="bg-animation">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-circle circle-4"></div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="register-card animate-popup">

              {/* HEADER */}
              <div className="register-header text-center mb-5">
                <div className="logo-circle">
                  <i className="bi bi-person-plus-fill logo-icon"></i>
                </div>
                <h1 className="register-title">Create Your Account</h1>
                <p className="register-subtitle">
                  Join our community by filling in your details
                </p>
              </div>

              <div className="row">
                {/* FORM */}
                <div className="col-lg-7">
                  <form onSubmit={handleSubmit} className="register-form">
                    <div className="row g-4">
                      {fields.map((field, index) => (
                        <div
                          key={field.name}
                          className={`col-md-${field.name === 'bio' ? '12' : '6'}`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div
                            className={`input-container
                              ${focusedField === field.name ? 'focused' : ''}
                              ${formData[field.name] ? 'filled' : ''}
                              ${errors[field.name] ? 'error' : ''}
                            `}
                          >
                            <div className="input-icon-wrapper">
                              <i className={`bi ${field.icon}`}></i>
                            </div>

                            {field.type === 'textarea' ? (
                              <textarea
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                onFocus={() => handleFocus(field.name)}
                                onBlur={handleBlur}
                                placeholder=" "
                                rows="3"
                                disabled={loading}
                                className="form-control"
                              />
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                onFocus={() => handleFocus(field.name)}
                                onBlur={handleBlur}
                                placeholder=" "
                                disabled={loading}
                                className="form-control"
                              />
                            )}

                            <label className="floating-label">
                              {field.label}
                              {['name', 'email', 'phone'].includes(field.name) && (
                                <span className="required-star">*</span>
                              )}
                            </label>

                            <div className="focus-border"></div>
                            <div className="active-border"></div>
                          </div>

                          {errors[field.name] && (
                            <small className="error-text">{errors[field.name]}</small>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="d-grid mt-4">
                      <button
                        type="submit"
                        className={`btn submit-btn ${loading ? 'loading' : ''}`}
                        disabled={loading || !isFormValid}
                      >
                        {loading ? 'Creating Account...' : 'Register Now'}
                      </button>
                    </div>

                    <div className="text-center mt-4">
                      Already have an account?
                      <Link to="/login" className="login-link ms-2">
                        Sign In
                      </Link>
                    </div>
                  </form>
                </div>

                {/* INFO */}
                <div className="col-lg-5">
                  <div className="info-card">
                    <h3>Secure Registration</h3>
                    <p>Your data is encrypted & protected.</p>
                  </div>

                  {/* Progress Section */}
<div className="progress-section">
  <h6 className="progress-title">Registration Progress</h6>

  <div className="progress">
    <div
      className="progress-bar"
      style={{
        width: `${
          (Object.values(formData).filter(v => v.trim() !== '').length /
            Object.keys(formData).length) * 100
        }%`
      }}
    ></div>
  </div>

  <small className="progress-text">
    {Object.values(formData).filter(v => v.trim() !== '').length} of{" "}
    {Object.keys(formData).length} fields completed
  </small>
</div>

{/* Requirements */}
<div className="requirements">
  <h6 className="requirements-title">
    <i className="bi bi-info-circle me-2"></i>
    Requirements
  </h6>

  <ul className="requirements-list">
    <li>✔ Valid email address</li>
    <li>✔ 10-digit phone number</li>
    <li>✔ Name is required</li>
  </ul>
</div>





                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
