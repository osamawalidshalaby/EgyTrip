// Authentication API service
const authAPI = {
  async login(email, password) {
    console.log("[Auth] Login attempt:", email);
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      success: true,
      token: "mock_jwt_token_" + Date.now(),
      user: { email }
    };
  },

  async signup(name, email, password) {
    console.log("[Auth] Signup attempt:", email);
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      success: true,
      token: "mock_jwt_token_" + Date.now(),
      user: { name, email }
    };
  },

  async forgotPassword(email) {
    console.log("[Auth] Forgot password:", email);
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { success: true, message: "Reset link sent" };
  }
};

export default authAPI;