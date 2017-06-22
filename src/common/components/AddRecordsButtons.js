import React, { Component } from 'react';
import {
  Animated,
  View,
  PanResponder,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Plus, Minus } from './PlusMinus';

const Regular = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;

const Main = Regular.extend`
  align-items: center;
  justify-content: center;
`;

const Inner = Animated.createAnimatedComponent(styled.View`
  align-items: center;
  justify-content: center;
  background-color: #fff;
`);

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

const createButtonAnimated = (Comp, size, defaultX, defaultY, toX, toY) => (
  class ButtonAnimated extends Component {
    constructor() {
      super();

      this.coords = new Animated.ValueXY({
        x: defaultX,
        y: defaultY,
      });
      this.opacity = new Animated.Value(0.0);
      this.scale = new Animated.Value(1);
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

    highlight() {
      Animated.spring(this.scale, {
        toValue: 1.5,
        useNativeDriver: true,
      }).start();
    }

    unhighlight() {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }

    render() {
      return (
        <Comp
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: this.coords.getTranslateTransform(),
            opacity: this.opacity,
          }}
        >
          <Inner
            style={{
              width: size,
              height: size,
              borderRadius: (size) / 2,
              transform: [{ scale: this.scale }],
            }}
          >
            {this.props.children}
          </Inner>
        </Comp>
      );
    }
  }
);

const Button1 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  40,
  -25,
  -170,
  -25,
  -200,
);
const Button2 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  40,
  -148,
  -43,
  -178,
  -43,
);
const Button3 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  40,
  108,
  -43,
  138,
  -43,
);
const Button4 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  40,
  -113,
  -131,
  -138,
  -156,
);
const Button5 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  40,
  73,
  -131,
  98,
  -156,
);
const Button6 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  40,
  -113,
  45,
  -138,
  80,
);
const Button7 = createButtonAnimated(
  Animated.createAnimatedComponent(Regular),
  40,
  73,
  45,
  98,
  80,
);

const MainButton = createButtonAnimated(
  Animated.createAnimatedComponent(Main),
  60,
  -30,
  85,
  -30,
  105,
);

const REGULAR_HIT_SLOP = 30;
const coords = [
  [1, -25 + REGULAR_HIT_SLOP, -200 + REGULAR_HIT_SLOP, Math.pow(15, 2)],
  [2, -178 + REGULAR_HIT_SLOP, -43 + REGULAR_HIT_SLOP, Math.pow(15, 2)],
  [3, 138 + REGULAR_HIT_SLOP, -43 + REGULAR_HIT_SLOP, Math.pow(15, 2)],
  [4, -138 + REGULAR_HIT_SLOP, -156 + REGULAR_HIT_SLOP, Math.pow(15, 2)],
  [5, 98 + REGULAR_HIT_SLOP, -156 + REGULAR_HIT_SLOP, Math.pow(15, 2)],
  [6, -138 + REGULAR_HIT_SLOP, 80 + REGULAR_HIT_SLOP, Math.pow(15, 2)],
  [7, 98 + REGULAR_HIT_SLOP, 80 + REGULAR_HIT_SLOP, Math.pow(15, 2)],
  ['main', -30 + 30, 105 + 30, Math.pow(30, 2)],
];

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
    this.coords = null;
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

  highlight(id) {
    const button = this.buttons[id];

    if (button != null) {
      button.highlight();
    }
  }

  unhighlight(id) {
    const button = this.buttons[id];

    if (button != null) {
      button.unhighlight();
    }
  }

  getRef = num => ref => {
    if (ref != null) {
      this.buttons[num] = ref;
    }
  }

  getWrapperRef = ref => {
    if (ref == null) {
      return;
    }
    if (this.coords != null) {
      return;
    }
    setTimeout(
      () => ref.measure((a, b, c, d, cx, cy) => this.prepareCoords(cx, cy)),
      0
    );
  }

  prepareCoords = (cx, cy) => {
    this.coords = coords.reduce(
      (acc, [id, dx, dy, powR]) => {
        acc.push(id);
        acc.push(cx + dx);
        acc.push(cy + dy);
        acc.push(powR);
        return acc;
      },
      []
    );
  }

  compareCoords(x, y) {
    const coords = this.coords;
    if (coords == null) {
      return;
    }
    let i = 0;
    let len = coords.length;
    for (; i < len; i = i + 4) {
      let dx = Math.abs(x - coords[i + 1]);
      let dy = Math.abs(y - coords[i + 2]);
      if (dx * dx + dy * dy < coords[i + 3]) {
        return coords[i];
      }
    }

    return null;
  }

  render() {
    return (
      <View ref={this.getWrapperRef}>
        <Wrapper>
          <Button1 ref={this.getRef(1)}>
            <Icon name="star-o" size={25} color="#09203F" />
          </Button1>
          <Button2 ref={this.getRef(2)} />
          <Button3 ref={this.getRef(3)} />
          <Button4 ref={this.getRef(4)} />
          <Button5 ref={this.getRef(5)} />
          <Button6 ref={this.getRef(6)} />
          <Button7 ref={this.getRef(7)} />
          <MainButton ref={this.getRef('main')}>
            <Icon
              name="ellipsis-h"
              size={35}
              color="#09203F"
              style={{ paddingTop: 5 }}
              />
          </MainButton>
        </Wrapper>
      </View>
    );
  }
}

export default class ButtonsWrapper extends Component {
  constructor() {
    super();

    this.records = null;

    this.activeId = null;
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
        if (this.activeId != null) {
          this.records.unhighlight(this.activeId);
          this.activeId = null;
        }
      },
      onPanResponderMove: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
        const id = this.records.compareCoords(pageX, pageY);
        if (id == null) {
          if (this.activeId != null) {
            this.records.unhighlight(this.activeId);
            this.activeId = null;
          }
          return;
        }
        if (this.activeId == null) {
          this.records.highlight(id);
          this.activeId = id;
        }
      }
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
