interface User {
  manaTheme: string;
}

export const getUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user data', error);
    return null;
  }
};

export const applyUserTheme = async () => {
  const user = await getUser();
  if (user) {
    const manaTheme = user.manaTheme || 'default';
    document.body.className = `theme-${manaTheme}`;
    console.log('User theme applied successfully');
  }
};