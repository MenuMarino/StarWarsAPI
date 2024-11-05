const { translations } = require('../constants/translations');

/**
 * Translates the keys of the object
 *
 * @param {Object} data - The original object
 * @returns {Object} - A new object with translated keys. If a key doesn't have a translation, it remains the same
 */
const translateFields = (data) => {
  const translatedData = {};

  for (const key in data) {
    const translatedKey = translations[key] || key;
    translatedData[translatedKey] = data[key];
  }

  return translatedData;
};

module.exports = {
  translateFields,
};
