import { useEffect, useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token")
      try {
        const response = await fetch('https://davihanblogapi.adaptable.app/auth/userData', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setLoading(false)
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUser();
  }, []);

  if (loading){
    return null
  }

  if(!loading){
  return (
      <div>
        <h1>User Profile</h1>
        <h2>Username: {user.userData.username}</h2>
        <h2>Email: {user.userData.email}</h2>
      </div>
  );
  }
}

export default UserProfile;