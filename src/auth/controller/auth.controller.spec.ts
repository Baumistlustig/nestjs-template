import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from '../services/auth.service.spec';
import { UserService } from '../../user/services/user.service';
import {
  mockUser,
  UserServiceMock,
} from '../../user/services/user.service.spec';
import { VerifyStrategy } from '../strategy/verify.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        },
        {
          provide: UserService,
          useValue: UserServiceMock,
        },
        {
          provide: VerifyStrategy,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    const authServiceSpy = jest
      .spyOn(AuthServiceMock, 'login')
      .mockResolvedValue('token');

    const user = jest
      .spyOn(UserServiceMock, 'getUserByName')
      .mockResolvedValue({ ...mockUser(), _id: 'id' });

    const result = await controller.login({
      user: mockUser(),
    });

    expect(result).toEqual({
      access_token: 'token',
      id: 'id',
      role: 'user',
    });

    expect(authServiceSpy).toBeCalledWith(mockUser());
    expect(user).toBeCalledWith(mockUser().username);
  });
});
