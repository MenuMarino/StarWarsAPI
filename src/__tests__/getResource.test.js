'use strict';

require('module-alias/register');

const { getHandler } = require('@infrastructure/lambdas/getResource');
const DynamoDBRepository = require('@infrastructure/adapters/DynamoDBRepository');

jest.mock('@infrastructure/adapters/DynamoDBRepository');

describe('getResource Lambda', () => {
  let repositoryMock;
  let handler;
  const resourceType = 'people';
  const id = 1;
  const multipleResources = [
    { resourceType, id: 1, data: { name: 'Luke Skywalker' } },
    { resourceType, id: 2, data: { name: 'Darth Vader' } },
  ];

  beforeEach(() => {
    repositoryMock = new DynamoDBRepository();
    handler = getHandler(repositoryMock);

    repositoryMock.get = jest.fn().mockResolvedValue({
      resourceType,
      id,
      data: { name: 'Luke Skywalker' },
    });
    repositoryMock.getAll = jest.fn().mockResolvedValue(multipleResources);
  });

  it('should fetch a specific resource if id is provided', async () => {
    const data = await handler({
      queryStringParameters: {
        resource: resourceType,
        id,
      },
    });

    expect(data.statusCode).toBe(200);
    const body = JSON.parse(data.body);
    expect(body.message).toBe('Resources fetched successfully');
    expect(body.data).toEqual({
      resourceType,
      id,
      data: { name: 'Luke Skywalker' },
    });
    expect(repositoryMock.get).toHaveBeenCalledWith(resourceType, 1);
  });

  it('should fetch all resources if no id is provided', async () => {
    const data = await handler({
      queryStringParameters: {
        resource: resourceType,
      },
    });

    expect(data.statusCode).toBe(200);
    const body = JSON.parse(data.body);
    expect(body.message).toBe('Resources fetched successfully');
    expect(body.data).toEqual(multipleResources);
    expect(repositoryMock.getAll).toHaveBeenCalledWith(resourceType);
  });

  it('should return 400 if resource is missing', async () => {
    const response = await handler({
      queryStringParameters: {},
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe(
      'Missing resource in query parameters'
    );
  });

  it('should return 500 if there is no resources created', async () => {
    repositoryMock.getAll = jest
      .fn()
      .mockRejectedValue(new Error('No data found for resource type: people'));

    const response = await handler({
      queryStringParameters: {
        resource: resourceType,
      },
    });

    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Error fetching resources');
    expect(body.error).toBe('No data found for resource type: people');
  });
});
