const { get } = require('../libs/requests');
const { saveResource } = require('../libs/dynamodb');
const { translateFields } = require('../libs/translate');

const SW_BASE_URL = process.env.SW_API;
const SWResourcesTable = process.env.SW_DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  const { resource, id } = JSON.parse(event.body);

  try {
    if (!resource || !id) throw Error('Missing resource and/or id in body');

    const data = await get(`${SW_BASE_URL}/${resource}/${id}/`);
    if (!data) throw Error('The request to the Star Wars API failed.');

    const translatedData = translateFields(data);
    await saveResource(SWResourcesTable, resource, id, translatedData);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Resource saved successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving resource', error }),
    };
  }
};
