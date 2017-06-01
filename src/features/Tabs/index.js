import React, { Component } from 'react';
import { TabBar, Tab } from 'native-navigation';

const TabScreen = () => (
  <TabBar
    elevation={20}
    barTintColor="#193352"
    tintColor="#ffffff"
  >
    <Tab
      route={'Home'}
      title="Кошелек"
      image={require('../../../images/home-icon.png')}
    />
    <Tab
      route={'List'}
      title="Список"
      image={require('../../../images/list-icon.png')}
    />
    <Tab
      route={'Settings'}
      title="Настройки"
      image={require('../../../images/settings-icon.png')}
    />
  </TabBar>
);

export default TabScreen;
