/**
 * Use for check the validness of the condition and throw an error in case otherwise
 *
 * @param {boolean} condition - Condition to validate
 * @param {string} message - Message in case of error
 * @returns {void}
 * @throws Will throw an error if the condition is not valid
 */

const invariant = (condition, message) => {
  if (condition) {
    return;
  }
  throw new Error(message);
};

module.exports = {
  invariant,
};
