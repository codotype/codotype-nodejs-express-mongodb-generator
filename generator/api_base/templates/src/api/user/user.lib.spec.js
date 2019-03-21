const assert = require('chai').assert;
const User = require('./user.model');
const {
  encryptPassword,
  generatePasswordResetToken,
  setHashedPassword,
  validateEmail,
  validatePresenceOf,
  validateResetToken,
  verifyPassword,
} = require('./user.lib')
const { buildUser } = require('../../../test/mocks');

// // // //

describe('/lib/user.lib.js', () => {

  describe('encryptPassword', () => {
    it('return the same result with if arguments do not change', () => {
      let expected = encryptPassword('PASSWRD', 'SALT')
      assert.equal(encryptPassword('PASSWRD', 'SALT'), expected)
    });

    it('return different results if arguments change', () => {
      let expected = encryptPassword('PASSWRD', 'SALT')
      assert.notEqual(encryptPassword('CHANGED-PASSWRD', 'CHANGED-SALT'), expected)
    });

    it('return null if both arguments are missing', () => {
      assert.equal(encryptPassword('', ''), null)
    });

    it('return null if password is missing', () => {
      assert.equal(encryptPassword('', 'SALT'), null)
    });

    it('return null if salt is missing', () => {
      assert.equal(encryptPassword('PASSWRD', ''), null)
    });
  });


  describe('generatePasswordResetToken', () => {
    let user = new User(buildUser())

    // Destroys user record
    after(() => {
      return User.deleteOne({ email: user.email })
    });

    it('set user.password_reset_token and user.password_reset_expiration', () => {
      assert.isFalse(!!user.password_reset_token)
      assert.isFalse(!!user.password_reset_expiration)
      user.generatePasswordResetToken()
      .then(() => {
        assert.isTrue(!!user.password_reset_token)
        assert.isTrue(!!user.password_reset_expiration)
      })
    });
  });


  describe('setHashedPassword', () => {
    let userData = buildUser()
    let user = new User(userData)
    it('encrypt password and assign result to user.password', () => {
      setHashedPassword.call(user, () => {
        const expected = encryptPassword(userData.password, user.salt)
        assert.equal(user.password, expected)
      });
    })
  });


  describe('validateEmail', () => {
    it('return true with valid email address', () => {
      assert.equal(validateEmail('john@doe.com'), true)
    });

    it('return false with invalid email address', () => {
      assert.equal(validateEmail('not-an-email-address.com'), false)
    });
  });


  describe('validatePresenceOf', () => {
    it('return true if value exists and is not null', () => {
      assert.equal(validatePresenceOf('DEFINITELY-VALID'), true)
    });

    it('return false if value empty string', () => {
      assert.equal(validatePresenceOf(''), false)
    });

    it('return false if value is null', () => {
      assert.equal(validatePresenceOf(null), false)
    });

    it('return false if value is undefined', () => {
      assert.equal(validatePresenceOf(undefined), false)
    });
  });


  describe('validateResetToken', () => {
    let user = new User(buildUser())
    user.generatePasswordResetToken()

    // Destroys user record
    after(() => {
      return User.deleteOne({ email: user.email })
    });

    it('return true if matching tokens and current time is before expiration date', () => {
      assert.equal(user.validateResetToken(user.password_reset_token), true)
    });

    it('return false if tokens do not match', () => {
      assert.equal(user.validateResetToken('not-a-valid-token'), false)
    });

    it('return false if current time is after expiration', () => {
      const yesterday = new Date(); // All my troubles seemed so far away
      yesterday.setDate(yesterday.getDate() - 1);
      user.password_reset_expiration = yesterday

      assert.equal(user.validateResetToken(user.password_reset_token), false)
    });
  });


  describe('verifyPassword', () => {
    let userData = buildUser()
    let user = new User(buildUser())
    user.salt = 'SALT'
    user.password = encryptPassword(userData.password, user.salt)

    it('return true if encrypted passwords match', () => {
      assert.equal(user.verifyPassword(userData.password), true)
    });

    it('return false if encrypted passwords do not match', () => {
      assert.equal(user.verifyPassword('not-a-valid-password'), false)
    });
  });


});
