import React from 'react'
import { shallow } from 'enzyme'
import Search from '../Search'
import store from "../../store/index"
import { Provider } from 'react-redux'

describe('<Search />', () =>{
  it('renders no results initially', () => {
    const wrapper = shallow(<Search store={store} />);
    expect(wrapper.find('Results').length).toEqual(0);
  });
  it('renders results after search', () => {
    const countryFetched = true;
    const wrapper = shallow(<Search store={store}
                                    countryFetched={countryFetched}/>);
    expect(wrapper.find('Results').length).toEqual(0);
  });
});
