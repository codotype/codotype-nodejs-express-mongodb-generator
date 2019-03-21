const { getPaginationParams } = require('./pagination')
const assert = require('chai').assert;

// // // //

// non_zero_query
// Should return an offset of 20
const non_zero_query = {
  page: '2',
  per_page: '10',
}

// empty_query
// Should return an offset of 0
const empty_query = {}

describe('/lib/pagination.js', () => {

  describe('non-zero page parameter present', () => {
    it('verify correct offset', () => {
      let params = getPaginationParams({ query: non_zero_query })
      assert.equal(params.offset, 20);
      assert.equal(params.page, Number(non_zero_query.page))
      assert.equal(params.per_page, Number(non_zero_query.per_page));
    });
  });

  describe('empty query', () => {
    it('verify correct offset', () => {
      let params = getPaginationParams({ query: empty_query })
      assert.equal(params.offset, 0);
      assert.equal(params.page, 0)
      assert.equal(params.per_page, 300);
    });
  });

});
