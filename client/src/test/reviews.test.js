/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import Reviews from '../components/Reviews';
import ReviewList from '../components/ReviewList';
import ReviewEntry from '../components/ReviewEntry';
import Title from '../components/styles/styles.jsx';
import exampleData from './reviews.example';

describe('Renders components successfully', () => {
  test('should render the Reviews component', () => {
    mount(<Reviews />);
    expect(shallow(<Reviews />).containsMatchingElement(<Title />)).toEqual(true);
  });

  test('loads ReviewList component', () => {
    expect(shallow(<ReviewList allReviews={exampleData} />).exists()).toBe(true);
  });

  test('loads ReviewEntry component', () => {
    expect(shallow(<ReviewEntry review={exampleData[0]} />).exists()).toBe(true);
  });
});
