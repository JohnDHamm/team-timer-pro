import React from 'react'
import renderer from 'react-test-renderer'
import Separator from '../separator'

describe('<Separator />', () => {
  const width = 150;
  const color = 'green';

  test('it renders correctly', () => {
    const tree = renderer.create(<Separator width={width} color={color} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
