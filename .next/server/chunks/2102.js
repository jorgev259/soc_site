"use strict";
exports.id = 2102;
exports.ids = [2102];
exports.modules = {

/***/ 2102:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uk": () => (/* binding */ useApollo),
/* harmony export */   "in": () => (/* binding */ initializeApollo)
/* harmony export */ });
/* unused harmony export isGithub */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_upload_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3706);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apollo_upload_client__WEBPACK_IMPORTED_MODULE_2__]);
apollo_upload_client__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



let apolloClient;
const isSSR = "undefined" === "undefined";
const isDev = "production" === "development";
const forcedUri = process.env.FORCE_CLIENT_URI;
const isGithub = process.env.GITHUB_ACTIONS;
const uri = isGithub ? "https://sittingonclouds.net/graphql" : forcedUri || (isSSR || isDev || window.origin === "http://localhost:3000" ? "http://localhost:4000" : `${window.origin}/graphql`);
function createApolloClient() {
    return new _apollo_client__WEBPACK_IMPORTED_MODULE_1__.ApolloClient({
        ssrMode: isSSR,
        link: (0,apollo_upload_client__WEBPACK_IMPORTED_MODULE_2__.createUploadLink)({
            uri,
            credentials: "include"
        }),
        cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_1__.InMemoryCache()
    });
}
function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();
    if (initialState) _apolloClient.cache.restore(initialState);
    // For SSG and SSR always create a new Apollo Client
    if (isSSR) return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}
function useApollo(initialState) {
    const store = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>initializeApollo(initialState), [
        initialState
    ]);
    return store;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;