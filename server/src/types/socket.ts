export interface ClientMessage {
  user: {
    username: string,
    auth: boolean
  },
  message: string
};

