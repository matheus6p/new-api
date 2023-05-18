import { User, UserModel } from "../model/UserModel";

export class UserService {
  async register(user: UserModel) {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  }

  async userAlreadyExist(user: UserModel): Promise<Boolean> {
    const existingUser = await User.findOne({ email: user.email });
    return !!existingUser
  }
}
