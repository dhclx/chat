import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  title: string;
  small: boolean;
  disabled: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick: () => void;
};

const CustomButton: React.FC<Props> = props => {
  if (props.disabled) {
    return (
      <button onClick={props.onClick} disabled className={styles.deactive} type={props.type ? props.type : 'button'}>
        {props.title}
      </button>
    )
  } else {
    return (
      <button onClick={props.onClick} className={styles.active} type={props.type ? props.type : 'button'}>
        {props.title}
      </button>
    )
  }
};

export default CustomButton;
