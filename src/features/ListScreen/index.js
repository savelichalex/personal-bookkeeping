import React from 'react';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Navigator from 'native-navigation';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Header = styled(LinearGradient)`
  height: 80;
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
  padding-top: 10;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  border-bottom-width: 1;
  border-bottom-color: #ccc;
`;

const ListRowText = styled.Text`
  color: #3F607D;
  font-size: 18;
  font-weight: bold;
`;

const records = [
  { name: '1', category: 'star' },
  { name: '2', category: 'shopping-cart' },
  { name: '3', category: 'cloud' },
  { name: '4', category: 'star' },
  { name: '5', category: 'shopping-cart' },
  { name: '6', category: 'cloud' },
  { name: '7', category: 'star' },
  { name: '8', category: 'shopping-cart' },
  { name: '9', category: 'cloud' },
  { name: '10', category: 'star' },
];

const getCategories = () => (
  records.reduce((acc, { category }) => {
    if (acc.indexOf(category) === -1) {
      acc.push(category);
    }

    return acc;
  }, [])
);

const ListScreen = () => (
  <Navigator.Config
    hidden
  >
    <Wrapper>
      <Header
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={['#537895', '#09203F']}
      />
      <CategoriesWrapper>
        <Categories
          horizontal
          >
          {getCategories().map(({ name }) => (
            <Category>
              <Icon
                name={name}
                size={25}
                color="#3F607D"
                />
            </Category>
          ))}
        </Categories>
      </CategoriesWrapper>
    <List
      data={records}
      renderItem={({ item: { name } }) => (
        <ListRow>
          <ListRowText>{name}</ListRowText>
        </ListRow>
      )}
    />
    </Wrapper>
  </Navigator.Config>
);

export default ListScreen;
