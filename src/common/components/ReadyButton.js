import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';

const R = {
  WrapperLight: styled(TouchableOpacity)`
    border: 2px solid #3F607D;
    border-radius: 50;
    align-items: center;
    justify-content: center;
    padding-left: 50;
    padding-right: 50;
    padding-top: 17;
    padding-bottom: 17;
  `,
  WrapperDisabledLight: styled.View`
    border: 2px solid #3F607D;
    border-radius: 50;
    align-items: center;
    justify-content: center;
    padding-left: 50;
    padding-right: 50;
    padding-top: 17;
    padding-bottom: 17;
    opacity: 0.5;
  `,
  TextLight: styled.Text`
    color: #3F607D;
    font-size: 18;
    font-weight: bold;
  `,
  WrapperDark: styled(TouchableOpacity)`
    border: 2px solid #fff;
    border-radius: 50;
    align-items: center;
    justify-content: center;
    padding-left: 50;
    padding-right: 50;
    padding-top: 17;
    padding-bottom: 17;
  `,
  WrapperDisabledDark: styled.View`
    border: 2px solid #fff;
    border-radius: 50;
    align-items: center;
    justify-content: center;
    padding-left: 50;
    padding-right: 50;
    padding-top: 17;
    padding-bottom: 17;
    opacity: 0.5;
  `,
  TextDark: styled.Text`
    color: #3F607D;
    font-size: 18;
    font-weight: bold;
  `,
};

const THEME = {
  LIGHT: 'Light',
  DARK: 'Dark',
};

const ReadyButton = ({
  theme = THEME.LIGHT,
  disabled,
  onPress,
  children,
}) => {
  if (theme !== THEME.LIGHT || theme !== THEME.DARK) {
    theme = THEME.LIGHT;
  }

  const WrapperKey = (
    `Wrapper${disabled ? 'Disabled' : ''}${theme}`
  );
  const TextKey = (
    `Text${theme}`
  );
  const Wrapper = R[WrapperKey];
  const Text = R[TextKey];

  return (
    <Wrapper
      onPress={onPress}
    >
      <Text>{children}</Text>
    </Wrapper>
  );
};

export default ReadyButton;
