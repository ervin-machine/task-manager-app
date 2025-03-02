const API_URL =
import.meta.VITE_REACT_APP_API_URL || 
  (import.meta.VITE_NODE_ENV === "production"
    ? import.meta.VITE_REACT_APP_API_URL
    : "http://localhost:5000/api"); // Fallback for development

export default API_URL;
 