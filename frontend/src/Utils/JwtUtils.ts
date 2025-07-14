import { jwtDecode } from "jwt-decode";


class JwtUtils {

    isTokenExpired(token: string): boolean {
        try {
            const decoded: any = jwtDecode(token);
            const currentTime = Date.now() / 1000
            return decoded.exp < currentTime;
        }
        catch (err) {
            return true
        }
    }
}

export const jwtUtils = new JwtUtils();
