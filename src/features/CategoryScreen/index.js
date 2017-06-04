import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import styled from 'styled-components/native';
import Navigator from 'native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Form = {
  Wrapper: styled(LinearGradient)`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-top: 50;
  `,
  Inner: styled.View`
    height: 120;
    flex-direction: column;
    justify-content: space-between;
  `,
  InputWrapper: styled.View`
    border-bottom-width: 1;
    border-bottom-color: white;
  `,
  Input: styled(TextInput)`
    height: 40;
    width: 200;
    color: white;
    font-weight: bold;
  `,
};

const Icons = {
  Wrapper: styled.View`
    flex: 3;
    flex-direction: column;
    padding-top: 20;
    padding-bottom: 20;
    padding-left: 20;
    padding-right: 20;
  `,
  SearchWrapper: styled.View`
    border: 1px solid #979797;
    border-radius: 20;
    flex-direction: row;
    padding-top: 10;
    padding-bottom: 10;
    padding-left: 10;
    padding-right: 10;
  `,
  SearchInput: styled(TextInput)`
    flex: 1,
    color: #979797;
    font-size: 14;
    height: 20
  `,
}

const CategoryScreen = ({
  titleValue,
  changeTitle,
}) => (
  <Navigator.Config
    title="Добавить категорию"
    titleColor="#fff"
    translucent
    leftImage={require('../../../images/nav-back-icon.png')}
    leftTintColor="#fff"
    onLeftPress={() => Navigator.pop()}
    hidden={false}
  >
    <Wrapper>
      <Form.Wrapper
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={['#537895', '#09203F']}
      >
        <Form.Inner>
          <Form.InputWrapper>
            <Form.Input
              value={titleValue}
              onChangeText={changeTitle}
              placeholder="Название категории"
              placeholderTextColor="rgba(255,255,255,.5)"
            />
          </Form.InputWrapper>
        </Form.Inner>
      </Form.Wrapper>
      <Icons.Wrapper>
        <Icons.SearchWrapper>
          <Icon
            name="search"
            color="#979797"
            size={18}
          />
        </Icons.SearchWrapper>
      </Icons.Wrapper>
    </Wrapper>
  </Navigator.Config>
);

class CategoryScreenWrap extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
    };
  }

  changeTitle = (title) => { this.setState({ title }) }

  render() {
    return (
      <CategoryScreen
        titleValue={this.state.title}
        changeTitle={this.changeTitle}
        {...this.props}
      />
    );
  }
}

export default CategoryScreenWrap;
