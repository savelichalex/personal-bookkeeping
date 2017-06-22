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
        toValue: this.props.scale || 1.5,
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

const REGULAR_HIT_SLOP = 40;
const coords = [
  [1, -25 + REGULAR_HIT_SLOP,
   -200 + REGULAR_HIT_SLOP, Math.pow(REGULAR_HIT_SLOP, 2)],
  [2, -178 + REGULAR_HIT_SLOP,
   -43 + REGULAR_HIT_SLOP, Math.pow(REGULAR_HIT_SLOP, 2)],
  [3, 138 + REGULAR_HIT_SLOP,
   -43 + REGULAR_HIT_SLOP, Math.pow(REGULAR_HIT_SLOP, 2)],
  [4, -138 + REGULAR_HIT_SLOP,
   -156 + REGULAR_HIT_SLOP, Math.pow(REGULAR_HIT_SLOP, 2)],
  [5, 98 + REGULAR_HIT_SLOP,
   -156 + REGULAR_HIT_SLOP, Math.pow(REGULAR_HIT_SLOP, 2)],
  [6, -138 + REGULAR_HIT_SLOP,
   80 + REGULAR_HIT_SLOP, Math.pow(REGULAR_HIT_SLOP, 2)],
  [7, 98 + REGULAR_HIT_SLOP,
   80 + REGULAR_HIT_SLOP, Math.pow(REGULAR_HIT_SLOP, 2)],
  ['main', -30 + REGULAR_HIT_SLOP + 10,
   105 + REGULAR_HIT_SLOP + 10, Math.pow(REGULAR_HIT_SLOP + 10, 2)],
];

const catsByLength = {
  1: [[1, Button1]],
  2: [[4, Button4], [5, Button5]],
  3: [[1, Button1], [2, Button2], [3, Button3]],
  4: [[4, Button4], [5, Button5], [2, Button2], [3, Button3]],
  5: [[1, Button1], [4, Button4], [5, Button5], [2, Button2], [3, Button3]],
  6: [
    [1, Button1],
    [2, Button2], [3, Button3], [4, Button4],
    [5, Button5], [6, Button6]],
  7: [
    [1, Button1],
    [2, Button2], [3, Button3], [4, Button4],
    [5, Button5], [6, Button6], [7, Button7]],
};

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
      return id;
    }

    return null;
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

  renderButtons() {
    const buttons = catsByLength[this.props.categories.length];
    return this.props.categories.map(({
      id: catId,
      icon,
    }, index) => {
      const [id, Button] = buttons[index];

      return (
        <Button
          ref={this.getRef(id)}
          id={catId}
        >
          <Icon name={icon} size={25} color="#395b8a" />
        </Button>
      );
    });
  }

  render() {
    return (
      <View ref={this.getWrapperRef}>
        <Wrapper>
          {this.renderButtons()}
          <MainButton ref={this.getRef('main')} scale={1.3}>
            <Icon
              name="ellipsis-h"
              size={35}
              color="#395b8a"
              style={{ paddingTop: 5 }}
            />
          </MainButton>
        </Wrapper>
      </View>
    );
  }
}

const createPanResponder = (key, ctx, isCost) => PanResponder.create({
  onStartShouldSetPanResponder: (evt, gestureState) => true,
  onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
  onMoveShouldSetPanResponder: (evt, gestureState) => true,
  onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  onPanResponderGrant: (evt, gestureState) => {
    ctx[key].open();
  },
  onPanResponderRelease: (evt, gestureState) => {
    ctx[key].close();
    if (ctx.activeId != null) {
      const id = ctx[key].unhighlight(ctx.activeId);
      ctx.activeId = null;

      if (id == null) {
        return;
      }
      if (id == 'main') {
        return ctx.props.onOpenRecordWithoutCategory(isCost);
      }
      return ctx.props.onOpenRecordWithCategory(id, isCost);
    }
  },
  onPanResponderMove: (evt) => {
    const { pageX, pageY } = evt.nativeEvent;
    const id = ctx[key].compareCoords(pageX, pageY);
    if (id == null) {
      if (ctx.activeId != null) {
        ctx[key].unhighlight(ctx.activeId);
        ctx.activeId = null;
      }
      return;
    }
    if (ctx.activeId == null) {
      ctx[key].highlight(id);
      ctx.activeId = id;
    }
  }
});

export default class ButtonsWrapper extends Component {
  constructor() {
    super();

    this.income = null;
    this.cost = null;

    this.activeId = null;
    this.incomePanResponder = createPanResponder('income', this, false);
    this.costPanResponder = createPanResponder('cost', this, true);
  }

  getIncomeRecordsRef = ref => {
    if (ref != null) {
      this.income = ref;
    }
  }

  getCostRecordsRef = ref => {
    if (ref != null) {
      this.cost = ref;
    }
  }

  render() {
    return (
      <ButtonsOutter>
        <Buttons>
          <View
            {...this.incomePanResponder.panHandlers}
            hitSlop={{
              top: 20,
              left: 10,
              right: 10,
              bottom: 20,
            }}
          >
            <Plus size={45} width={8} />
          </View>
          <View
            {...this.costPanResponder.panHandlers}
            hitSlop={{
              top: 40,
              left: 10,
              right: 10,
              bottom: 40,
            }}
          >
            <Minus size={45} width={8} />
          </View>
        </Buttons>
        <AddRecord
          ref={this.getIncomeRecordsRef}
          categories={this.props.incomesCategories}
        />
        <AddRecord
          ref={this.getCostRecordsRef}
          categories={this.props.costsCategories}
        />
      </ButtonsOutter>
    );
  }
}
