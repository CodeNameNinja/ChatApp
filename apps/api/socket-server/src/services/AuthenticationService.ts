export class AuthenticationService {
    public static handleLogin(username: string, password: string): { success: boolean; message: string } {
        if (username === 'admin' && password === 'password') {
            return {success: true, message: 'Login successful'};
        } else {
            return {success: false, message: 'Invalid credentials'};
        }
    }
}
