import axios from 'axios'

const baseUrl = "http://20.84.147.6:8080/api/users"

  const axiosInstance = axios.create({
    baseURL:baseUrl,
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer <your-token>'
      }
})



export default axiosInstance