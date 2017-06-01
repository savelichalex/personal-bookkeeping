import React from 'react';
import Navigator from 'native-navigation';

import styled from 'styled-components/native';

const TODOText = styled.Text`
  color: black;
  font-size: 24;
  align-self: center;
`;

const SettingsScreen = () => (
  <Navigator.Config>
    <TODOText>TODO!!!</TODOText>
  </Navigator.Config>
);

export default SettingsScreen;
