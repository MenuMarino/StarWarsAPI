const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * Saves a resource in DynamoDB
 *
 * @async
 * @param {string} tableName - The name of the DynamoDB table
 * @param {string} resourceType - Type of the resource
 * @param {number} id - ID of the resource
 * @param {Object} data - The data of the resource to be saved
 * @throws Will throw an error if the resource cannot be saved to DynamoDB
 * @returns {Promise<void>} - Resolves if the resource is successfully saved
 */
const saveResource = async (tableName, resourceType, id, data) => {
  const params = {
    TableName: tableName,
    Item: {
      resourceType,
      id,
      data,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log(`Resource ${resourceType} with id ${id} saved to DynamoDB`);
  } catch (error) {
    console.error('Error saving resource to DynamoDB:', error);
    throw error;
  }
};

/**
 * Retrieves a resource from DynamoDB by resource type and ID
 *
 * @async
 * @param {string} tableName - The name of the DynamoDB table
 * @param {string} resourceType - Type of the resource
 * @param {number} id - ID of the resource
 * @throws Will throw an error if the resource cannot be fetched from DynamoDB or if the resource is not found
 * @returns {Promise<Object>} - The retrieved resource
 */
const getResource = async (tableName, resourceType, id) => {
  const params = {
    TableName: tableName,
    Key: {
      resourceType,
      id,
    },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    if (!result.Item) {
      throw new Error(`Resource ${resourceType} with id ${id} not found`);
    }
    return result.Item;
  } catch (error) {
    console.error('Error fetching resource from DynamoDB:', error);
    throw error;
  }
};

/**
 * Retrieves all resources of a specific type from DynamoDB
 *
 * @async
 * @param {string} tableName - The name of the DynamoDB table
 * @param {string} resourceType - The type of the resources to be fetched
 * @throws Will throw an error if the resources cannot be fetched from DynamoDB
 * @returns {Promise<Object[]>} - A list of resources
 */
const getAllResources = async (tableName, resourceType) => {
  const params = {
    TableName: tableName,
    FilterExpression: 'resourceType = :resourceType',
    ExpressionAttributeValues: { ':resourceType': resourceType },
  };

  try {
    const result = await dynamoDB.scan(params).promise();
    return result.Items || [];
  } catch (error) {
    console.error('Error fetching all resources from DynamoDB:', error);
    throw error;
  }
};

module.exports = {
  saveResource,
  getResource,
  getAllResources,
};
