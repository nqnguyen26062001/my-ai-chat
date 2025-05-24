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
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/userService.ts
const User_1 = require("../model/User"); // Import the User model class itself
const sequelize_1 = require("sequelize"); // Import Op for Sequelize operators
class authRepository {
    findUserByUsernameOrEmail(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.User.findOne({
                    where: {
                        [sequelize_1.Op.or]: [
                            { username: identifier },
                            { email: identifier.toLowerCase() } // Always store/compare emails in lowercase
                        ]
                    }
                });
            }
            catch (error) {
                console.error(`Error finding user by identifier '${identifier}':`, error.message);
                throw new Error(`Failed to find user by identifier: ${error.message}`);
            }
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.User.findOne({
                    where: { username: username }
                });
            }
            catch (error) {
                console.error(`Error finding user by username '${username}':`, error.message);
                throw new Error(`Failed to find user by username: ${error.message}`);
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return User_1.User.findOne({
                    where: { email: email.toLowerCase() }
                });
            }
            catch (error) {
                console.error(`Error finding user by email '${email}':`, error.message);
                throw new Error(`Failed to find user by email: ${error.message}`);
            }
        });
    }
}
exports.default = authRepository;
