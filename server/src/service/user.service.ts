import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { ProfileModel } from '../schema/profile.schema';
import { CreateUserInput, LoginInput, UserModel } from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';
class UserService {
  async createUser(input: CreateUserInput, context: Context) {
    const { email, password } = input;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) throw new UserInputError('Account with email exists');

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    const userDoc = await newUser.save();

    const newProfile = new ProfileModel({
      user: userDoc._id,
      riotID: '',
      tagline: '',
      clips: [],
    });

    await newProfile.save();

    const token = signJwt(userDoc.toJSON());

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

  async login(input: LoginInput, context: Context) {
    const { email, password } = input;

    const user = await UserModel.findOne({ email });

    if (!user) throw new UserInputError('Invalid credentials');

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new UserInputError('Invalid password');

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
