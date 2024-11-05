const ResourceService = require('../../domain/services/ResourceService');
const DynamoDBRepository = require('../../infrastructure/adapters/DynamoDBRepository');
const SWAPIAdapter = require('../../infrastructure/adapters/SWAPIAdapter');

const SW_BASE_URL = process.env.SW_API;
const SWResourcesTable = process.env.SW_DYNAMODB_TABLE;

const repository = new DynamoDBRepository(SWResourcesTable);
const apiAdapter = new SWAPIAdapter(SW_BASE_URL);
const service = new ResourceService(repository, apiAdapter);

module.exports.handler = async (event) => {
  const { resource, id } = JSON.parse(event.body);

  if (!resource || !id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing resource and/or id in body' }),
    };
  }

  try {
    const savedResource = await service.createResource(resource, id);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Resource saved successfully',
        savedResource,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error saving resource',
        error: error.message,
      }),
    };
  }
};
