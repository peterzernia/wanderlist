import React from 'react'
import { shallow } from 'enzyme'
import { DotLoader } from 'react-spinners'
import { Layout } from '../Layout'
import Error from '../../components/Error'
import Success from '../../components/Success'

describe('<Layout />', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      fetching: false,
      success: null,
      error: null,
      history: { push: jest.fn() },
      authLogout: jest.fn(),
      authCheckState: jest.fn(),
      fetchTripReports: jest.fn(),
      fetchFeaturedTripReport: jest.fn(),
      fetchUser: jest.fn(),
      authenticated: false,
    }
    wrapper = shallow(<Layout {...props} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays loader', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0)
    wrapper.setProps({ fetching: true })
    expect(wrapper.find(DotLoader).length).toEqual(1)
  })

  it('displays error', () => {
    expect(wrapper.find(Error).length).toEqual(0)
    wrapper.setProps({ error: { message: 'Network Error' } })
    expect(wrapper.find(Error).length).toEqual(1)
  })

  it('displays success', () => {
    expect(wrapper.find(Success).length).toEqual(0)
    wrapper.setProps({ success: 'success' })
    expect(wrapper.find(Success).length).toEqual(1)
  })
})
