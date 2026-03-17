import axios from 'axios'
import config from './config'

export async function loginUser(email, password) {
    const URL = config.BASE_URL + "/auth/login"
    const BODY = { email, password }
    try {
        const response = await axios.post(URL, BODY)
        return {
            status: response.data.status || 'success',
            data: response.data.data || response.data
        }
    } catch (error) {
        return {
            status: 'error',
            data: error.response?.data?.error || 'Login failed'
        }
    }
}

export async function registerUser(formData) {
    const URL = config.BASE_URL + "/auth/register"
    try {
        const response = await axios.post(URL, formData)
        return {
            status: response.data.status || 'success',
            data: response.data.data || response.data.message
        }
    } catch (error) {
        return {
            status: 'error',
            data: error.response?.data?.error || 'Registration failed'
        }
    }
}