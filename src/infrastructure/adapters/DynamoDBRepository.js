const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ResourceRepository = require('@domain/repositories/ResourceRepository');
const { invariant } = require('@libs/invariant');

class DynamoDBRepository extends ResourceRepository {
  constructor(tableName) {
    super();
    this.tableName = tableName;
  }

  /**
   * Saves a resource in DynamoDB
   *
   * @param {string} resourceType - Type of the resource
   * @param {number} id - ID of the resource
   * @param {Object} data - The data of the resource to be saved
   * @returns {Promise<void>} - Resolves if the resource is successfully saved
   */
  async save({ resourceType, id, data }) {
    const params = {
      TableName: this.tableName,
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
  }

  /**
   * Retrieves a resource from DynamoDB by resource type and ID
   *
   * @param {string} resourceType - Type of the resource
   * @param {number} id - ID of the resource
   * @returns {Promise<Object>} - The retrieved resource
   */
  async get(resourceType, id) {
    const params = {
      TableName: this.tableName,
      Key: {
        resourceType,
        id,
      },
    };

    try {
      const result = await dynamoDB.get(params).promise();
      invariant(
        result.Item,
        `Resource ${resourceType} with id ${id} not found`
      );
      return result.Item;
    } catch (error) {
      console.error('Error fetching resource from DynamoDB:', error);
      throw error;
    }
  }

  /**
   * Retrieves all resources of a specific type from DynamoDB
   *
   * @param {string} resourceType - The type of the resources to be fetched
   * @returns {Promise<Object[]>} - A list of resources
   */
  async getAll(resourceType) {
    const params = {
      TableName: this.tableName,
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
  }
}

module.exports = DynamoDBRepository;
