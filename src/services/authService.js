/**
 * Auth Service — Mock API layer for authentication
 */

const MOCK_USER = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: null,
  role: 'student',
  createdAt: '2024-09-15T00:00:00Z',
};

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token';

const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  /**
   * Login with email and password
   */
  async login({ email, password }) {
    await delay();

    if (!email || !password) {
      throw { status: 400, message: 'Email and password are required' };
    }

    if (password.length < 6) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const user = { ...MOCK_USER, email };
    localStorage.setItem('auth_token', MOCK_TOKEN);
    localStorage.setItem('user', JSON.stringify(user));

    return { user, token: MOCK_TOKEN };
  },

  /**
   * Register a new account
   */
  async register({ name, email, password }) {
    await delay(1000);

    if (!name || !email || !password) {
      throw { status: 400, message: 'All fields are required' };
    }

    if (email === 'taken@example.com') {
      throw { status: 409, message: 'Email already registered' };
    }

    const user = { ...MOCK_USER, name, email, id: Date.now().toString() };
    localStorage.setItem('auth_token', MOCK_TOKEN);
    localStorage.setItem('user', JSON.stringify(user));

    return { user, token: MOCK_TOKEN };
  },

  /**
   * Request password reset
   */
  async forgotPassword({ email }) {
    await delay(1200);

    if (!email) {
      throw { status: 400, message: 'Email is required' };
    }

    return { message: 'Password reset link sent to your email' };
  },

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user from local storage
   */
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },
};

export default authService;
