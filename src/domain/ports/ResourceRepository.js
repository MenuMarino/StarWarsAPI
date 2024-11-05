// Abstract class

class ResourceRepository {
  save(resource) {
    throw new Error('Method not implemented');
  }
  get(resourceType, id) {
    throw new Error('Method not implemented');
  }
  getAll(resourceType) {
    throw new Error('Method not implemented');
  }
}

module.exports = ResourceRepository;
