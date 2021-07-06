import { formatRating } from './store-util-formatters';

describe('formatRating', () => {
  it('should work', () => {
    expect(formatRating(0.123879123)).toEqual('1.2 / 10');
  });
});
