/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddFavorite($id: String!) {\n    addFavorite(albumId: $id)\n  }\n": types.AddFavoriteDocument,
    "\n  mutation RemoveFavorite($id: String!) {\n    removeFavorite(albumId: $id)\n  }\n": types.RemoveFavoriteDocument,
    "\n  mutation RateAlbum($id: ID!, $score: Int!) {\n    rateAlbum(albumId: $id, score: $score)\n  }\n": types.RateAlbumDocument,
    "\n  query AlbumList {\n    albums {\n      id\n      title\n      releaseDate\n      categories {\n        name\n      }\n    }\n  }\n": types.AlbumListDocument,
    "\n  query SearchAlbum($limit: Int, $page: Int) {\n    searchAlbum(limit: $limit, page: $page, status: [\"show\", \"coming\"]) {\n      rows {\n        id\n        status\n        title\n        placeholder\n      }\n      count\n    }\n  }\n": types.SearchAlbumDocument,
    "\n        query PendingRequests {\n          searchRequests(state: [\"pending\"], donator: [false]) {\n            rows {\n              value: id\n              label: title\n            }\n          }\n        }\n      ": types.PendingRequestsDocument,
    "\n        query PendingHeldRequests($filter: String) {\n          searchRequests(state: [\"pending\", \"hold\"], filter: $filter) {\n            rows {\n              value: id\n              label: title\n            }\n          }\n        }\n      ": types.PendingHeldRequestsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddFavorite($id: String!) {\n    addFavorite(albumId: $id)\n  }\n"): (typeof documents)["\n  mutation AddFavorite($id: String!) {\n    addFavorite(albumId: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveFavorite($id: String!) {\n    removeFavorite(albumId: $id)\n  }\n"): (typeof documents)["\n  mutation RemoveFavorite($id: String!) {\n    removeFavorite(albumId: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RateAlbum($id: ID!, $score: Int!) {\n    rateAlbum(albumId: $id, score: $score)\n  }\n"): (typeof documents)["\n  mutation RateAlbum($id: ID!, $score: Int!) {\n    rateAlbum(albumId: $id, score: $score)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AlbumList {\n    albums {\n      id\n      title\n      releaseDate\n      categories {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query AlbumList {\n    albums {\n      id\n      title\n      releaseDate\n      categories {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchAlbum($limit: Int, $page: Int) {\n    searchAlbum(limit: $limit, page: $page, status: [\"show\", \"coming\"]) {\n      rows {\n        id\n        status\n        title\n        placeholder\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query SearchAlbum($limit: Int, $page: Int) {\n    searchAlbum(limit: $limit, page: $page, status: [\"show\", \"coming\"]) {\n      rows {\n        id\n        status\n        title\n        placeholder\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query PendingRequests {\n          searchRequests(state: [\"pending\"], donator: [false]) {\n            rows {\n              value: id\n              label: title\n            }\n          }\n        }\n      "): (typeof documents)["\n        query PendingRequests {\n          searchRequests(state: [\"pending\"], donator: [false]) {\n            rows {\n              value: id\n              label: title\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query PendingHeldRequests($filter: String) {\n          searchRequests(state: [\"pending\", \"hold\"], filter: $filter) {\n            rows {\n              value: id\n              label: title\n            }\n          }\n        }\n      "): (typeof documents)["\n        query PendingHeldRequests($filter: String) {\n          searchRequests(state: [\"pending\", \"hold\"], filter: $filter) {\n            rows {\n              value: id\n              label: title\n            }\n          }\n        }\n      "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;