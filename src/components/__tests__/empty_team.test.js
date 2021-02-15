import React from 'react'
import renderer from 'react-test-renderer'
import EmptyTeam from '../empty_team'

describe('<EmptyTeam />', () => {
  test('it renders correctly', () => {
    const tree = renderer.create(<EmptyTeam/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
