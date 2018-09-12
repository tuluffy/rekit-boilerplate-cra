import { <%= selector %> } from '@src/features/<%= feature %>/redux/<%= selector %>';

describe('<%= feature %>/redux/<%= selector %>', () => {
  it('returns correct value', () => {
    const expectedResult = 'data';
    expect(<%= selector %>({ data: 'data' })).toEqual(expectedResult);
  });
});