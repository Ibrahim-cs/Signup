interface AuthProvider {
  isAuthenticated: boolean;
  email: null | string;
  signin(email: string, password: string): Promise<void>;
  signup(email: string, password: string): Promise<void>;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const authProvider: AuthProvider = {
  isAuthenticated: false,
  email: null,
  async signin(email: string, password: string) {
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password }),
    });
    if (res.ok) {
      authProvider.isAuthenticated = true;
      authProvider.email = email;
    }
  },
  async signup(email: string, password: string) {
    const res = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      authProvider.isAuthenticated = true;
      authProvider.email = email;
    }
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 5000)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.email = "";
  },
};
