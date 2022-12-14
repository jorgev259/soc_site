exports.id = 9139;
exports.ids = [9139];
exports.modules = {

/***/ 3559:
/***/ ((module) => {

// Exports
module.exports = {
	"albumSpan": "Profile_albumSpan__O9GbQ"
};


/***/ }),

/***/ 522:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "Sidebar_root__WlHvb",
	"socials": "Sidebar_socials__kDIkg"
};


/***/ }),

/***/ 9139:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sf": () => (/* binding */ CommentCarrouselSidebar),
/* harmony export */   "Tv": () => (/* binding */ BasicCommentCarrousel),
/* harmony export */   "ZP": () => (/* binding */ CommentCarrousel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var form_serialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(684);
/* harmony import */ var form_serialize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(form_serialize__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _useUser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2446);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9738);
/* harmony import */ var _useTranslation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6974);
/* harmony import */ var _styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3559);
/* harmony import */ var _styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _styles_Sidebar_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(522);
/* harmony import */ var _styles_Sidebar_module_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_Sidebar_module_scss__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useTranslation__WEBPACK_IMPORTED_MODULE_9__]);
_useTranslation__WEBPACK_IMPORTED_MODULE_9__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];













function SideButton(props) {
    const { side , onClick  } = props;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
        xs: "auto",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Button, {
            onClick: onClick,
            className: "h-100 rounded-3",
            variant: "outline-light",
            style: {
                fontSize: "30px"
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: `fas fa-angle-${side}`
            })
        })
    });
}
function BasicCommentCarrousel(props) {
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const timeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const { comments =[]  } = props;
    const current = comments[currentIndex];
    const plusIndex = ()=>setCurrentIndex(currentIndex === comments.length - 1 ? 0 : currentIndex + 1);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(plusIndex, 10 * 1000);
    }, [
        currentIndex
    ]);
    if (comments.length === 0) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                className: "m-2",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "blackblock",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                        children: [
                            comments.length > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SideButton, {
                                side: "left",
                                onClick: ()=>setCurrentIndex(currentIndex === 0 ? comments.length - 1 : currentIndex - 1)
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                                className: "py-3",
                                style: {
                                    fontSize: "18px"
                                },
                                children: [
                                    current.text,
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mt-2",
                                        children: [
                                            current.album && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                children: [
                                                    " - ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                        href: `/album/${current.album.id}`,
                                                        className: (_styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11___default().albumSpan),
                                                        children: current.album.title
                                                    })
                                                ]
                                            }),
                                            !current.album && current.username && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                children: [
                                                    " - ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                        href: `/profile/${current.username}`,
                                                        className: (_styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11___default().albumSpan),
                                                        children: current.username
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            comments.length > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SideButton, {
                                side: "right",
                                onClick: plusIndex
                            })
                        ]
                    })
                })
            })
        })
    });
}
const getComment = _apollo_client__WEBPACK_IMPORTED_MODULE_3__.gql`
  query ($albumId: ID!) {
    album(id: $albumId){
      comments {
        text
        username
      }
      selfComment {
        text
        anon
      }
    }
  }
`;
const mutateComment = _apollo_client__WEBPACK_IMPORTED_MODULE_3__.gql`
  mutation ($text: String!, $anon: Boolean!, $albumId: ID!) {
    updateComment(text: $text, anon: $anon, albumId: $albumId)
  }
`;
function CommentCarrousel(props) {
    const { albumId , comments: initialComments = []  } = props;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const t = (0,_useTranslation__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)();
    const [show, setShow] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [defaultValue, setDefaultValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    const timeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const { user  } = (0,_useUser__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)();
    const [fetchComment, { data , refetch  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_3__.useLazyQuery)(getComment);
    const [updateComment, { loading: loadingComment  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_3__.useMutation)(mutateComment);
    const comments = data?.album.comments || initialComments;
    const selfComment = data?.album?.selfComment;
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        fetchComment({
            variables: {
                albumId
            }
        });
    }, [
        user,
        fetchComment,
        albumId
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(plusIndex, 10 * 1000);
    }, [
        currentIndex
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const selfComment = data?.album?.selfComment;
        if (selfComment) setDefaultValue(selfComment.text);
    }, [
        data
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setDefaultValue();
    }, [
        albumId
    ]);
    function submit(ev) {
        let variables = form_serialize__WEBPACK_IMPORTED_MODULE_4___default()(ev.target, {
            hash: true
        });
        variables = {
            ...variables,
            anon: variables.anon === "on",
            albumId
        };
        updateComment({
            variables
        }).then(()=>{
            refetch();
            setShow(false);
        });
        ev.preventDefault();
    }
    const current = comments[currentIndex];
    const plusIndex = ()=>setCurrentIndex(currentIndex === comments.length - 1 ? 0 : currentIndex + 1);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal, {
                show: show,
                centered: true,
                onHide: ()=>setShow(false),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.Body, {
                    className: "m-3",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form, {
                        onSubmit: submit,
                        style: {
                            color: "black"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {
                                    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.FormControl, {
                                        required: true,
                                        as: "textarea",
                                        name: "text",
                                        maxLength: 300,
                                        onChange: (ev)=>setDefaultValue(ev.target.value),
                                        defaultValue: defaultValue
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                                className: "mt-2",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {
                                    as: react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Check, {
                                        type: "checkbox",
                                        label: t("Comment_Anon"),
                                        name: "anon",
                                        defaultChecked: selfComment ? selfComment.anon : false
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                                className: "mt-2",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                                    className: "mx-auto",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Loader__WEBPACK_IMPORTED_MODULE_8__/* .ButtonLoader */ .l, {
                                        loading: loadingComment,
                                        type: "submit",
                                        color: "primary",
                                        children: t("Save comment")
                                    })
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                    className: "m-2",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "blackblock",
                        children: [
                            current && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                                children: [
                                    comments.length > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SideButton, {
                                        side: "left",
                                        onClick: ()=>setCurrentIndex(currentIndex === 0 ? comments.length - 1 : currentIndex - 1)
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                                        className: "py-3",
                                        style: {
                                            fontSize: "18px"
                                        },
                                        children: [
                                            current.text,
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mt-2",
                                                children: [
                                                    current.album && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        children: [
                                                            " - ",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                                href: `/album/${current.album.id}`,
                                                                className: (_styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11___default().albumSpan),
                                                                children: current.album.title
                                                            })
                                                        ]
                                                    }),
                                                    !current.album && current.username && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        children: [
                                                            " - ",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                                href: `/profile/${current.username}`,
                                                                className: (_styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11___default().albumSpan),
                                                                children: current.username
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    comments.length > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SideButton, {
                                        side: "right",
                                        onClick: plusIndex
                                    })
                                ]
                            }),
                            albumId && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                                className: "mt-3 justify-content-center",
                                children: user ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                                    xs: 3,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                        onClick: ()=>user ? setShow(true) : null,
                                        className: "w-100 rounded-3",
                                        variant: "outline-light",
                                        style: {
                                            fontSize: "18px"
                                        },
                                        children: t(selfComment ? "Edit comment" : "Add comment")
                                    })
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                                    xs: "4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                        onClick: ()=>router.replace(`${router.asPath}?login`),
                                        className: "w-100 rounded-3",
                                        variant: "outline-light",
                                        style: {
                                            fontSize: "18px"
                                        },
                                        children: t("Comment_Login")
                                    })
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}
const getRecentComments = _apollo_client__WEBPACK_IMPORTED_MODULE_3__.gql`
  query {
    recentComments {
      text
      anon
      username
      album {
        id
        title
      }
    }
  }
`;
function CommentCarrouselSidebar(props) {
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const timeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const { data , loading  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_3__.useQuery)(getRecentComments);
    const comments = data?.recentComments || [];
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(plusIndex, 10 * 1000);
    }, [
        currentIndex
    ]);
    const current = comments[currentIndex];
    const plusIndex = ()=>setCurrentIndex(currentIndex === comments.length - 1 ? 0 : currentIndex + 1);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
            className: "mt-3 px-3",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                className: classnames__WEBPACK_IMPORTED_MODULE_10___default()((_styles_Sidebar_module_scss__WEBPACK_IMPORTED_MODULE_12___default().socials), ""),
                children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Loader__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    className: "mx-auto",
                    size: 100
                }) : current ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                                className: "pb-3",
                                style: {
                                    fontSize: "18px"
                                },
                                children: [
                                    current.text,
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mt-2",
                                        children: [
                                            current.album && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                children: [
                                                    " - ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                        href: `/album/${current.album.id}`,
                                                        className: (_styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11___default().albumSpan),
                                                        children: current.album.title
                                                    })
                                                ]
                                            }),
                                            !current.album && current.username && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                children: [
                                                    " - ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                        href: `/profile/${current.username}`,
                                                        className: (_styles_Profile_module_scss__WEBPACK_IMPORTED_MODULE_11___default().albumSpan),
                                                        children: current.username
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {
                            className: "d-flex justify-content-between",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SideButton, {
                                    side: "left",
                                    onClick: ()=>setCurrentIndex(currentIndex === 0 ? comments.length - 1 : currentIndex - 1)
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {
                                    className: "d-flex align-items-center justify-content-center",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            currentIndex + 1,
                                            " / ",
                                            comments.length
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SideButton, {
                                    side: "right",
                                    onClick: plusIndex
                                })
                            ]
                        })
                    ]
                }) : null
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;