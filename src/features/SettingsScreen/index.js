import React, { Component } from 'react';
import Navigator from 'native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { SectionList } from 'react-native';
import DateSegmented from '../../common/components/DateSegment';
import { connect } from '../../db';
import { mapDbRows } from '../../common/utils';
import { updateDateSetting } from './actions';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Header = styled(LinearGradient)`
  height: ${props => props.height};
`;

const Section = {
  Row: styled.View`
    background-color: #ddddda;
    padding-top: 10;
    padding-bottom: 10;
    padding-left: 10;
    padding-right: 10;
  `,
  Text: styled.Text`
    color: #666;
    font-size: 16;
  `,
  ItemRow: styled.View`
    background-color: #fff;
    padding-top: 10;
    padding-bottom: 10;
    padding-left: 10;
    padding-right: 10;
    flex-direction: row;
    justify-content: space-between;
  `,
  ItemText: styled.Text`
    color: black;
    font-size: 16;
  `,
};

const itemRow = ({
  item: {
    option,
    value,
  },
}) => (
  <Section.ItemRow>
    <Section.ItemText>
      {option === 'period' ? 'За период:' : ''}
    </Section.ItemText>
    <DateSegmented
      value={value}
      onPress={updateDateSetting}
    />
  </Section.ItemRow>
);

const sectionRow = ({ section: { title } }) => (
  <Section.Row>
    <Section.Text>
      {title}
    </Section.Text>
  </Section.Row>
);

const SettingsScreen = ({ nativeNavigationInitialBarHeight, settings }) => (
  <Navigator.Config
    hidden
  >
    <Wrapper>
      <Header
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={['#537895', '#09203F']}
        height={nativeNavigationInitialBarHeight}
      />
      <SectionList
        renderItem={itemRow}
        renderSectionHeader={sectionRow}
        stickySectionHeadersEnabled={false}
        sections={[
          {
            data: settings,
            title: "Основные настройки",
          },
        ]}
      />
    </Wrapper>
  </Navigator.Config>
);

export default connect(
  [
    () => 'SELECT option, value FROM Settings',
  ],
  (settingsSet) => {
    if (settingsSet == null) {
      return {
        settings: [],
      };
    }

    return {
      settings: mapDbRows(settingsSet.rows),
    };
  },
)(SettingsScreen);
