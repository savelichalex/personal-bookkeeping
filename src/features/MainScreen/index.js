import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Navigator from 'native-navigation';

const WrapperView = styled.View`
  flex: 1;
  flex-direction: column;
  padding-bottom: 40;
`;

const StartedWrapper = styled.View`
  flex: 3;
  flex-direction: column;
  background-color: #193352;
`;

const Balance = {
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 20;
  `,
  Text: styled.Text`
    color: white;
    font-size: 24;
    font-weight: bold;
  `,
  CircleOutter: styled.View`
    flex-direction: row;
    justify-content: center;
  `,
  CircleOutterBorder: styled.View`
    border: 1px solid #272727;
    width: 214;
    height: 214;
    border-radius: 117;
    align-items: center;
    justify-content: center;
  `,
  CircleInnerBorder: styled.View`
    border: 1px solid #272727;
    width: 186;
    height: 186;
    border-radius: 93;
  `,
};

const Additional = {
  Wrapper: styled.View`
    flex: 1;
    flex-direction: row;
    background-color: white;
  `,
  Arrow: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  Inner: styled.View`
    flex: 8;
    flex-direction: column;
    padding-top: 10
    padding-bottom: 10
  `,
  Row: styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Cell: styled.Text`
    color: #4A4A4A;
    font-size: 24;
    font-weight: bold;
  `,
};

const MainScreen = () => (
  <Navigator.Config
    hidden={true}
  >
    <WrapperView>
      <StartedWrapper>
        <Balance.Wrapper>
          <Balance.Text>Баланс: 10000 р.</Balance.Text>
        </Balance.Wrapper>
        <Balance.CircleOutter>
          <Balance.CircleOutterBorder>
            <Balance.CircleInnerBorder>

            </Balance.CircleInnerBorder>
          </Balance.CircleOutterBorder>
        </Balance.CircleOutter>
      </StartedWrapper>
      <Additional.Wrapper>
        <Additional.Arrow>
          <Image
            source={require('../../../images/arrow-black-left.png')}
          />
        </Additional.Arrow>
        <Additional.Inner>
          <Additional.Row>
            <Additional.Cell>Доходы:</Additional.Cell>
            <Additional.Cell>50000 р.</Additional.Cell>
          </Additional.Row>
          <Additional.Row>
            <Additional.Cell>Расходы:</Additional.Cell>
            <Additional.Cell>40000 р.</Additional.Cell>
          </Additional.Row>
        </Additional.Inner>
        <Additional.Arrow>
          <Image
            source={require('../../../images/arrow-black-right.png')}
          />
        </Additional.Arrow>
      </Additional.Wrapper>
    </WrapperView>
  </Navigator.Config>
);

export default MainScreen;
