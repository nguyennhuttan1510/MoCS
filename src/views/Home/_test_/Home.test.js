import React from 'react';
import Home from '../Home';

import { mount, shallow } from 'enzyme';
import { AppContext } from 'layouts/AppContext';
import toJson from 'enzyme-to-json';

describe('Home', () => {
  it('should be render', () => {
    const wrapper = shallow(
      <AppContext.Provider>
        <Home />
      </AppContext.Provider>
    );
    console.log(wrapper.debug());
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
