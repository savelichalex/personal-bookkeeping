import React, { Component } from 'react';
import {
  Animated,
  View,
  PanResponder,
} from 'react-native';
import styled from 'styled-components/native';

import { Plus, Minus } from './PlusMinus';

const Regular = styled.View`
  width: 40;
  height: 40;
  border-radius: 20;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
`;

const Main = Regular.extend`
  width: 60;
  height: 60;
  border-radius: 30;
`;

const Wrapper = styled.View`
  position: relative;
  width: 0;
  height: 0;
`;

const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 130;
`;

const ButtonsOutter = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const createButtonAnimated = (Comp, defaultX, defaultY, toX, toY) => (
  class ButtonAnimated extends Component {
    constructor() {
      super();

      this.coords = new Animated.ValueXY({
        x: defaultX,
        y: defaultY,
      });
      this.opacity = new Animated.Value(0.0);
    }

    open() {
      Animated.parallel([
        Animated.spring(this.coords, {
          toValue: { x: toX, y: toY },
          useNativeDriver: true,
        }),
        Animated.spring(this.opacity, {
          toValue: 1.0,
          useNativeDriver: true,
        }),
      ]).start();
    }

    close() {
      Animated.parallel([
        Animated.spring(this.coords, {
          toValue: { x: defaultX, y: defaultY },
          useNativeDriver: true,
        }),
        Animated.spring(this.opacity, {
          toValue: 0.0,
          useNativeDriver: true,
        }),
      ]).start();
    }

    render() {
      return (
        <Comp
          style={{
            transform: this.coords.getTranslateTransform(),
            opacity: this.opacity,
          }}
        >
          {this.props.children}
        </Comp>
      );
    }
  }
);

const Button1 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  -25,
  -170,
  -25,
  -200,
);
const Button2 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  -148,
  -43,
  -178,
  -43,
);
const Button3 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  108,
  -43,
  138,
  -43,
);
const Button4 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  -113,
  -131,
  -138,
  -156,
);
const Button5 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  73,
  -131,
  98,
  -156,
);
const Button6 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  -113,
  45,
  -138,
  80,
);
const Button7 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  73,
  45,
  98,
  80,
);

const MainButton = createButtonAnimated(
  Animated.createAnimatedComponent(Main),
  -30,
  85,
  -30,
  105,
);

class AddRecord extends Component {
  constructor() {
    super();

    this.buttons = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      main: null,
    };
  }

  open() {
    Object.keys(this.buttons).forEach((num) => {
      const button = this.buttons[num];

      if (button != null) {
        button.open();
      }
    });
  }

  close() {
    Object.keys(this.buttons).forEach((num) => {
      const button = this.buttons[num];

      if (button != null) {
        button.close();
      }
    });
  }

  getRef = num => ref => {
    if (ref != null) {
      this.buttons[num] = ref;
    }
  }

  render() {
    return (
      <Wrapper>
        <Button1 ref={this.getRef(1)} />
        <Button2 ref={this.getRef(2)} />
        <Button3 ref={this.getRef(3)} />
        <Button4 ref={this.getRef(4)} />
        <Button5 ref={this.getRef(5)} />
        <Button6 ref={this.getRef(6)} />
        <Button7 ref={this.getRef(7)} />
        <MainButton ref={this.getRef('main')} />
      </Wrapper>
    );
  }
}

export default class ButtonsWrapper extends Component {
  constructor() {
    super();

    this.records = null;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.records.open();
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.records.close();
      },
    });
  }

  getRecordsRef = ref => {
    if (ref != null) {
      this.records = ref;
    }
  }

  render() {
    return (
      <ButtonsOutter>
        <Buttons>
          <View {...this.panResponder.panHandlers}>
            <Plus size={45} width={8} />
          </View>
          <View>
            <Minus size={45} width={8} />
          </View>
        </Buttons>
        <AddRecord ref={this.getRecordsRef} />
      </ButtonsOutter>
    );
  }
}
