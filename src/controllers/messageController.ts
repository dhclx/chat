// if/when it make sense, this file should be split into appropriately named files for this dir

import Message from '../models/message';

// this function returns a list of recent messages upon joining for good UX:
export const getRecentMessages = async () => {
  return await Message
    .find()
    // reverse to get latest
    .sort({ _id: -1 })
    .limit(15)
};

interface MessagePayload {
  user: {
    username: string,
    auth: boolean
  },
  message: string
};

export const createMessage = async (data: MessagePayload) => {
  console.log(data);
  const messageDoc = {
    username: data.user.username,
    message: data.message
  };

  return await Message.create(messageDoc);
};
