import React from 'react'
import { mount } from 'enzyme'
import Search from '../Search'
import store from '../../store/index'
import Results from '../../components/Results'

describe('<Search />', () =>{
  it('renders no results initially', () => {
    const wrapper = mount(<Search store={store} />);
    expect(wrapper.find('SearchBar').length).toEqual(1);
    expect(wrapper.find('Results').length).toEqual(0);
  });
  //it('renders results after search', () => {
    //const wrapper = mount(<Search store={store} />);
    //wrapper.setProps({ fetched: true });
    //console.log(wrapper.prop('fetched'))
    //expect(wrapper.find('SearchBar').length).toEqual(1);
    //expect(wrapper.find('Results').length).toEqual(1);
  //});
});
