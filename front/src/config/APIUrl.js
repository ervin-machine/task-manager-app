const API_URL =
import.meta.REACT_APP_API_URL || 
  (import.meta.NODE_ENV === "production"
    ? import.meta.REACT_APP_API_URL
    : "http://localhost:5000/api"); // Fallback for development

export default API_URL;
 