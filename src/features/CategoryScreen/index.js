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
import IconGlyphs from 'react-native-vector-icons/glyphmaps/FontAwesome.json';

import ReadyButton from '../../common/components/ReadyButton';

import {
  chunk,
} from '../../common/utils';

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
    height: 80;
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
  SwitchWrapper: styled.View`
    width: 200;
    flex-direction: row;
    justify-content: space-between;
  `,
  SwitchTitle: styled.Text`
    color: rgba(255,255,255,.5);
    background-color: transparent;
  `,
};

const Icons = {
  Wrapper: styled.View`
    flex: 3;
    flex-direction: column;
  `,
  SearchWrapper: styled.View`
    border: 1px solid #979797;
    border-radius: 20;
    flex-direction: row;
    padding-top: 10;
    padding-bottom: 10;
    padding-left: 10;
    padding-right: 10;
    margin-top: 20;
    margin-bottom: 20;
    margin-left: 20;
    margin-right: 20;
  `,
  SearchInput: styled(TextInput)`
    flex: 1;
    margin-left: 10;
    color: #979797;
    font-size: 14;
    height: 20
  `,
  List: styled(ScrollView)`
    flex: 1;
    flex-direction: column;
    margin-bottom: 20;
    padding-left: 20;
    padding-right: 20;
  `,
  Row: styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10;
  `,
  Cell: styled(TouchableOpacity)`
    width: 66;
    height: 66;
    border-radius: 33;
    border-width: 2;
    border-color: #3F607D;
    align-items: center;
    justify-content: center;
  `,
  CellActive: styled.View`
    width: 66;
    height: 66;
    border-radius: 33;
    border-width: 2;
    border-color: #3F607D;
    background-color: #3F607D;
    align-items: center;
    justify-content: center;
  `,
  ReadyButton: styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20;
  `,
}

const CategoryScreen = ({
  titleValue,
  changeTitle,
  searchValue,
  changeSearch,
  icons,
  activeIcon,
  setActiveIcon,
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
          <Form.SwitchWrapper>
            <Form.SwitchTitle>
              Учитывать в балансе
            </Form.SwitchTitle>
          </Form.SwitchWrapper>
        </Form.Inner>
      </Form.Wrapper>
      <Icons.Wrapper>
        <Icons.SearchWrapper>
          <Icon
            name="search"
            color="#979797"
            size={18}
          />
          <Icons.SearchInput
            value={searchValue}
            onChangeText={changeSearch}
          />
        </Icons.SearchWrapper>
        <Icons.List>
          {icons.map((row) => (
            <Icons.Row>
              {row.map((icon) => (
                icon === activeIcon
                  ? (
                    <Icons.CellActive>
                      <Icon
                        name={icon}
                        size={25}
                        color="#fff"
                      />
                    </Icons.CellActive>
                  )
                  : (
                    <Icons.Cell
                      onPress={() => setActiveIcon(icon)}
                    >
                      <Icon
                        name={icon}
                        size={25}
                        color="#3F607D"
                      />
                    </Icons.Cell>
                  )
              ))}
            </Icons.Row>
          ))}
       </Icons.List>
       <Icons.ReadyButton>
         <ReadyButton
           disabled={titleValue === '' || activeIcon == null}
         >Сохранить</ReadyButton>
       </Icons.ReadyButton>
      </Icons.Wrapper>
    </Wrapper>
  </Navigator.Config>
);

const iconGlyphsKeys = Object.keys(IconGlyphs);

class CategoryScreenWrap extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      search: '',
      icons: iconGlyphsKeys,
      activeIcon: null,
    };
  }

  changeTitle = (title) => { this.setState({ title }) }

  changeSearch = (search) => {
    const predicate = search.trim().toLowerCase();
    const predicateRegExp = new RegExp(`^${predicate}`);
    // TODO: add debounce for filter
    const icons = iconGlyphsKeys.filter(item => (
      predicateRegExp.test(item)
    ));

    this.setState({
      search,
      icons,
    });
  }

  setActiveIcon = (icon) => {
    this.setState({
      activeIcon: icon,
    });
  }

  render() {
    return (
      <CategoryScreen
        titleValue={this.state.title}
        changeTitle={this.changeTitle}
        searchValue={this.state.search}
        changeSearch={this.changeSearch}
        icons={chunk(this.state.icons, 4)}
        activeIcon={this.state.activeIcon}
        setActiveIcon={this.setActiveIcon}
        {...this.props}
      />
    );
  }
}

export default CategoryScreenWrap;
