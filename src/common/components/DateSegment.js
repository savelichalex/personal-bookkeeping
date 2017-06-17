import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Segment = {
  Wrapper: styled.View`
    flex-direction: row;
  `,
  Text: styled.Text`
    font-size: 12;
    color: #09203F;
  `,
  TextActive: styled.Text`
    font-size: 12;
    color: white;
  `,
  Left: styled(TouchableOpacity)`
    border-top-left-radius: 5;
    border-bottom-left-radius: 5;
    border-left-width: 1;
    border-top-width: 1;
    border-bottom-width: 1;
    border-color: #3F607D;
    padding-top: 8;
    padding-right: 15;
    padding-bottom: 8;
    padding-left: 15;
  `,
  LeftActive: styled(TouchableOpacity)`
    border-top-left-radius: 5;
    border-bottom-left-radius: 5;
    border-left-width: 1;
    border-top-width: 1;
    border-bottom-width: 1;
    border-color: #3F607D;
    padding-top: 8;
    padding-right: 15;
    padding-bottom: 8;
    padding-left: 15;
    background-color: #3F607D;
  `,
  Center: styled(TouchableOpacity)`
    border-width: 1;
    border-color: #3F607D;
    padding-top: 8;
    padding-right: 15;
    padding-bottom: 8;
    padding-left: 15;
  `,
  CenterActive: styled(TouchableOpacity)`
    border-width: 1;
    border-color: #3F607D;
    padding-top: 8;
    padding-right: 15;
    padding-bottom: 8;
    padding-left: 15;
    background-color: #3F607D;
  `,
  Right: styled(TouchableOpacity)`
    border-top-right-radius: 5;
    border-bottom-right-radius: 5;
    border-top-width: 1;
    border-right-width: 1;
    border-bottom-width: 1;
    border-color: #3F607D;
    padding-top: 8;
    padding-right: 15;
    padding-bottom: 8;
    padding-left: 15;
  `,
  RightActive: styled(TouchableOpacity)`
    border-top-right-radius: 5;
    border-bottom-right-radius: 5;
    border-right-width: 1;
    border-right-width: 1;
    border-bottom-width: 1;
    border-color: #3F607D;
    padding-top: 8;
    padding-right: 15;
    padding-bottom: 8;
    padding-left: 15;
    background-color: #3F607D;
  `,
};

const DATE = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
};

class DateSegmented extends Component {
  constructor({ activeValue }) {
    super();

    this.state = {
      activeValue,
    };
  }

  compareToActiveValue = (value) => {
    return this.state.activeValue === value;
  }

  compareToText = (value) => {
    return this.compareToActiveValue(value)
      ? Segment.TextActive
      : Segment.Text;
  }

  onPress = (activeValue) => {
    this.setState({
      activeValue,
    });

    if (this.props.onPress) {
      this.props.onPress(activeValue);
    }
  }

  render() {
    const { activeValue } = this.state;
    const comp = this.compareToActiveValue;
    const compT = this.compareToText;

    const Left = comp(DATE.YEAR) ? Segment.LeftActive : Segment.Left;
    const LeftText = compT(DATE.YEAR);
    const Center = comp(DATE.MONTH) ? Segment.CenterActive : Segment.Center;
    const CenterText = compT(DATE.MONTH);
    const Right = comp(DATE.WEEK) ? Segment.RightActive : Segment.Right;
    const RightText = compT(DATE.WEEK);

    return (
      <Segment.Wrapper>
        <Left
          onPress={() => this.onPress(DATE.YEAR)}
        >
          <LeftText>
            Год
          </LeftText>
        </Left>
        <Center
          onPress={() => this.onPress(DATE.MONTH)}
        >
          <CenterText>
            Месяц
          </CenterText>
        </Center>
        <Right
          onPress={() => this.onPress(DATE.WEEK)}
        >
          <RightText>
            Неделя
          </RightText>
        </Right>
      </Segment.Wrapper>
    );
  }
}

export default DateSegmented;
