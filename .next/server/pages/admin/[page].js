"use strict";
(() => {
var exports = {};
exports.id = 9885;
exports.ids = [9885];
exports.modules = {

/***/ 1736:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AlbumAdmin),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2245);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_Selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9675);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9738);
/* harmony import */ var _components_resolvers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3551);
/* harmony import */ var _components_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(599);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_resolvers__WEBPACK_IMPORTED_MODULE_11__]);
_components_resolvers__WEBPACK_IMPORTED_MODULE_11__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];













const getServerSideProps = (0,_components_resolvers__WEBPACK_IMPORTED_MODULE_11__/* .hasRolePage */ .yg)([
    "CREATE",
    "UPDATE"
]);
const limit = 10;
function AlbumAdmin() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Container, {
        fluid: true,
        className: "d-flex",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                xs: 2,
                className: "pe-3",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "sticky-top",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mb-2 mt-3 text-center",
                            children: "Navigation"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "py-2 site-form blackblock d-flex flex-column",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "#addAlbum",
                                    children: "Album List"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "#addSeries",
                                    children: "Edit highlight"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "#addGame",
                                    children: "Edit banner"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                xs: 10,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AlbumTable, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Highlight, {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Banner, {})
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SelectBanner, {})
                    })
                ]
            })
        ]
    });
}
function AlbumTable() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const page = parseInt(router.query.page || "1");
    const mutation = _apollo_client__WEBPACK_IMPORTED_MODULE_6__.gql`
    mutation deleteAlbum($id: ID!){
      deleteAlbum(id: $id)
    }
  `;
    const query = _apollo_client__WEBPACK_IMPORTED_MODULE_6__.gql`
      query searchAlbum(
        $title: String,
        $page: Int,
        $limit: Int,
        $name: String,
        $status: [String!]!
      ){
        searchAlbum(
          title: $title,
          page: $page,
          limit: $limit,
          status: $status
        ){
          rows{
            id,
            title,
            createdAt,
            updatedAt
          },
          count
        }

        config(name:$name){
          label: name
          value
        }
      }
    `;
    const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        "show",
        "hidden",
        "coming"
    ]);
    const [deleteAlbum, { loading: loadingMutation  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__.useMutation)(mutation);
    const { data , loading , error , refetch  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__.useQuery)(query, {
        variables: {
            title: "",
            page: page - 1,
            limit,
            name: "highlight",
            status
        }
    });
    if (error) {
        console.log(error);
        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("Failed to fetch server info");
    }
    function handleSearch(e) {
        e.persist();
        e.preventDefault();
        refetch({
            title: e.target.value,
            page: page - 1,
            limit,
            name: "highlight",
            status
        });
    }
    function Rows() {
        const [modal, setModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
        const [modalData, setModalData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
        const { searchAlbum  } = data;
        const { id , title  } = modalData;
        function handleDelete() {
            deleteAlbum({
                variables: {
                    id
                }
            }).then((results)=>{
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Deleted album "${title}" (${id}) succesfully`);
                refetch();
            }).catch((err)=>{
                console.log(err);
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(`Failed to delete album "${title}" (${id})`);
            }).finally(()=>setModalData(!modal));
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal, {
                    centered: true,
                    show: modal,
                    onHide: ()=>setModal(false),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.ModalBody, {
                        className: "m-3",
                        style: {
                            color: "black"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                    children: `Delete the album "${title}" (ID: ${id})?`
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                className: "mt-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                            color: "primary",
                                            className: "mx-2",
                                            onClick: handleDelete,
                                            children: loadingMutation ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                                dev: true
                                            }) : "Yes"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                            color: "primary",
                                            className: "mx-2",
                                            onClick: ()=>setModalData(!modal),
                                            children: "No"
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                }),
                searchAlbum.rows && searchAlbum.rows.map(({ id , title , createdAt , updatedAt  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                href: `/admin/album/${id}`,
                                passHref: true,
                                legacyBehavior: true,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: title
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                href: `/admin/album/${id}`,
                                passHref: true,
                                legacyBehavior: true,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: moment__WEBPACK_IMPORTED_MODULE_4___default()(createdAt).format("DD/MM/YYYY HH:mm:ss")
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                href: `/admin/album/${id}`,
                                passHref: true,
                                legacyBehavior: true,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: moment__WEBPACK_IMPORTED_MODULE_4___default()(updatedAt).format("DD/MM/YYYY HH:mm:ss")
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                    onClick: ()=>{
                                        setModalData({
                                            id,
                                            title
                                        });
                                        setModal(true);
                                    },
                                    children: "Remove"
                                })
                            })
                        ]
                    }, id))
            ]
        });
    }
    function NavRows() {
        const { searchAlbum  } = data;
        const fullPageList = (0,_components_utils__WEBPACK_IMPORTED_MODULE_12__/* .getFullPageList */ .Hx)(searchAlbum.count, limit);
        const { pageList , currentList , currentListIndex  } = (0,_components_utils__WEBPACK_IMPORTED_MODULE_12__/* .getPageList */ .RB)(fullPageList, 15, page);
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
            xs: "auto",
            className: "pagination mx-auto page-bar",
            children: currentList && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    currentListIndex > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                href: "/admin/1",
                                className: "fas fa-angle-double-left align-middle nav-link"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                href: `/admin/${currentList[0] - 1}`,
                                className: "fas fa-angle-left align-middle nav-link"
                            })
                        ]
                    }),
                    currentList.map((e)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                            href: `/admin/${e}`,
                            className: classnames__WEBPACK_IMPORTED_MODULE_5___default()({
                                disabled: e === parseInt(page)
                            }, "nav-link"),
                            children: e
                        }, e)),
                    currentListIndex !== pageList.length - 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                href: `/admin/${currentList[currentList.length - 1] + 1}`,
                                className: "fas fa-angle-right align-middle nav-link"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                href: `/admin/${fullPageList[fullPageList.length - 1]}`,
                                className: "fas fa-angle-double-right align-middle nav-link"
                            })
                        ]
                    })
                ]
            })
        });
    }
    const statusOptions = [
        "Show",
        "Hidden",
        "Coming"
    ].map((label)=>({
            label,
            value: label.toLowerCase()
        }));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Form, {
        className: "site-form blackblock mt-5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                className: "my-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                        xs: "auto",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Form.Group, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                href: "/admin/album/add",
                                passHref: true,
                                legacyBehavior: true,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                    variant: "primary",
                                    children: "Add Album"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Form.Group, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.InputGroup, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.InputGroup.Text, {
                                        children: "\uD83D\uDD0E"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.FormControl, {
                                        type: "text",
                                        onChange: handleSearch
                                    })
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                className: "my-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                        md: "auto",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Form.Label, {
                            htmlFor: "status",
                            children: "Status:"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Selectors__WEBPACK_IMPORTED_MODULE_9__/* .SimpleSelector */ .d7, {
                            onChange: (e)=>setStatus(e.map((v)=>v.value)),
                            required: true,
                            name: "status",
                            defaultValue: statusOptions,
                            options: statusOptions
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Table, {
                            variant: "dark",
                            hover: true,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                children: "Title"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                children: "Created"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                children: "Last Updated"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {})
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                                    children: data && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Rows, {})
                                })
                            ]
                        }),
                        loading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                            dev: true
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                children: data && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NavRows, {})
            })
        ]
    });
}
function Highlight() {
    const queryConfig = _apollo_client__WEBPACK_IMPORTED_MODULE_6__.gql`
      query {
        highlight {
          value: id
          label: title
        }
      }
    `;
    const mutation = _apollo_client__WEBPACK_IMPORTED_MODULE_6__.gql`
      mutation Config($name: String!, $value: String!){
        config(name: $name, value: $value){
          name
          value
        }
      }
    `;
    const { loading , data , error , refetch  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__.useQuery)(queryConfig);
    const [mutateConfig] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__.useMutation)(mutation);
    if (error) {
        console.log(error);
        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("Hightlight: Failed to fetch server info");
    }
    function handleHighlight(result) {
        const { value  } = result;
        mutateConfig({
            variables: {
                name: "highlight",
                value
            }
        }).then((results)=>{
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success("Updated highlighted album!");
            refetch();
        }).catch((err)=>{
            console.log(err);
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("Failed to update highlighted album");
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
        md: 6,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "mt-3 site-form blackblock p-3",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Form.Label, {
                    children: "Highlight album:"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Selectors__WEBPACK_IMPORTED_MODULE_9__/* .AlbumSelector */ .Q$, {
                    options: {
                        isSingle: true,
                        defaultValue: data?.highlight,
                        onChange: handleHighlight,
                        loading
                    }
                })
            ]
        })
    });
}
function Banner() {
    const mutation = _apollo_client__WEBPACK_IMPORTED_MODULE_6__.gql`
      mutation UploadBanner($banner: Upload!){
        uploadBanner(banner: $banner)
      }
    `;
    const [upload, { loading  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__.useMutation)(mutation);
    function handleUpload(ev) {
        const [banner] = ev.target.files;
        upload({
            variables: {
                banner
            }
        }).then((results)=>{
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success("Updated banner!");
        }).catch((err)=>{
            console.log(err);
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("Failed to update banner");
        });
        ev.persist();
        ev.preventDefault();
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
        md: 6,
        className: "mt-3 site-form blackblock p-3",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Form.Group, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Form.Label, {
                    htmlFor: "banner",
                    children: "Upload Banner:"
                }),
                loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                    dev: true
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.FormControl, {
                    type: "file",
                    onChange: handleUpload
                })
            ]
        })
    });
}
function SelectBanner() {
    const queryConfig = _apollo_client__WEBPACK_IMPORTED_MODULE_6__.gql`
      query {
        banners
      }
    `;
    const mutation = _apollo_client__WEBPACK_IMPORTED_MODULE_6__.gql`
      mutation ($name: String!){
        selectBanner(name: $name)
      }
    `;
    const { loadingQuery , data , error , refetch  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__.useQuery)(queryConfig);
    const [mutateConfig, { loading  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__.useMutation)(mutation);
    if (error) {
        console.log(error);
        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("Hightlight: Failed to fetch server info");
    }
    function handleSelect(name) {
        mutateConfig({
            variables: {
                name: name.replace(".png", "")
            }
        }).then((results)=>{
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success("Updated banner!");
            refetch();
        }).catch((err)=>{
            console.log(err);
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("Failed to update banner");
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
        md: 12,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "p-0 my-3 site-form blackblock position-relative",
            children: [
                (loading || loadingQuery) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-0 position-absolute h-100 w-100",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "p-0 blackblock position-absolute h-100 w-100",
                            style: {
                                backgroundColor: "black",
                                opacity: 0.65
                            }
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                            className: "m-auto"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-3",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Form.Label, {
                            children: "Available banners:"
                        }),
                        data?.banners.map((b)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "my-2",
                                onClick: ()=>handleSelect(b),
                                style: {
                                    cursor: "pointer",
                                    height: "110px",
                                    width: "100%",
                                    backgroundSize: "cover",
                                    backgroundImage: `url('/_next/image?w=3840&q=25&url=${`https://cdn.sittingonclouds.net/live/${b}`}`
                                }
                            }, b))
                    ]
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9114:
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ 4292:
/***/ ((module) => {

module.exports = require("apollo-server-errors");

/***/ }),

/***/ 9003:
/***/ ((module) => {

module.exports = require("classnames");

/***/ }),

/***/ 684:
/***/ ((module) => {

module.exports = require("form-serialize");

/***/ }),

/***/ 2245:
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 3539:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/detect-domain-locale.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3431:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-locale.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 2820:
/***/ ((module) => {

module.exports = require("react-multi-select-component");

/***/ }),

/***/ 1187:
/***/ ((module) => {

module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3673:
/***/ ((module) => {

module.exports = require("slugify");

/***/ }),

/***/ 1454:
/***/ ((module) => {

module.exports = import("iron-session");;

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1678,9755,676,1664,7014,599,3498,3551], () => (__webpack_exec__(1736)));
module.exports = __webpack_exports__;

})();