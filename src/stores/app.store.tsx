import { atom } from 'jotai';
import { IApiSettingAllItem } from '@/types/api';

export const appStore = {
  setting: atom<Partial<IApiSettingAllItem>>({}),
} as const;
