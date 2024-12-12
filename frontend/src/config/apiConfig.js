let API_BASE_URL;

if (process.env.NODE_ENV === 'development') {
  API_BASE_URL = 'http://localhost:5000/api'; // 本地后端地址
} else if (process.env.NODE_ENV === 'production') {
  API_BASE_URL = 'https://recipesharing.com/api'; // 生产后端地址
}

export default API_BASE_URL;
