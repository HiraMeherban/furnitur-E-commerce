/* =========================================================
   AUTH MODULE (demo only — no real backend)
   Stores a logged-in flag in localStorage so "Add to Cart"
   can require the user to be signed in first, exactly like
   a real store. Login/Register pages call Auth.login().
   ========================================================= */

const AUTH_KEY = "furnitur_user";

const Auth = {
  get() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
  isLoggedIn() {
    return !!Auth.get();
  },
  login(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    document.dispatchEvent(new Event("authchange"));
  },
  logout() {
    localStorage.removeItem(AUTH_KEY);
    document.dispatchEvent(new Event("authchange"));
  },
  /* Sends the user to login, remembering where to come back to */
  requireLogin() {
    const redirect = encodeURIComponent(window.location.pathname.split("/").pop() + window.location.search);
    window.location.href = `login.html?redirect=${redirect}`;
  }
};
