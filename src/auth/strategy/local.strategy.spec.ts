import { LocalStrategy } from './local.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from '../services/auth.service.spec';
import { userStub } from '../../../test/stubs/user.stub';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  it('should validate a user', async () => {
    const authSpy = jest
      .spyOn(AuthServiceMock, 'validateUser')
      .mockResolvedValue(userStub());

    expect(await localStrategy.validate('test', 'test')).toEqual(userStub());
    expect(authSpy).toBeCalledWith('test', 'test');
  });
});
