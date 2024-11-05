'use strict';

require('module-alias/register');

const { createHandler } = require('@infrastructure/lambdas/createResource');
const DynamoDBRepository = require('@infrastructure/adapters/DynamoDBRepository');
const SWAPIAdapter = require('@infrastructure/adapters/SWAPIAdapter');
const { translateFields } = require('@libs/translate');
const Resource = require('@domain/entities/Resource');

jest.mock('@infrastructure/adapters/DynamoDBRepository');
jest.mock('@infrastructure/adapters/SWAPIAdapter');
jest.mock('@libs/translate');

describe('createResource Lambda', () => {
  let repositoryMock;
  let apiAdapterMock;
  let handler;
  const resourceType = 'people';
  const id = 1;
  const resource = new Resource('people', 1, {
    nombre: 'Luke Skywalker',
    altura: '172',
  });
  const data = { nombre: 'Luke Skywalker', altura: '172' };

  beforeEach(() => {
    repositoryMock = new DynamoDBRepository();
    apiAdapterMock = new SWAPIAdapter();
    handler = createHandler(repositoryMock, apiAdapterMock);

    apiAdapterMock.fetchResource = jest.fn().mockResolvedValue({
      name: 'Luke Skywalker',
      height: '172',
    });
    translateFields.mockReturnValue({
      nombre: 'Luke Skywalker',
      altura: '172',
    });
    repositoryMock.save = jest.fn().mockResolvedValue(true);
  });

  it('should return 201 when resource is saved successfully', async () => {
    const event = {
      body: JSON.stringify({
        resource: resourceType,
        id,
      }),
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Resource saved successfully');
    expect(body.savedResource).toEqual(resource);
    expect(apiAdapterMock.fetchResource).toHaveBeenCalledWith(resourceType, id);
    expect(repositoryMock.save).toHaveBeenCalledWith({
      resourceType,
      id,
      data,
    });
  });

  it('should return 400 if missing resource or id', async () => {
    const event = {
      body: JSON.stringify({
        resource: resourceType,
      }),
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe(
      'Missing resource and/or id in body'
    );
  });

  it('should return 500 if Star Wars API call fails', async () => {
    apiAdapterMock.fetchResource = jest.fn().mockResolvedValue(null);

    const event = {
      body: JSON.stringify({
        resource: resourceType,
        id,
      }),
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).message).toBe('Error saving resource');
  });

  it('should return 500 if DynamoDB save fails', async () => {
    apiAdapterMock.fetchResource = jest.fn().mockResolvedValue(data);
    translateFields.mockReturnValue({
      nombre: 'Luke Skywalker',
      altura: '172',
    });
    repositoryMock.save = jest
      .fn()
      .mockRejectedValue(new Error('DynamoDB Error'));

    const event = {
      body: JSON.stringify({
        resource: 'people',
        id: 1,
      }),
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Error saving resource');
    expect(body.error).toBe('DynamoDB Error');
  });
});
