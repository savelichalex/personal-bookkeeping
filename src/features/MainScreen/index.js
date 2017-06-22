import React from 'react';
import {
  ART,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import Navigator from 'native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from '../../db';
import { mapDbRows } from '../../common/utils';

import Buttons from '../../common/components/AddRecordsButtons';

const {
  Surface,
  Group,
  Shape,
  Path,
} = ART;

const WrapperView = styled.View`
  flex: 1;
  flex-direction: column;
  padding-bottom: 40;
`;

const StartedWrapper = styled(LinearGradient)`
  flex: 3;
  flex-direction: column;
`;

const Balance = {
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 30;
  `,
  Text: styled.Text`
    color: white;
    font-size: 24;
    font-weight: bold;
    background-color: transparent;
  `,
  CircleOutter: styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  CircleOutterBorder: styled.View`
    border: 1px solid #272727;
    width: 214;
    height: 214;
    border-radius: 117;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: transparent;
  `,
  CircleInnerBorder: styled.View`
    border: 1px solid #272727;
    width: 184;
    height: 184;
    border-radius: 92;
    position: absolute;
    top: 14;
    left: 14;
    right: 14;
    bottom: 14;
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  CircleButtons: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 130;
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
    opacity: 0;
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

const circlePath = (cx, cy, r, startDegree, endDegree) => {
  let p = Path();
  if (Platform.OS === 'ios') {
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1);
  } else {
    // For Android we have to resort to drawing low-level Path primitives, as ART does not support
    // arbitrary circle segments. It also does not support strokeDash.
    // Furthermore, the ART implementation seems to be buggy/different than the iOS one.
    // MoveTo is not needed on Android
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, (startDegree - endDegree) * Math.PI / 180, 0);
  }
  return p;
};

const Circle = ({ size, width, minusPer }) => {
  const plusPath = circlePath(
    size / 2, size / 2, size / 2 - width / 2, 0, 360,
  );
  const minusPath = circlePath(
    size / 2, size / 2, size / 2 - width / 2, 0, 360 * minusPer / 100,
  );
  return (
    <Surface
      width={size}
      height={size}
    >
      <Group
        rotation={-90}
        originX={size / 2}
        originY={size / 2}
      >
        <Shape
          d={plusPath}
          stroke="#A4EEAA"
          strokeWidth={width}
        />
        {minusPer > 0 && (
          <Shape
            d={minusPath}
            stroke="#FF9D9D"
            strokeWidth={width}
            strokeCap={'square'}
          />
        )}
      </Group>
    </Surface>
  );
};

const MainScreen = ({
  income,
  cost,
  balance,
  costPer,
  incomesCategories,
  costsCategories,
}) => (
  <Navigator.Config
    hidden
  >
    <WrapperView>
      <StartedWrapper
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={['#537895', '#09203F']}
      >
        <Balance.Wrapper>
          <Balance.Text>Баланс: {balance} р.</Balance.Text>
        </Balance.Wrapper>
        <Balance.CircleOutter>
          <Balance.CircleOutterBorder>
            <Circle size={213} width={14} minusPer={costPer} />
            <Balance.CircleInnerBorder>
              <Buttons
                incomesCategories={incomesCategories}
                costsCategories={costsCategories}
                onOpenRecordWithCategory={
                  (id, isCost) => Navigator.present(
                    'AddRecordWithCategory',
                    { isCost },
                  )
                }
                onOpenRecordWithoutCategory={
                  isCost => Navigator.present(
                    'AddRecordWithCategory',
                    { isCost },
                  )
                }
              />
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
            <Additional.Cell>{income} р.</Additional.Cell>
          </Additional.Row>
          <Additional.Row>
            <Additional.Cell>Расходы:</Additional.Cell>
            <Additional.Cell>{cost} р.</Additional.Cell>
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

export default connect(
  [
    ({ periodStart }) => `
      SELECT sum(amount)
      FROM Records
      WHERE type = 'income' AND created >= ${periodStart}`,
    ({ periodStart }) => `
      SELECT sum(amount)
      FROM Records
      WHERE type = 'cost' AND created >= ${periodStart}`,
    () => `
      SELECT c.id, c.icon
      FROM Categories c
        LEFT JOIN Records r ON r.category = c.id
      WHERE type='income'
      GROUP BY c.id
      ORDER BY COUNT(r.category) DESC
      LIMIT 7
    `,
    () => `
      SELECT c.id, c.icon
      FROM Categories c
        LEFT JOIN Records r ON r.category = c.id
      WHERE type='cost'
      GROUP BY c.id
      ORDER BY COUNT(r.category) DESC
      LIMIT 7
    `,
  ],
  (incomeSet, costSet, incomesCategoriesSet, costsCategoriesSet) => {
    if (incomeSet == null || costSet == null) {
      return ({
        income: 0,
        cost: 0,
        balance: 0,
        costPer: 50,
        incomesCategories: [],
        costsCategories: [],
      });
    }

    const income = incomeSet.rows.item(0)['sum(amount)'];
    const cost = costSet.rows.item(0)['sum(amount)'];
    const balance = income - cost;
    const costPer = balance > 0
          ? Math.floor(cost / income * 100)
          : 100;

    const incomesCategories = mapDbRows(incomesCategoriesSet.rows);
    const costsCategories = mapDbRows(costsCategoriesSet.rows);

    return ({
      income,
      cost: cost || 0,
      balance: balance || 0,
      costPer: costPer || 0,
      incomesCategories,
      costsCategories,
    });
  },
)(MainScreen);
