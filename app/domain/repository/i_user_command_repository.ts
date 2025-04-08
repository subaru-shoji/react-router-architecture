import { type User } from '../model/user';

export type CreateUserSchema = Omit<User.User, 'id'>;

export interface IUserCommandRepository {
    create(user: CreateUserSchema): Promise<void>;
    update(user: User.User): Promise<void>;
}
