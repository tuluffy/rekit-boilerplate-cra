import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  <%= _.camelCase(action) %>,
  do<%= _.pascalCase(action) %>,
  reducer
} from '@src/features/<%= feature %>/redux/<%= action %>';


describe('<%= feature %>/redux/<%= action %>', () => {

});