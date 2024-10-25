const axios = require('axios');

/**
 * Performs an HTTP GET request to the specified URL
 *
 * @async
 * @param {string} url - The URL to send the GET request to
 * @returns {Promise<Object>} - The response data from the GET request
 * @throws Will throw an error if the request fails
 */
const get = async (url) => {
  try {
    const resp = await axios.get(url);
    const { data } = resp;

    console.log(`${url} response: `, { data });
    return data;
  } catch (error) {
    const status = error.response ? error.response.status : 'N/A';
    const statusText = error.response ? error.response.statusText : 'N/A';
    const errorMessage = error.message;
    console.error(
      `The request to ${url} failed with status ${status} (${statusText}).`,
      { message: error.message }
    );

    throw errorMessage;
  }
};

module.exports = {
  get,
};
