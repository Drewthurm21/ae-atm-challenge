import { SafeCustomerData } from '@shared/types';

export interface UserStateShape {
  user: SafeCustomerData | null;
  loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}
