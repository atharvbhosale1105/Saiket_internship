import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { getAllUsers, deleteUser } from '../services/adminService'
import { toast } from 'react-toastify'
import './Users.css'

function Users() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  // Add this at the beginning of Users component
useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return;
    }
    
    // Check if user is admin
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role !== 'ADMIN') {
            toast.error('Access denied. Admin only.');
            navigate('/home');
            return;
        }
    } catch {
        toast.error('Invalid token');
        navigate('/login');
        return;
    }
    
    loadUsers();
}, [navigate]);

  const loadUsers = async () => {
    try {
      const response = await getAllUsers()
      if (response.data.status === 'success') {
        setUsers(response.data.data)
      } else {
        toast.error('Failed to load users')
      }
    } catch (err) {
      toast.error('Unauthorized or server error')
      navigate('/login')
    }
  }

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await deleteUser(userId)
      if (response.data.status === 'success') {
        toast.success('User deleted')
        loadUsers()
      }
    } catch {
      toast.error('Delete failed')
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">All Users</h3>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Bio</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No users found</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.bio}</td>
                  <td>
                    {user.is_active
                      ? <span className="badge bg-success">Active</span>
                      : <span className="badge bg-danger">Inactive</span>}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => navigate(`/edit-user/${user.user_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Users
