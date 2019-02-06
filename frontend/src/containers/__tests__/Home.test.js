import React from 'react'
import { shallow } from 'enzyme'
import { Home } from '../Home'
import { DotLoader } from 'react-spinners'
import { tripReport } from '../../testVariables'
import TripReportTruncated from '../../components/TripReportTruncated'

describe('<Home />', () =>{
  let wrapper;
  const e = { preventDefault: jest.fn(), currentTarget: { id: 1 } };
  const toggleFavorite = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Home
        tripReport={null} toggleFavorite={toggleFavorite}
      />
    )
  });

  it('displays loader', () => {
    expect(wrapper.find(DotLoader).length).toEqual(1);
    wrapper.setProps({ tripReport: [tripReport] })
    expect(wrapper.find(DotLoader).length).toEqual(0);
  });
  it('displays featured tripReport', () => {
    expect(wrapper.find(TripReportTruncated).length).toEqual(0);
    wrapper.setProps({ tripReport: [tripReport] })
    expect(wrapper.find(TripReportTruncated).length).toEqual(1);
  });
  it('handleClick calls toggleFavorite', () => {
    wrapper.instance().handleClick(e)
    expect(toggleFavorite).toHaveBeenCalledTimes(1);
  });
});
