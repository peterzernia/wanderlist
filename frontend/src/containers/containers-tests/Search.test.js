import React from 'react'
import { shallow } from 'enzyme'
import Search from '../Search'
import SearchBar from '../../components/SearchBar'
import Results from '../../components/Results'
import store from "../../store/index"

describe('<Search />', () =>{
  it('renders no results initially', () => {
    const wrapper = shallow(<Search store={store} />);
    //expect(wrapper.find('SearchBar').length).toEqual(1);
    expect(wrapper.find('Results').length).toEqual(0);
  });
  //it('renders results after search', () => {
    //const fetched = true;
    //const wrapper = shallow(<Search store={store} fetched={fetched}/>);
    //console.log(wrapper.prop('fetched'))
    //expect(wrapper.find('SearchBar').length).toEqual(1);
    //expect(wrapper.find('Results').length).toEqual(1);
  });
});
