import { UserMongoose } from "../DAO/models/mongoose/users.mongoose.js";
import { cartService } from "./carts.service.js";
import { generateCartId } from "../utils/main.js";
class UserService {
  async findUser(email, password) {
    const user = await UserMongoose.findOne(
      { email: email },
      {
        _id: true,
        firstName: true,
        lastName: true,
        age: true,
        email: true,
        password: true,
        role: true,
      }
    );
    if (user && isValidPassword(password, user.password)) {
      return user;
    } else {
      return false;
    }
  }

  async findUserByEmail(email) {
    const user = await UserMongoose.findOne(
      { email: email },
      {
        _id: true,
        firstName: true,
        lastName: true,
        age: true,
        email: true,
        password: true,
        role: true,
      }
    );
    return user || false;
  }

  async getAll() {
    const users = await UserMongoose.find(
      {},
      {
        _id: true,
        firstName: true,
        lastName: true,
        age: true,
        email: true,
        password: true,
        role: true,
      }
    );
    return users;
  }
  async create(firstName, lastName, age, email, password, role) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      return "El usuario ya se encuentra registrado";
    }

    const cartId = generateCartId();

    const userCreated = await UserMongoose.create({
      firstName,
      lastName,
      age,
      email,
      password,
      role,
      cartID: cartId,
    });

    await cartService.createOne(cartId);

    return userCreated;
  }
  async updateOne({ _id, firstName, lastName, age, email, password, role }) {
    const userUptaded = await UserMongoose.updateOne(
      {
        _id: _id,
      },
      {
        firstName,
        lastName,
        age,
        email,
        password,
        role,
      }
    );
    return userUptaded;
  }

  async deleteOne(_id) {
    const result = await UserMongoose.deleteOne({ _id: _id });
    return result;
  }
}
export const userService = new UserService();
