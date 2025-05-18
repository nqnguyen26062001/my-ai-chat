import BaseRoutes from "./base/BaseRouter";
import ChatController from "../controller/ChatController";

class NoteRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", ChatController.postMessage);
    this.router.get("", ChatController.getMessages);
  }
}

export default new NoteRoutes().router