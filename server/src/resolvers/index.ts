import UserResolver from './user.resolver';
import ProfileResolver from './profile.resolver';

export const resolvers = [UserResolver, ProfileResolver] as const;
