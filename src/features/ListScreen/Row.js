import React, { Component } from 'react';
import { View, Animated, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');

const createTranslateX = (anim, input, output) => [
  {
    translateX: anim.interpolate({
      inputRange: input,
      outputRange: output,
    }),
  },
];

const Button = {
  Wrapper: styled.View`
    position: absolute;
    left: 0;
    right: 0;
    height: 60;
  `,
  Edit: Animated.createAnimatedComponent(styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${Screen.width - 144};
    width: ${Screen.width};
    background-color: #A4EEAA;
    padding-left: 22;
    justify-content: center;
  `),
  Delete: Animated.createAnimatedComponent(styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${Screen.width - 72};
    width: ${Screen.width};
    background-color: #FF9D9D;
    padding-left: 22;
    justify-content: center;
  `),
  Inner: styled(TouchableOpacity)`
    width: 30;
    height: 30;
  `,
  Icon: styled.Image`
    width: 30;
    height: 30;
  `,
};

const InnerView = styled.View`
  left: 0;
  right: 0;
  height: 60;
  background-color: white;
`;

class Row extends Component {
  constructor() {
    super();
    this.deltaX = new Animated.Value(0);
  }

  onEdit = () => {
    this.refs.main.snapTo({ id: 0 });
    if (this.props.onEdit) {
      this.props.onEdit();
    }
  }

  render() {
    return (
      <View>
        <Button.Wrapper pointerEvents="box-none">
          <Button.Edit
            style={{
              transform: createTranslateX(this.deltaX, [-144, 0], [0, 144]),
            }}
          >
            <Button.Inner
              onPress={this.onEdit}
            >
              <Button.Icon source={require('../../../images/edit-icon.png')} />
            </Button.Inner>
          </Button.Edit>
          <Button.Delete
            style={{
              transform: createTranslateX(this.deltaX, [-144, 0], [0, 72]),
            }}
          >
            <Button.Inner
              onPress={this.close}
            >
              <Button.Icon source={require('../../../images/delete-icon.png')} />
            </Button.Inner>
          </Button.Delete>
        </Button.Wrapper>
        <Interactable.View
          horizontalOnly={true}
          ref="main"
          snapPoints={[
            { x: 0, damping: 0.6, tension: 600 },
            { x: -144, damping: 0.6, tension: 600 },
          ]}
          animatedValueX={this.deltaX}
        >
          <InnerView>
            {this.props.children}
          </InnerView>
        </Interactable.View>
      </View>
    );
  }
}

export default Row;
