import React from 'react'
import renderer from 'react-test-renderer'
import ResultDetailHeader from '../result_detail_header'

describe('<ResultDetailHeader />', () => {
  const workout = {
    discipline: 'swim',
    description: 'Jun 13 - 4 x 100yd'
  };

  test('it renders correctly', () => {
    const tree = renderer.create(<ResultDetailHeader workout={workout}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
