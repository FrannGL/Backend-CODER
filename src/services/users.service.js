import { usersModel } from "../DAO/mongo/models/users.model.js";
import { cartService } from "./carts.service.js";
import { generateCartId } from "../utils/main.js";
class UserService {
  async readOne(email, password) {
    try {
      const user = await usersModel.read(email);
      if (user && isValidPassword(password, user.password)) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async read() {
    try {
      const users = await usersModel.read();
      return users;
    } catch (e) {
      console.log(e);
    }
  }
  async create(firstName, lastName, age, email, password, role) {
    try {
      const existingUser = await this.readOne(email);
      if (existingUser) {
        return "El usuario ya se encuentra registrado";
      }
      const cartId = generateCartId();
      await usersModel.create(firstName, lastName, age, email, password, role);
      await cartService.createCart(cartId);
      return userCreated;
    } catch (e) {
      console.log(e);
    }
  }

  async update({ _id, firstName, lastName, age, email, password, role }) {
    try {
      const userUpdated = await usersModel.update(
        _id,
        firstName,
        lastName,
        age,
        email,
        password,
        role
      );
      return userUpdated;
    } catch (e) {
      console.log(e);
    }
  }

  async delete(_id) {
    try {
      const userDeleted = await usersModel.delete(_id);
      return userDeleted;
    } catch (e) {
      console.log(e);
    }
  }
}
export const userService = new UserService();
