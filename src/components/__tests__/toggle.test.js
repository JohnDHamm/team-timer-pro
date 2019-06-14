import React from 'react'
import renderer from 'react-test-renderer'
// import Toggle from '../toggle'

describe('<Toggle />', () => {
  const labels = ["left", "right"];
  // jest.mock('expo-haptics', () => 'Haptics');

  // test('it renders correctly', () => {
  //   const tree = renderer.create(<Toggle labels={labels} selected={0} />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  test('test placeholder', () => {
    expect(true).toBe(true)
  })
});
