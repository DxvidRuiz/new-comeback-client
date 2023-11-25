import * as React from 'react';
import { TextInput } from 'react-native-paper';


type InputOptions={
  rightIcon?: any,
  label?:string
}

const CustomInput = (options : InputOptions) => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label={options.label}
      secureTextEntry
      right={options.rightIcon}
    />
  );
};

export default CustomInput;