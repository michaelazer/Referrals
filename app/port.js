// Use environment variable if available, fallback to localhost for development
const port = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default port;