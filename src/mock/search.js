import { Model, Response } from "miragejs";

export const searchHistories = Model.extend();

export function getSearchHistory(schema, request) {
  return new Response(
    200,
    {},
    {
      data: schema.searchhistories.all(),
      message: "success",
    }
  );
}

export function appendSearchHistories(schema, request) {
  schema.searchhistories.insert(request.params.q);
  return new Response(
    200,
    {},
    {
      message: "success",
    }
  );
}

export function searchInventories(schema, request) {
  const q = request.params.q;
  const inventories = schema.inventories.all();
  const result = inventories.filter((v) => v.name.indexOf(q) >= 0);
  return new Response(
    200,
    {},
    {
      data: result,
      message: "success",
    }
  );
}
