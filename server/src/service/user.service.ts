import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { CreateUserInput, LoginInput, UserModel } from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';
class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const { email, password } = input;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new UserInputError('Invalid credentials');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UserInputError('Invalid password');
    }

    const token = signJwt(user.toJSON());

    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return token;
  }
}

export default UserService;
