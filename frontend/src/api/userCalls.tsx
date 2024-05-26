import { axios } from "axios";

export const loginUser = async (userId: number) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      userId,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
