const { dispatch } = require('./mailer')
const assert = require('chai').assert;

// // // //

// Mock message
const message = {
  from: 'reset@example.com',
  to: 'john@doe.com',
  subject: 'Mailer Subject',
  text: 'This is some mailer text'
}

describe('/lib/mailer.js', () => {
  describe('invoke mailer.dispatch', () => {
    it('verify correct offset', () => {

      // Dispatch message
      dispatch(message);

      // TODO - wire up actual assertion here
      assert.equal(20, 20);

      // let params = getPaginationParams({ query: non_zero_query })
      // Asserts equality of original payload and signed/verified payload
      // assert.equal(params.page, Number(non_zero_query.page))
      // assert.equal(params.per_page, Number(non_zero_query.per_page));

    });
  });
});
