import React from 'react';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Navigator from 'native-navigation';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import Row from './Row';
import { connect, mapRows } from '../../db';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Header = styled(LinearGradient)`
  height: ${props => props.height};
`;

const CategoriesWrapper = styled.View`
  height: 66;
  margin-top: 20;
  margin-left: 10;
  margin-right: 10;
  margin-bottom: 20;
`;

const Categories = styled(ScrollView)`
  flex-direction: row;
  flex: 1;
`;

const Category = styled(TouchableOpacity)`
  width: 66;
  height: 66;
  border-radius: 33;
  border-color: #3F607D;
  border-width: 4;
  border-style: dashed;
  align-items: center;
  justify-content: center;
  margin-left: 10;
  margin-right: 10;
`;

const List = styled(FlatList)`
  flex: 1;
`;

const ListRow = styled.View`
  flex: 1;
  padding-left: 20;
  padding-right: 20;
  border-bottom-width: 1;
  border-bottom-color: #ccc;
  justify-content: center;
`;

const ListRowText = styled.Text`
  color: #3F607D;
  font-size: 18;
  font-weight: bold;
`;

const ListScreen = ({ categories, records, nativeNavigationInitialBarHeight, }) => (
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
      <CategoriesWrapper>
        <Categories
          horizontal
        >
          {categories.map(({ icon }) => (
            <Category>
              <Icon
                name={icon}
                size={25}
                color="#3F607D"
              />
            </Category>
          ))}
        </Categories>
      </CategoriesWrapper>
    <List
      data={records}
      renderItem={({ item }) => (
        <Row
          onEdit={() => Navigator.present('AddRecordWithCategory', item)}
        >
          <ListRow>
            <ListRowText>{item.amount} р.</ListRowText>
          </ListRow>
        </Row>
      )}
    />
    </Wrapper>
  </Navigator.Config>
);

export default connect(
  [
    () => "SELECT id, icon FROM Categories",
    () => "SELECT id, type, amount, note, category FROM Records",
  ],
  (categoriesSet, recordsSet) => {
    if (categoriesSet == null || recordsSet == null) {
      return ({
        categories: [],
        records: [],
      });
    }

    const categories = mapRows(categoriesSet.rows);
    const records = mapRows(recordsSet.rows);

    // TODO: filter categories by records category id

    return ({
      categories,
      records,
    });
  },
)(ListScreen);
