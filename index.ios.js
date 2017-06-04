/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Navigator from 'native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import MainScreen from './src/features/MainScreen';
import ListScreen from './src/features/ListScreen';
import SettingsScreen from './src/features/SettingsScreen';
import Tabs from './src/features/Tabs';

import AddRecordWithCategoryScreen from './src/features/AddRecordWithCategoryScreen';
import CategoryScreen from './src/features/CategoryScreen';

Icon.loadFont('FontAwesome.ttf');

Navigator.registerScreen('Home', () => MainScreen);
Navigator.registerScreen('List', () => ListScreen);
Navigator.registerScreen('Settings', () => SettingsScreen);

Navigator.registerScreen('AddRecordWithCategory', () => AddRecordWithCategoryScreen);
Navigator.registerScreen('Category', () => CategoryScreen);

Navigator.registerScreen('Main', () => Tabs, { mode: 'tabs' });
