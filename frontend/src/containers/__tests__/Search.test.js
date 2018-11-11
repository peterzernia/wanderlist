import React from 'react'
import { mount } from 'enzyme'
import Search from '../Search'
import store from '../../store/index'

describe('<Search />', () =>{
  it('conditional rendering', () => {
    const wrapper = mount(<Search store={store} />);
    expect(wrapper.find('SearchBar').length).toEqual(1);
    expect(wrapper.find('Results').length).toEqual(0);
    /*
    issue with testing conditional rendering: https://github.com/airbnb/enzyme/issues/1163
    */
    //wrapper.setProps({ fetched: true });
    //expect(wrapper.find('SearchBar').length).toEqual(1);
    //expect(wrapper.find('Results').length).toEqual(1);
  });
});
