import React from 'react'
import renderer from 'react-test-renderer'
import DisciplineIcon from '../discipline_icon'

describe('<DisciplineIcon />', () => {
  const iconStyle = { width: 20, tintColor: 'green' };

  test('it renders correctly for swim', () => {
    const tree = renderer.create(<DisciplineIcon disc={'swim'} iconStyle={iconStyle} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it renders correctly for bike', () => {
    const tree = renderer.create(<DisciplineIcon disc={'bike'} iconStyle={iconStyle} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it renders correctly for run', () => {
    const tree = renderer.create(<DisciplineIcon disc={'run'} iconStyle={iconStyle} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it does not render anything for invalid discipline', () => {
    const tree = renderer.create(<DisciplineIcon disc={'walk'} iconStyle={iconStyle} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
