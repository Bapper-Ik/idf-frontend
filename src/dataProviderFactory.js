// dataProviderFactory.js
import {
  DataProvider,
  DELETE,
  GET_LIST,
  GET_ONE,
  POST,
  UPDATE,
} from "react-admin";

const dataProviderFactory = (apiUrl) => {
  const httpClient = (request) => {
    const options = {
      method: request.method,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: request.body ? JSON.stringify(request.body) : null,
    };

    return fetch(`${apiUrl}/${request.resource}`, options)
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    [GET_LIST]: (resource, params) => {
      return httpClient({
        method: "GET",
        resource,
        params: {
          ...params,
          sort: { field: params.sort.field, order: params.sort.order },
        },
      }).then((response) => ({
        data: response,
        total: response.length,
      }));
    },
    [GET_ONE]: (resource, params) => {
      return httpClient({
        method: "GET",
        resource,
        params: { id: params.id },
      }).then((response) => ({ data: response }));
    },
    [POST]: (resource, params) => {
      return httpClient({
        method: "POST",
        resource,
        body: params.data,
      }).then((response) => ({ data: response }));
    },
    [UPDATE]: (resource, params) => {
      return httpClient({
        method: "PUT",
        resource,
        params: { id: params.id },
        body: params.data,
      }).then((response) => ({ data: response }));
    },
    [DELETE]: (resource, params) => {
      return httpClient({
        method: "DELETE",
        resource,
        params: { id: params.id },
      }).then((response) => ({ data: response }));
    },
  };
};

export default dataProviderFactory;
