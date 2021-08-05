import React, { useRef, useContext, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../auth/UserContext';

const useStyles = makeStyles({
  messageInput: {
    width: 500
  },
  emojiAdornment: {
    fontSize: '25px',
    color: '#777777',
    "&:hover": {
      color: '#111111',
      fontWeight: '700',
      cursor: 'pointer'
    }
  }
});

const InputBox = () => {
  const classes = useStyles();
  const { user, socket } = useContext(UserContext);
  const [message, setMessage] = useState<string>('');
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>(null);
  const smiley = useRef(null);

  const UserAdornment = () => (
    <InputAdornment position="start">
      {user.username}
    </InputAdornment>
  );

  const handleOpen = (e: any) => {
    setAnchor(smiley);
    setOpenPopover(true);
  };

  const handleClose = () => {
    setOpenPopover(false);
    setAnchor(null);
  }

  const handleSelect= (e: any) => {
    const emoji = e.currentTarget.innerText;
    setMessage((message) => message + emoji);
    handleClose();
  };

  const renderEmojiSelector = () => {
    const emojis = ['😀','😬','😁','😂','😆','😍','🙄','😷','🤮','😭','😎','🤓','😡'];
    const formattedEmojis = emojis.map((emoji: any) => (
      <div onClick={handleSelect} style={{ cursor: 'pointer' }}>
        {emoji}
      </div>
    ));
    return (
      <div>{formattedEmojis}</div>
    );
  };

  const EmojiAdornment = () => (
    <>
      <InputAdornment
        position="end"
        className={classes.emojiAdornment}
        onClick={handleOpen}
      >
        <p ref={smiley}>☺</p>
      </InputAdornment>
      <Popover
        open={openPopover}
        onClose={handleClose}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 700,
          horizontal: 500,
        }}
      >
        {renderEmojiSelector()}
      </Popover>
    </>
  )

  const sendMessage = () => {
    socket?.emit('message', {
      user,
      message
    });
    setMessage('');
  };

  return (
    <TextField
      id="message-input"
      variant="outlined"
      className={classes.messageInput}
      value={message}
      color="primary"
      autoComplete="off"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      }}
      InputProps={{
        startAdornment: <UserAdornment />,
        endAdornment: <EmojiAdornment />
      }}
    />
  );
};

export default InputBox;
