import axios from 'axios'
import config from './config'

// ================= USER SERVICES =================

// GET PROFILE
export async function getMyProfile() {
  const token = sessionStorage.getItem('token')
  if (!token) throw new Error('Token missing')

  const response = await axios.get(
    `${config.BASE_URL}/user/my-profile`,   // ✅ FIXED
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}

// CHANGE PASSWORD
export async function changePassword(passwordData) {
  const token = sessionStorage.getItem('token')
  if (!token) throw new Error('Token missing')

  const response = await axios.put(
    `${config.BASE_URL}/user/change-password`,  // ✅ FIXED
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}

