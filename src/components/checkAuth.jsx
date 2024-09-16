import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

async function CheckAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      console.log(token)
      if (!token) return false;

      try {
        const response = await fetch("https://davihanblogapi.adaptable.app/auth/refresh", {
          mode: 'cors',
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": 'application/x-www-form-urlencoded'
          }
        });
        if (response.ok) {
          return true
        }
        return false
      } catch (e) {
        console.error("Error checking auth: ", e);
        return false
      }
    };

    verifyToken();
  }, [navigate]);
}

export default CheckAuth;