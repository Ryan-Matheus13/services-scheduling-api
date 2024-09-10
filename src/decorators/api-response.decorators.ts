import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

// POST
export function ApiPostResponse<T>(model: Type<T>) {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'Created Successfully',
      type: model,
      status: 201,
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
}

// GET all
export function ApiGetAllResponse<T>(model: Type<T>) {
  return applyDecorators(
    ApiResponse({
      type: [model],
      status: 200,
    }),
  );
}

// GET by ID
export function ApiGetByIdResponse<T>(model: Type<T>) {
  return applyDecorators(
    ApiResponse({
      type: model,
      status: 200,
    }),
    ApiNotFoundResponse({ description: 'Not Found' }),
  );
}

// PATCH
export function ApiPatchResponse<T>(model: Type<T>) {
  return applyDecorators(
    ApiResponse({
      type: model,
      status: 200,
    }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
  );
}

// DELETE
export function ApiDeleteResponse<T>(model: Type<T>) {
  return applyDecorators(
    ApiResponse({
      type: model,
      status: 200,
      description: 'Deleted Successfully',
    }),
    ApiNotFoundResponse({ description: 'Not Found' }),
  );
}
