import React, { Component } from 'react';
import { TextInput } from 'react-native';
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
  height: 216;
  background-color: white;
`;

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
      />
    );
  }
}

export default AddRecordWithCategoryScreenWrap;
