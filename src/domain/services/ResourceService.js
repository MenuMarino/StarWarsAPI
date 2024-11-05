const Resource = require('../../domain/entities/Resource');
const { translateFields } = require('../../libs/translate');

class ResourceService {
  constructor(repository, apiAdapter) {
    this.repository = repository;
    this.apiAdapter = apiAdapter;
  }

  async createResource(resourceType, id) {
    const data = await this.apiAdapter.fetchResource(resourceType, id);
    const translatedData = translateFields(data);
    const resource = new Resource(resourceType, id, translatedData);
    await this.repository.save(resource);
    return resource;
  }

  async getResource(resourceType, id) {
    if (id) {
      const data = await this.repository.get(resourceType, id);
      return new Resource(data.resourceType, data.id, data.data);
    }
    const allData = await this.repository.getAll(resourceType);
    return allData.map(
      (item) => new Resource(item.resourceType, item.id, item.data)
    );
  }
}

module.exports = ResourceService;
