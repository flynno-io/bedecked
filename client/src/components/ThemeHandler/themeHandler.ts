import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  manaTheme: string;
}

export const applyUserTheme = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const manaTheme = decodedToken.manaTheme || 'default';
      document.body.className = `theme-${manaTheme}`;
      document.body.innerHTML = document.body.innerHTML.replace('default', manaTheme);
      console.log('Token decoded and theme applied successfully');
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  }
};