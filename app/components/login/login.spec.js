import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import chai from 'chai';
import LoginComponent from './Login.jsx';

const should = chai.should();

describe('<Login />', () => {
  it('renders div with className login', () => {
    const component = TestUtils.renderIntoDocument(
      <LoginComponent />
    );

    const div = TestUtils.findRenderedDOMComponentWithClass(component, 'login');

    should.exist(div);
  });
});
