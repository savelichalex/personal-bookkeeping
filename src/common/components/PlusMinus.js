import React from 'react';
import {
  ART,
} from 'react-native';

const {
  Surface,
  Group,
  Shape,
} = ART;

export const Plus = ({ size, width }) => (
  <Surface
    width={size}
    height={size}
  >
    <Group>
      <Shape
        d={`M 0 ${size /  2} L ${size} ${size / 2}`}
        stroke="#fff"
        strokeWidth={width}
        strokeCap={'square'}
      />
      <Shape
        d={`M ${size /  2} 0 L ${size / 2} ${size}`}
        stroke="#fff"
        strokeWidth={width}
        strokeCap={'square'}
      />
    </Group>
  </Surface>
);

export const Minus = ({ size, width }) => (
  <Surface
    width={size}
    height={width}
  >
    <Shape
      d={`M 0 ${width /  2} L ${size} ${width / 2}`}
      stroke="#fff"
      strokeWidth={width}
      strokeCap={'square'}
    />
  </Surface>
);
