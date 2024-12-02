import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    }
      catch (err) {
        return false;
    }
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken);
  }

  logout() {
    localStorage.removeItem('token');
    window.location.assign('/');
  }
}

export default new AuthService();
