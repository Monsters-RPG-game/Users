import GetController from './get';
import GetAllController from './getAll';
import LoginController from './login';
import RegisterController from './register';
import RemoveController from './remove';
import * as enums from '../../enums';
import { ELoginOutput } from '../../enums';
import * as errors from '../../errors';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import LoginAttemptController from '../loginAttmpt/add';
import type { IUserDetailsDto } from './get/types';
import type { IGetAllUsersDto } from './getAll/types';
import type { ILoginDto } from './login/types';
import type { IRegisterDto } from './register/types';
import type { EModules } from '../../tools/abstract/enums';
import type { ILocalUser } from '../../types';

export default class UserHandler extends HandlerFactory<EModules.Users> {
  private readonly _removeController: RemoveController;
  private readonly _loginController: LoginController;
  private readonly _addController: RegisterController;
  private readonly _getAllController: GetAllController;
  private readonly _loginAttemptController: LoginAttemptController;

  constructor() {
    super(new GetController());
    this._removeController = new RemoveController();
    this._loginController = new LoginController();
    this._addController = new RegisterController();
    this._getAllController = new GetAllController();
    this._loginAttemptController = new LoginAttemptController();
  }

  private get addController(): RegisterController {
    return this._addController;
  }

  async getAll(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.getAllController.getAll(payload as IGetAllUsersDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }
  private get getAllController(): GetAllController {
    return this._getAllController;
  }

  private get loginAttemptController(): LoginAttemptController {
    return this._loginAttemptController;
  }

  private get removeController(): RemoveController {
    return this._removeController;
  }

  private get loginController(): LoginController {
    return this._loginController;
  }

  async getDetails(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.getController.get(payload as IUserDetailsDto[]);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }
  async login(payload: unknown, user: ILocalUser): Promise<void> {
    const data = payload as ILoginDto;

    try {
      const callback = await this.loginController.login(data);
      await this.loginAttemptController.add({ login: data.login, ip: data.ip, output: ELoginOutput.Success });
      return State.broker.send(user.tempId, callback, enums.EMessageTypes.Credentials);
    } catch (_err) {
      await this.loginAttemptController.add({ login: data.login, ip: data.ip, output: ELoginOutput.Fail });
      throw new errors.IncorrectCredentialsError();
    }
  }

  async register(payload: IRegisterDto): Promise<string> {
    return this.addController.register(payload);
  }

  async remove(password: string, id: string): Promise<void> {
    await this.loginController.comparePassword(id, password);
    await this.removeController.remove(id);
  }
}
