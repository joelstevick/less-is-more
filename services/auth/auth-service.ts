import { User } from "@supabase/supabase-js";

class AuthService {
  private constructor() {}

  private static instance: AuthService | null = null;
  public user: User | null = null

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }

    return this.instance;
  }
}

export default AuthService.getInstance();

