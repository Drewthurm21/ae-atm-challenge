import axios from 'axios';
import { SafeCustomerData, ApiResponseError } from '@shared/types';

export const loginUserByAccountId = async (id: number): Promise<SafeCustomerData | ApiResponseError> => {
  const response = await axios.post('http://localhost:3000/users/login', { account_id: id });
  return response.data;
};
