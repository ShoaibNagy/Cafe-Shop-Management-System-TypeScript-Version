import mongoose from 'mongoose';
import User, { IUser, UserRole } from '../../app/models/user'; // Adjust the import path as needed
import passwordValidator from '../../app/middleware/passwordValidator';

 const mockUserModel = jest.mock('../../app/middleware/passwordValidator', () => ({
    __esModule: true,
    default: jest.fn(),
}));

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb');
});

    describe('User Model', () => {
        describe('username validation', () => {
            it('should be valid with a proper username', async () => {
                const user = new User({
                    username: 'validuser',
                    password: 'password12',
                    email: 'validuser@example.com',
                    firstName: 'Valid',
                    lastName: 'User',
                    role: UserRole.USER,
                    isActive: true,
                });
                const savedUser = await user.save();
                expect(savedUser.username).toBe('validuser');
            });

            it('should be invalid with a short username', async () => {
                const user = new User({
                    username: 'usr',
                    password: 'password12',
                    email: 'shortuser@example.com',
                    firstName: 'Short',
                    lastName: 'User',
                    role: UserRole.USER,
                    isActive: true,
                });
                let err: any;
                try {
                    await user.save();
                } catch (error) {
                    err = error;
                }
                expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
                expect(err.errors.username).toBeDefined();
            });
        });
        describe('password validation', () => {
            it('should be valid with a proper password', async () => {
                const user = new User({
                    username: 'validuser',
                    password: 'Password12!',
                    email: 'validuser@example.com',
                    firstName: 'Valid',
                    lastName: 'User',
                    role: UserRole.USER,
                    isActive: true,
                });
                const savedUser = await user.save();
                expect(savedUser.password).toBe('Password12!');
            });

            it('should be invalid with a weak password', async () => {
                const user = new User({
                    username: 'validuser',
                    password: 'weak',
                    email: 'validuser@example.com',
                    firstName: 'Valid',
                    lastName: 'User',
                    role: UserRole.USER,
                    isActive: true,
                });
                let err: any;
                try {
                    await user.save();
                } catch (error) {
                    err = error;
                }
                expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
                expect(err.errors.password).toBeDefined();
            });
        });
    });
