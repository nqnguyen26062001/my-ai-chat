import BaseRoutes from "./base/BaseRouter";
import ChatController from "../controller/ChatController";
import AuthController from "../controller/AuthController";

class AuthRouters extends BaseRoutes {
  public routes(): void {
    this.router.post("/login", AuthController.login);
  }
}

export default new AuthRouters().router