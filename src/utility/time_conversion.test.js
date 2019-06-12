import TimeConversion from './time_conversion'

describe('converting time in ms to a readout of H:MM:SS.s', () => {
  test('given no hours or minutes and double-digit seconds returns M:SS.s', () => {
    expect(TimeConversion(10000)).toBe('0:10.0');
  });

  test('given no hours, single-digit minutes and single-digit secs with 3 place decimal returns M:SS.s', () => {
    expect(TimeConversion(245333)).toBe('4:05.3');
  });

  test('given 1 hour and single-digit minutes and single-digit secs with 3 place decimal returns H:MM:SS.s', () => {
    expect(TimeConversion(3845667)).toBe('1:04:05.7');
  });

  test('given 1 hour and double-digit minutes and double-digit secs returns H:MM:SS.s', () => {
    expect(TimeConversion(6135000)).toBe('1:42:15.0');
  });
});
