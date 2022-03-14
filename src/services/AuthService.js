import { BaseService } from "./BaseService";

class authService extends BaseService {
  constructor() {
    super();
  }
  loginUser = (userForm) => {
    return this.post("auth/login", userForm);
  };
  checkAuth = () => {
    return this.get("auth");          
  }
}
const AuthService = new authService();

export default AuthService;