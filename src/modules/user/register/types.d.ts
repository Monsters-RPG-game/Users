import type { ILoginDto } from '../login/types';

export interface IRegisterDto extends Omit<ILoginDto, 'ip'> {
  email: string;
}
