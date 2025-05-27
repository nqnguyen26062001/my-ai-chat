"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRepository_1 = __importDefault(require("../repository/authRepository"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userNameOrEmail, password, expires30day } = req.body;
                // const user = await new AuthRepository().login(userNameOrEmail, password,expires30day);
                const user = yield new authRepository_1.default().findUserByUsernameOrEmail(userNameOrEmail);
                if (!user) {
                    throw new Error('User not found');
                }
                // Compare password
                // const isMatch = await bcrypt.compare(password, user.password);
                // if (!isMatch) {
                //   throw new Error('Invalid password');
                // }
                req.session.userId = user.userId;
                res.status(201).json({
                    message: "Login successful!",
                    result: req.session
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userNameOrEmail, password, expires30day } = req.body;
                // const user = await new AuthRepository().login(userNameOrEmail, password,expires30day);
                const user = yield new authRepository_1.default().findUserByUsernameOrEmail(userNameOrEmail);
                if (!user) {
                    throw new Error('User not found');
                }
                // Compare password
                // const isMatch = await bcrypt.compare(password, user.password);
                // if (!isMatch) {
                //   throw new Error('Invalid password');
                // }
                req.session.userId = user.userId;
                res.status(201).json({
                    message: "Login successful!",
                    result: req.session
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
}
exports.default = new AuthController();
