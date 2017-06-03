/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Navigator from 'native-navigation';

import MainScreen from './src/features/MainScreen';
import ListScreen from './src/features/ListScreen';
import SettingsScreen from './src/features/SettingsScreen';
import Tabs from './src/features/Tabs';

import AddRecordWithCategoryScreen from './src/features/AddRecordWithCategoryScreen';

Navigator.registerScreen('Home', () => MainScreen);
Navigator.registerScreen('List', () => ListScreen);
Navigator.registerScreen('Settings', () => SettingsScreen);

Navigator.registerScreen('AddRecordWithCategory', () => AddRecordWithCategoryScreen);

Navigator.registerScreen('Main', () => Tabs, { mode: 'tabs' });
