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
  getOperatorUser = () => {
    return this.get("auth/users");
  }
}
const AuthService = new authService();

export default AuthService;