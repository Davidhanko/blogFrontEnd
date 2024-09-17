import { useEffect } from 'react';

async function CheckAuth() {

      const token = localStorage.getItem("token");

      if (!token) return false;

      try {
        const response = await fetch("https://davihanblogapi.adaptable.app/auth/refresh", {
          mode: 'cors',
          method: "POST",
          headers: {
              'Authorization': `Bearer ${token}`,
          }
        });
        return response.ok;
      } catch (e) {
        console.error("Error checking auth: ", e);
        return false
      }
}

export default CheckAuth;