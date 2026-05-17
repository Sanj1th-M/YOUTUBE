/**
 * Frontend Token Service
 * Secure handling of authentication tokens.
 * In a production Capacitor app, we should use Secure Storage instead of localStorage.
 */
class TokenService {
  private ACCESS_TOKEN_KEY = 'yt_access_token';
  private REFRESH_TOKEN_KEY = 'yt_refresh_token';

  public setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  public clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Future: Implement secure storage for Capacitor
   * if (Capacitor.isNativePlatform) { ... }
   */
}

export const tokenService = new TokenService();
