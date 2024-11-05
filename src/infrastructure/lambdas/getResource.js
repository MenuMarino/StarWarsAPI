const ResourceService = require('../../domain/services/ResourceService');
const DynamoDBRepository = require('../../infrastructure/adapters/DynamoDBRepository');

const SWResourcesTable = process.env.SW_DYNAMODB_TABLE;

const repository = new DynamoDBRepository(SWResourcesTable);
const service = new ResourceService(repository);

module.exports.handler = async (event) => {
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
    const data = await service.getResource(resource, id ? parseInt(id) : null);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Resources fetched successfully', data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error fetching resources',
        error: error.message,
      }),
    };
  }
};
