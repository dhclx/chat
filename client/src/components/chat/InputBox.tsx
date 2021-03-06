import React, { useRef, useContext, useState } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import { InputBase, IconButton } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import styles from './InputBox.module.scss';
import UserContext from '../auth/UserContext';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  messageInput: {
    width: 'auto'
  },
  emojiAdornment: {
    fontSize: '50px',
    color: '#0a5d7d',
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

  const handleSelect = (e: any) => {
    const emoji = e.currentTarget.innerText;
    setMessage((message) => message + emoji);
    handleClose();
  };

  const renderEmojiSelector = () => {
    const emojis = ['😀', '😬', '😁', '😂', '😆', '😍', '🙄', '😷', '🤮', '😭', '😎', '🤓', '😡'];
    const formattedEmojis = emojis.map((emoji: any, i) => (
      <div key={i} onClick={handleSelect} style={{ cursor: 'pointer', fontSize: '30px' }}>
        {emoji}
      </div>
    ));
    return (
      <div style={{ display: 'flex' }}>{formattedEmojis}</div>
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
          vertical: 'bottom',
          horizontal: 'center',
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
    <div className={styles.container}>
      <UserAdornment />
      <InputBase
        id="message-input"
        className={styles.input}
        placeholder="Write here..."
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          };
        }}
      />
      <IconButton className={styles.iconButton} onClick={() => sendMessage()}>
        <SendIcon className={styles.send} />
      </IconButton>
      <EmojiAdornment />

    </div>
  );
};

export default InputBox;
