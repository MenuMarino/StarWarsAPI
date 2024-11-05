require('module-alias/register');

const ResourceService = require('@domain/services/ResourceService');
const DynamoDBRepository = require('@infrastructure/adapters/DynamoDBRepository');

const SWResourcesTable = process.env.SW_DYNAMODB_TABLE;

const getHandler = (repository = new DynamoDBRepository(SWResourcesTable)) => {
  const service = new ResourceService(repository);

  return async (event) => {
    const { resource, id } = event.queryStringParameters || {};

    if (!resource) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing resource in query parameters',
        }),
      };
    }

    try {
      const data = id
        ? await service.getResourceById(resource, parseInt(id))
        : await service.getResources(resource);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Resources fetched successfully',
          data,
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Error fetching resources',
          error: error.message,
        }),
      };
    }
  };
};

module.exports.handler = getHandler();
module.exports.getHandler = getHandler;
