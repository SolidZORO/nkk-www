import { atom } from 'jotai';
import { IAuthUser } from '@/types';
import {
  getCookieUserInfo,
  getCookieUserToken,
  getCookieUserTokenExpiresIn,
} from '@/utils/user.util';

const token = atom<string>('');
token.onMount = (set) => set(() => getCookieUserToken());

const tokenExpiresIn = atom<string | undefined>('');
tokenExpiresIn.onMount = (set) => set(() => getCookieUserTokenExpiresIn());

const userInfo = atom<Partial<IAuthUser | null>>(null);
userInfo.onMount = (set) => set(() => getCookieUserInfo());

const permissions = atom<string[]>([]);
permissions.onMount = (set) => set(() => getCookieUserInfo()?.permissions);

export const userStore = {
  token,
  tokenExpiresIn,
  permissions,
  userInfo,
};
