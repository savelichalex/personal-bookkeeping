import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import styled from 'styled-components/native';
import Navigator from 'native-navigation';
import LinearGradient from 'react-native-linear-gradient';

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

const CategoriesWrapper = styled.View`
  height: 300;
  background-color: white;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 20;
  padding-left: 10;
  padding-bottom: 20;
  padding-right: 10;
`;

const CategoriesInner = styled(ScrollView)`
  flex: 3;
  margin-bottom: 10;
`;

const CategoriesRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20;
`;

const Category = styled(TouchableOpacity)`
  width: 80;
  height: 80;
  border-color: #3F607D;
  border-width: 4;
  border-radius: 40;
  border-style: dashed;
`;

const ReadyWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const Spacer = styled.View`
  flex: 0.3;
`;

const ReadyButton = styled(TouchableOpacity)`
  flex: 0.4;
  border: 2px solid #3F607D;
  border-radius: 50;
  align-items: center;
  justify-content: center;
`;

const ReadyButtonText = styled.Text`
  color: #3F607D;
  font-size: 18;
  font-weight: bold;
`;

const PlusCategory = Category;

const chunk = (arr, len) => {
  const chunks = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
};

const createCategoryRows = (categories) => {
  const plusComp = (
    <PlusCategory />
  );

  const categoriesComps = categories.map(() => (
    <Category />
  ));

  return chunk(
    [plusComp].concat(categoriesComps),
    4
  ).map(items => (
    <CategoriesRow>
      {items}
    </CategoriesRow>
  ));
}

const AddRecordWithCategoryScreen = ({
  isCost,
  sumValue,
  changeSumValue,
  noteValue,
  changeNoteValue,
}) => (
  <Navigator.Config
    title={`Добавить ${isCost ? 'доход' : 'расход'}`}
    titleColor="#fff"
    translucent
    leftImage={require('../../../images/nav-back-icon.png')}
    leftTintColor="#fff"
    onLeftPress={() => Navigator.dismiss()}
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
              keyboardType="numeric"
              value={sumValue}
              onChangeText={changeSumValue}
              placeholder="Сумма"
              placeholderTextColor="rgba(255,255,255,.5)"
            />
          </Form.InputWrapper>
          <Form.InputWrapper>
            <Form.Input
              value={noteValue}
              onChangeText={changeNoteValue}
              placeholder="Примечание"
              placeholderTextColor="rgba(255,255,255,.5)"
            />
          </Form.InputWrapper>
        </Form.Inner>
      </Form.Wrapper>
      <CategoriesWrapper>
        <CategoriesInner
          showsVerticalScrollIndicator={false}
        >
          {
            createCategoryRows(
              [1,1,1,1,1,1,1]
            )
          }
        </CategoriesInner>
        <ReadyWrapper>
          <Spacer />
          <ReadyButton>
            <ReadyButtonText>Готово</ReadyButtonText>
          </ReadyButton>
          <Spacer />
        </ReadyWrapper>
      </CategoriesWrapper>
    </Wrapper>
  </Navigator.Config>
);

class AddRecordWithCategoryScreenWrap extends Component {
  constructor() {
    super();

    this.state = {
      sum: '',
      note: '',
    };
  }

  changeSum = (sum) => { this.setState({ sum }) }
  changeNote = (note) => { this.setState({ note }) }

  render() {
    return (
      <AddRecordWithCategoryScreen
        sumValue={this.state.sum}
        changeSumValue={this.changeSum}
        noteValue={this.state.note}
        changeNoteValue={this.changeNote}
        {...this.props}
      />
    );
  }
}

export default AddRecordWithCategoryScreenWrap;
