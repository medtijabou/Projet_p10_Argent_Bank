export const updateUserName = async (token, firstName, lastName) => {
    const response = await fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName })
    });
  
    if (!response.ok) {
      throw new Error('Failed to update user name');
    }
  
    const data = await response.json();
    return data; // Retourne les données mises à jour
  };
  