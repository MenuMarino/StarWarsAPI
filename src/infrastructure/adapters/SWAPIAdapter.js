const { get } = require('@libs/requests');

class SWAPIAdapter {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchResource(resourceType, id) {
    const url = `${this.baseURL}/${resourceType}/${id}/`;
    return await get(url);
  }
}

module.exports = SWAPIAdapter;
