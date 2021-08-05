import User from '../models/user';

interface UserPayload {
  username: string | null,
  socketId: string
};

export const removeUser = async (data: UserPayload) => {
  const { socketId } = data;
  return await User.findOneAndDelete({ socketId: socketId });
};

export const createUser = async (data: UserPayload) => {
  return await User.create(data);
};

export const getAllUsers = async () => {
  return await User.find({});
};
