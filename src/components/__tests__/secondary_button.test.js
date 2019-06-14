import React from 'react'
import renderer from 'react-test-renderer'
import SecondaryButton from '../secondary_button'

describe('<SecondaryButton />', () => {
  const label = 'save';
  const color = 'green';

  test('it renders correctly', () => {
    const tree = renderer.create(<SecondaryButton label={label} color={color} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
