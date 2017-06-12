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

import ReadyButton from '../../common/components/ReadyButton';

import {
  chunk,
} from '../../common/utils';
import { connect, mapRows } from '../../db';
import { createNewRecord, updateRecord } from './actions';

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
  flex: 1;
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
  align-items: center;
  justify-content: center;
`;

const CategoryActive = styled.View`
  width: 80;
  height: 80;
  border-color: #3F607D;
  background-color: #3F607D;
  border-width: 4;
  border-radius: 40;
  align-items: center;
  justify-content: center;
`;

const ReadyWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const PlusCategory = (
  <Category
    onPress={() => Navigator.push('Category')}
  >
    <Icon name="plus" size={40} color="#3F607D" />
  </Category>
);

const createCategoryRows = (categories, currentCategoryId, chooseCategory) => {
  const plusComp = (
    PlusCategory
  );

  const categoriesComps = categories.map(({ id, icon }) => (
    id === currentCategoryId
      ? (
        <CategoryActive>
          <Icon name={icon} size={40} color="#fff" />
        </CategoryActive>
      )
      : (
        <Category
          onPress={() => chooseCategory(id)}
        >
          <Icon name={icon} size={40} color="#3F607D" />
        </Category>
      )
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
  isEdit,
  sumValue,
  changeSumValue,
  noteValue,
  changeNoteValue,
  currentCategoryId,
  chooseCategory,
  categories,
  createRecord,
  updateRecord,
  closeScreen,
}) => (
  <Navigator.Config
    title={`${isEdit ? 'Редактировать' : 'Добавить'} ${isCost ? 'доход' : 'расход'}`}
    titleColor="#fff"
    translucent
    leftImage={require('../../../images/nav-back-icon.png')}
    leftTintColor="#fff"
    onLeftPress={closeScreen}
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
              categories,
              currentCategoryId,
              chooseCategory,
            )
          }
        </CategoriesInner>
        <ReadyWrapper>
          <ReadyButton
            disabled={
              sumValue === '' ||
              currentCategoryId == null
            }
            onPress={isEdit ? updateRecord : createRecord}
          >
            Готово
          </ReadyButton>
        </ReadyWrapper>
      </CategoriesWrapper>
    </Wrapper>
  </Navigator.Config>
);

class AddRecordWithCategoryScreenWrap extends Component {
  constructor({ id, amount, type, note, category }) {
    super();

    this.state = {
      sum: (amount || '').toString(),
      note: note || '',
      categoryId: category || null,
    };
  }

  changeSum = (sum) => { this.setState({ sum }) }
  changeNote = (note) => { this.setState({ note }) }
  chooseCategory = (categoryId) => this.setState({ categoryId })

  createRecord = () => {
    const {
      sum, note, categoryId,
    } = this.state;

    createNewRecord(
      this.props.isCost ? 'income' : 'cost',
      sum,
      note,
      categoryId,
    ).then(this.closeScreen);
  }

  updateRecord = () => {
    const {
      sum, note, categoryId,
    } = this.state;
    const { id } = this.props;

    updateRecord(
      id,
      sum,
      note,
      categoryId,
    ).then(this.closeScreen);
  }

  closeScreen() {
    Navigator.dismiss();
  }

  render() {
    return (
      <AddRecordWithCategoryScreen
        isEdit={this.props.id != null}
        sumValue={this.state.sum}
        changeSumValue={this.changeSum}
        noteValue={this.state.note}
        changeNoteValue={this.changeNote}
        currentCategoryId={this.state.categoryId}
        chooseCategory={this.chooseCategory}
        createRecord={this.createRecord}
        updateRecord={this.updateRecord}
        closeScreen={this.closeScreen}
        {...this.props}
      />
    );
  }
}

export default connect(
  [
    () => "SELECT id, icon FROM Categories",
  ],
  (categoriesSet) => {
    if (categoriesSet == null) {
      return ({
        categories: [],
      });
    }

    const categories = mapRows(categoriesSet.rows);

    return ({
      categories,
    });
  },
)(AddRecordWithCategoryScreenWrap);
