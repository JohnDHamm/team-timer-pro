import React from 'react'
import renderer from 'react-test-renderer'
import SetupHome from '../setup_home'

describe('<SetupHome />', () => {
  test('it renders correctly', () => {
    const tree = renderer.create(<SetupHome />).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
