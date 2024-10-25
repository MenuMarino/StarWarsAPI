const { getResource, getAllResources } = require('../libs/dynamodb');

const SWResourcesTable = process.env.SW_DYNAMODB_TABLE;

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
    const data = id
      ? await getResource(SWResourcesTable, resource, parseInt(id))
      : await getAllResources(SWResourcesTable, resource);

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
