import axios from 'axios';
import { setReduxErrors } from '../store/errors/errorReducer';
import { Dispatch } from 'redux';

export const handleApiError = (error: any, dispatch: Dispatch): void => {
  console.log('Error in API call: received error in handleApiError');
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { message, errors } = error.response.data;
      console.error('API error response:', error.response.data);
      dispatch(setReduxErrors([message, ...errors]));
      return 
    }

    console.error('No response received:', error.message);
    dispatch(setReduxErrors(['No response received from server.']));
  } else {
    console.error('Unexpected error:', error);
    dispatch(setReduxErrors(['An unexpected error occurred.']));
  };
};