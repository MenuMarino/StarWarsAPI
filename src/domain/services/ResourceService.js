const Resource = require('@domain/entities/Resource');
const { translateFields } = require('@libs/translate');
const { invariant } = require('@libs/invariant');

class ResourceService {
  constructor(repository, apiAdapter) {
    this.repository = repository;
    this.apiAdapter = apiAdapter;
  }

  async createResource(resourceType, id) {
    const data = await this.apiAdapter.fetchResource(resourceType, id);
    invariant(data, 'The request to the Star Wars API failed.');
    const translatedData = translateFields(data);
    const resource = new Resource(resourceType, id, translatedData);
    await this.repository.save(resource);
    return resource;
  }

  async getResourceById(resourceType, id) {
    const data = await this.repository.get(resourceType, id);
    invariant(
      data,
      `No data found for id: ${id} and resource type: ${resourceType}`
    );
    return new Resource(data.resourceType, data.id, data.data);
  }

  async getResources(resourceType) {
    const allData = await this.repository.getAll(resourceType);
    invariant(
      allData && allData.length > 0,
      `No data found for resource type: ${resourceType}`
    );

    return allData.map(
      (item) => new Resource(item.resourceType, item.id, item.data)
    );
  }
}

module.exports = ResourceService;
