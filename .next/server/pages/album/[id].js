(() => {
var exports = {};
exports.id = 3847;
exports.ids = [3847,2888];
exports.modules = {

/***/ 7689:
/***/ ((module) => {

// Exports
module.exports = {
	"title": "Album_title__ZaGZL",
	"table": "Album_table__NGdRi",
	"content": "Album_content__ActvU",
	"stores": "Album_stores__OMIJi",
	"download": "Album_download__pH_5m",
	"direct": "Album_direct__br6xh"
};


/***/ }),

/***/ 1525:
/***/ ((module) => {

// Exports
module.exports = {
	"star": "Stars_star__yQXT9",
	"gold": "Stars_gold__v_Nx7"
};


/***/ }),

/***/ 4381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/vgmdblogo.6b1f5637.png","height":80,"width":250,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAMAAACZFr56AAAANlBMVEWjAQGSkHdublJoYT9USytUSxxUUzCQh1idc1eYmXyGe0qYmWqWlXpeXTloY0xnRkmwAACnn3CQP5YnAAAAEnRSTlOZq1J4jtJ/4KW1ksd9nHc8sP5VAF6wAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVQImWNg4OBk5OThZWMQ4OBmF2RnZWVg4Gfi4mNmYQEACi8Au04fR3MAAAAASUVORK5CYII=","blurWidth":8,"blurHeight":3});

/***/ }),

/***/ 5541:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(7689);
/* harmony import */ var _styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _styles_Stars_module_scss__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(1525);
/* harmony import */ var _styles_Stars_module_scss__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_styles_Stars_module_scss__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _img_assets_vgmdblogo_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4381);
/* harmony import */ var _components_useUser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2446);
/* harmony import */ var _components_AlbumBoxes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6112);
/* harmony import */ var _components_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(599);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9738);
/* harmony import */ var _components_ApolloClient__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(2102);
/* harmony import */ var _components_CommentsCarrousel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(9139);
/* harmony import */ var _components_useTranslation__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(6974);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(2748);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_18__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_ApolloClient__WEBPACK_IMPORTED_MODULE_15__, _components_CommentsCarrousel__WEBPACK_IMPORTED_MODULE_16__, _components_useTranslation__WEBPACK_IMPORTED_MODULE_17__]);
([_components_ApolloClient__WEBPACK_IMPORTED_MODULE_15__, _components_CommentsCarrousel__WEBPACK_IMPORTED_MODULE_16__, _components_useTranslation__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





















const query = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
query ($id: ID!) {
  album(id: $id){
    id
    title
    subTitle
    releaseDate
    vgmdb
    description
    placeholder
    headerColor
    status
    platforms {
      id
      name
    }
    animations {
      id
      title
    }
    games {
      slug
      name
    }
    artists {
      slug
      name
    }
    categories {
      name
    }
    classifications {
      name
    }
    stores {
      url
      provider
    }
    discs {
      number
      body
    }
    downloads {
      title
      small
      links {
        id
        url
        provider
        directUrl
      }
    }
    related {
      id
      title
      placeholder
    }
    comments {
      text
      username
    }
    favorites
    avgRating {
      score
      users
    }
  }
}
`;
const queryDownload = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
query downloads ($id: ID!) {
  downloads(id: $id){
    title
    small
    links {
      id
      url
      provider
      directUrl
    }
  }
}
`;
const mutationRating = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
  mutation ($albumId: ID!, $score: Int!){
    rateAlbum(albumId: $albumId, score: $score)
  }
`;
function StarCounter(props) {
    const { score: initialScore , users: initialUsers , albumId  } = props;
    const initial = {
        avgRating: {
            score: initialScore,
            users: initialUsers
        }
    };
    const [scoreHover, setHover] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const { user  } = (0,_components_useUser__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)();
    const getScore = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
    query ($albumId: ID!) {
      album(id: $albumId){
        selfScore
        avgRating {
          score
          users
        }
      }
    }
  `;
    const [fetchUserScore, { data , refetch  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useLazyQuery)(getScore);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        fetchUserScore({
            variables: {
                albumId
            }
        });
    }, [
        user
    ]);
    const { avgRating , selfScore  } = data?.album || initial;
    const { score , users  } = avgRating;
    const max = 5;
    const stars = [];
    function Star(props) {
        const { value  } = props;
        const t = (0,_components_useTranslation__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z)();
        const client = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useApolloClient)();
        const starClass = score >= value || (scoreHover || selfScore) >= value ? "fas fa-star" : score >= value - 0.5 ? "fas fa-star-half" : "far fa-star";
        const goldClass = scoreHover ? scoreHover >= value : selfScore >= value;
        const className = classnames__WEBPACK_IMPORTED_MODULE_4___default()(starClass, (_styles_Stars_module_scss__WEBPACK_IMPORTED_MODULE_19___default().star), {
            [(_styles_Stars_module_scss__WEBPACK_IMPORTED_MODULE_19___default().gold)]: goldClass,
            "ps-1": value > 1
        });
        function saveRating() {
            client.mutate({
                mutation: mutationRating,
                variables: {
                    albumId,
                    score: value
                }
            }).then(()=>{
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success(t("Rating saved!"));
                refetch();
            }).catch((err)=>{
                console.log(err);
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(t("Failed to save rating"));
            });
        }
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: className,
            onClick: saveRating,
            onMouseOver: ()=>setHover(value),
            onMouseOut: ()=>setHover()
        }, value);
    }
    let current = 1;
    while(current <= max){
        stars.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Star, {
            value: current
        }, current));
        current++;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            stars,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "ms-2",
                children: [
                    "(",
                    score,
                    " by ",
                    users,
                    " users)"
                ]
            })
        ]
    });
}
async function getServerSideProps(context) {
    const { params , locale  } = context;
    const { id  } = params;
    const client = (0,_components_ApolloClient__WEBPACK_IMPORTED_MODULE_15__/* .initializeApollo */ ["in"])();
    const { data  } = await client.query({
        query,
        variables: {
            id
        }
    });
    if (data.album === null || data.album.status !== "show") return {
        redirect: {
            destination: "/404",
            permanent: false
        }
    };
    const localeStrings = await (0,_components_useTranslation__WEBPACK_IMPORTED_MODULE_17__/* .getTranslation */ .i)(locale);
    return {
        props: {
            id,
            album: data.album,
            imageUrl: fullImage(data.album.id, 50),
            localeStrings
        }
    };
}
const fullImage = (id, quality = 75)=>`/_next/image?w=3840&q=${quality}&url=${(0,_components_utils__WEBPACK_IMPORTED_MODULE_13__/* .getImageUrl */ .Jn)(id)}`;
const favoriteTemplate = (query)=>_apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
  mutation ($albumId: String!) {
    ${query}Favorite(albumId: $albumId)
  }
`;
const addFavorite = favoriteTemplate("add");
const removeFavorite = favoriteTemplate("remove");
function Page(props) {
    const { id , album , imageUrl  } = props;
    const t = (0,_components_useTranslation__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const { user  } = (0,_components_useUser__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)();
    const [loadingFavorite, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const client = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useApolloClient)();
    const getFavorite = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
  query ($albumId: ID!) {
    album(id: $albumId){
      isFavorite
    }
  }
`;
    const { data: dataFavorite , refetch: refetchFavorite  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(getFavorite);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        refetchFavorite({
            albumId: id
        });
    }, [
        user,
        id,
        refetchFavorite
    ]);
    function submitFavorite() {
        setLoading(true);
        client.mutate({
            mutation: dataFavorite.album.isFavorite ? removeFavorite : addFavorite,
            variables: {
                albumId: id
            }
        }).then(()=>react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success(t(dataFavorite.album.isFavorite ? "Favorite_Added" : "Favorite_Removed"))).catch((err)=>{
            console.log(err);
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("Query failed");
        }).finally(()=>{
            setLoading(false);
            refetchFavorite();
            router.replace(router.asPath);
        });
    }
    const releaseDate = luxon__WEBPACK_IMPORTED_MODULE_18__.DateTime.fromISO(album.releaseDate, {
        zone: "utc"
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
            style: {
                backgroundAttachment: "fixed",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
                backgroundImage: `url("${fullImage(album.id, 100)}"), linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8))`
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_6___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                            children: album.title
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "theme-color",
                            content: album.headerColor
                        }, "color"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            property: "og:url",
                            content: `/album/${album.id}`
                        }, "url"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            property: "og:title",
                            content: album.title
                        }, "title"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            property: "og:description",
                            content: album.subTitle || album.artists.map((a)=>a.name).join(" - ")
                        }, "desc"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            property: "og:image",
                            content: imageUrl
                        }, "image")
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                    className: "p-0 px-md-5 pt-3",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Container, {
                        className: "px-0 px-md-5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                        lg: 5,
                                        className: "d-flex align-items-center px-0 px-lg-2 mb-3 mb-lg-0",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                            className: "rounded",
                                            width: 300,
                                            height: 300,
                                            style: {
                                                height: "auto",
                                                width: "100%"
                                            },
                                            alt: album.title,
                                            src: (0,_components_utils__WEBPACK_IMPORTED_MODULE_13__/* .getImageUrl */ .Jn)(album.id),
                                            placeholder: "blur",
                                            blurDataURL: album.placeholder || _components_utils__WEBPACK_IMPORTED_MODULE_13__/* .PLACEHOLDER */ .l7
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                        lg: 7,
                                        className: "d-flex flex-column justify-content-center blackblock",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("text-center", (_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().title)),
                                                            children: album.title
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                                            className: "text-center",
                                                            style: {
                                                                whiteSpace: "pre-wrap"
                                                            },
                                                            children: album.subTitle
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("table", {
                                                            className: (_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().table),
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tbody", {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                                className: "width-row",
                                                                                children: t("Release Date")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                children: releaseDate.toLocaleString({
                                                                                    day: "numeric",
                                                                                    month: "short",
                                                                                    year: "numeric"
                                                                                })
                                                                            })
                                                                        ]
                                                                    }),
                                                                    album.artists.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                                children: t("Artists")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                children: album.artists.map(({ id , name  })=>name).join(", ")
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                                children: t("Classification")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                children: [
                                                                                    album.categories.map(({ name  })=>t(`${name} Soundtrack`)).join(" & "),
                                                                                    album.classifications.map(({ name  })=>name).join(", ")
                                                                                ].filter((f)=>f !== "").join(" - ")
                                                                            })
                                                                        ]
                                                                    }),
                                                                    album.label && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                                children: t("Published by")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                    className: "btn btn-link p-0",
                                                                                    href: `/publisher/${album.label}`,
                                                                                    children: album.label
                                                                                })
                                                                            })
                                                                        ]
                                                                    }),
                                                                    album.platforms.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                                children: t("Platforms")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                children: album.platforms.map(({ id , name  }, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
                                                                                        children: [
                                                                                            id === "29" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                                className: "btn p-0",
                                                                                                style: {
                                                                                                    color: "white"
                                                                                                },
                                                                                                children: name
                                                                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                                className: "btn btn-link p-0",
                                                                                                href: `/platform/${id}`,
                                                                                                children: name
                                                                                            }),
                                                                                            i !== album.platforms.length - 1 && ", "
                                                                                        ]
                                                                                    }, id))
                                                                            })
                                                                        ]
                                                                    }),
                                                                    album.games.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                                children: t("Games")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                children: album.games.map(({ slug , name  }, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
                                                                                        children: [
                                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                                className: "btn btn-link p-0",
                                                                                                href: `/game/${slug}`,
                                                                                                children: name
                                                                                            }),
                                                                                            i !== album.games.length - 1 && ", "
                                                                                        ]
                                                                                    }, slug))
                                                                            })
                                                                        ]
                                                                    }),
                                                                    album.animations.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                                children: t("Animations")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                children: album.animations.map(({ id , title  }, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
                                                                                        children: [
                                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                                className: "btn btn-link p-0",
                                                                                                href: `/anim/${id}`,
                                                                                                children: title
                                                                                            }),
                                                                                            i !== album.animations.length - 1 && ", "
                                                                                        ]
                                                                                    }, id))
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("th", {
                                                                                children: [
                                                                                    t("Avg. Rating"),
                                                                                    ": "
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StarCounter, {
                                                                                    albumId: album.id,
                                                                                    ...album.avgRating
                                                                                })
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                                        className: "text-center",
                                                        children: album.description
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_14__/* .ButtonLoader */ .l, {
                                                        loading: loadingFavorite,
                                                        onClick: user ? submitFavorite : ()=>router.replace(`${router.asPath}?login`),
                                                        className: "w-100 rounded-3",
                                                        variant: "outline-light",
                                                        style: {
                                                            fontSize: "18px"
                                                        },
                                                        children: t(user ? dataFavorite?.album?.isFavorite ? "Favorite_Remove" : "Favorite_Add" : "Favorite_Login")
                                                    })
                                                })
                                            }),
                                            user && user.permissions.includes("UPDATE") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                className: "mt-3",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_9___default()), {
                                                        href: `/admin/album/${album.id}`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                                            className: "w-100 rounded-3",
                                                            variant: "outline-light",
                                                            style: {
                                                                fontSize: "18px"
                                                            },
                                                            children: t("Edit this album")
                                                        })
                                                    })
                                                })
                                            }) : null
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TrackList, {
                                        discs: album.discs
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                        lg: 6,
                                        className: "blackblock",
                                        children: [
                                            album.vgmdb && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                className: "mb-2 ms-2",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                        xs: "auto",
                                                        className: "px-0",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            style: {
                                                                fontSize: "21px"
                                                            },
                                                            children: [
                                                                "Check album at",
                                                                ":"
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                        xs: "auto",
                                                        className: "d-flex align-items-center ps-0",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            className: "ms-2",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            href: album.vgmdb,
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                                                width: 100,
                                                                height: 30,
                                                                alt: "VGMdb",
                                                                src: _img_assets_vgmdblogo_png__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z
                                                            })
                                                        })
                                                    })
                                                ]
                                            }),
                                            album.stores.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                className: "mt-2 px-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    className: (_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().stores),
                                                    style: {
                                                        paddingLeft: "15px",
                                                        paddingTop: "10px",
                                                        paddingRight: "15px",
                                                        paddingBottom: "10px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                            className: "text-center homeTitle",
                                                            style: {
                                                                fontSize: "30px"
                                                            },
                                                            children: t("Buy_Original")
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                                                            className: "style-white w-100 mt-0"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                            children: album.stores.map(({ url , provider  }, i)=>provider === "SOON" ? null : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                                    md: 6,
                                                                    className: "d-flex justify-content-center py-1",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                        target: "_blank",
                                                                        rel: "noopener noreferrer",
                                                                        href: url,
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                                                            className: "rounded",
                                                                            width: 250,
                                                                            height: 70,
                                                                            style: {
                                                                                height: "auto",
                                                                                width: "100%"
                                                                            },
                                                                            alt: provider,
                                                                            src: `/img/provider/${provider}.jpg`
                                                                        })
                                                                    })
                                                                }, i))
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                                                className: "style-white w-100"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DownloadList, {
                                                id: id,
                                                initialDownloads: album.downloads
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CommentsCarrousel__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .ZP, {
                                albumId: id,
                                comments: album.comments
                            }),
                            album.related.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "blackblock m-2",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                className: "text-center text-uppercase album-title",
                                                children: t("Related Soundtracks")
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                        className: "justify-content-center",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AlbumBoxes__WEBPACK_IMPORTED_MODULE_12__/* .AlbumBoxList */ .X, {
                                            colProps: {
                                                md: 3,
                                                xs: 6
                                            },
                                            items: album.related
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
}
function DownloadList(props) {
    const { id , initialDownloads  } = props;
    const { data , refetch  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(queryDownload, {
        variables: {
            id
        }
    });
    const t = (0,_components_useTranslation__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z)();
    const { user  } = (0,_components_useUser__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        refetch({
            variables: {
                id
            }
        });
    }, [
        user,
        id,
        refetch
    ]);
    const downloads = data?.downloads || initialDownloads;
    return downloads.map((download, di)=>{
        const { links , title  } = download;
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            md: 12,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-center download-txt mb-0",
                                children: title
                            })
                        })
                    }),
                    links.map((link)=>{
                        const { id: linkId , url , provider , directUrl  } = link;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                    className: "mt-2",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                        md: 12,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            className: "text-center",
                                            children: provider
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                    className: "mx-auto mb-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                            xs: 6,
                                            className: " mx-auto py-2",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                                target: "_blank",
                                                variant: "secondary",
                                                className: (_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().download),
                                                href: url,
                                                children: t("Download")
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                            className: "py-2",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DirectButton, {
                                                target: "_blank",
                                                directUrl: directUrl
                                            })
                                        })
                                    ]
                                })
                            ]
                        }, linkId);
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                        className: "style-white w-100"
                    })
                ]
            })
        }, di);
    });
}
function DirectButton(props) {
    const { directUrl  } = props;
    const t = (0,_components_useTranslation__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z)();
    const renderTooltip = (props)=>!directUrl ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
            ...props,
            id: (_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().tooltip),
            children: t("Become_Donator")
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {});
    const ButtonRender = !directUrl ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "secondary",
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()((_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().download), (_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().direct)),
        disabled: !directUrl,
        children: t("Direct")
    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
        target: "_blank",
        variant: "secondary",
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()((_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().download), (_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().direct)),
        href: directUrl,
        children: t("Direct")
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.OverlayTrigger, {
        placement: "top",
        overlay: renderTooltip,
        children: ButtonRender
    });
}
function TrackList(props) {
    const { discs  } = props;
    const [current, setCurrent] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
    const t = (0,_components_useTranslation__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
        lg: 6,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "blackblock d-inline-block w-100",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("text-center text-uppercase", (_styles_Album_module_scss__WEBPACK_IMPORTED_MODULE_20___default().title)),
                            children: t("Tracklist")
                        })
                    })
                }),
                discs.length > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                    style: {
                        transform: "translateY(2px)"
                    },
                    children: discs.map(({ number  }, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("text-center", {
                                "ps-0": i > 0,
                                "pe-0": i < discs.length - 1
                            }),
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>setCurrent(number),
                                className: "py-2",
                                style: {
                                    cursor: current === number ? "" : "pointer",
                                    borderStyle: "solid",
                                    borderWidth: "2px 2px 2px 2px",
                                    borderColor: "#efefef",
                                    borderRightStyle: discs.length - 1 === i ? "solid" : "hidden",
                                    borderBottomWidth: current === number ? "0px" : "2px"
                                },
                                children: [
                                    t("Disc"),
                                    " ",
                                    number + 1
                                ]
                            })
                        }, number))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                padding: "5px 5px 5px 5px",
                                borderStyle: "solid",
                                borderWidth: "2px 2px 2px 2px",
                                borderColor: "#efefef",
                                borderTopWidth: discs.length > 1 ? "0px" : "2px"
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("table", {
                                cellSpacing: "0",
                                cellPadding: "1",
                                border: "0",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                                    children: discs.length > 0 && discs[current].body.split("\n").map((track, i)=>{
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                    className: "smallfont",
                                                    style: {
                                                        padding: "8px"
                                                    },
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "label",
                                                        children: i + 1
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                    className: "smallfont",
                                                    width: "100%",
                                                    style: {
                                                        padding: "8px"
                                                    },
                                                    children: track
                                                })
                                            ]
                                        }, i);
                                    })
                                })
                            })
                        })
                    })
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

"use strict";
module.exports = require("@apollo/client");

/***/ }),

/***/ 9003:
/***/ ((module) => {

"use strict";
module.exports = require("classnames");

/***/ }),

/***/ 684:
/***/ ((module) => {

"use strict";
module.exports = require("form-serialize");

/***/ }),

/***/ 2748:
/***/ ((module) => {

"use strict";
module.exports = require("luxon");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 3539:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/detect-domain-locale.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3431:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-locale.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

"use strict";
module.exports = require("react-bootstrap");

/***/ }),

/***/ 4932:
/***/ ((module) => {

"use strict";
module.exports = require("react-bootstrap/SSRProvider");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 3082:
/***/ ((module) => {

"use strict";
module.exports = require("react-ga");

/***/ }),

/***/ 2820:
/***/ ((module) => {

"use strict";
module.exports = require("react-multi-select-component");

/***/ }),

/***/ 1187:
/***/ ((module) => {

"use strict";
module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3673:
/***/ ((module) => {

"use strict";
module.exports = require("slugify");

/***/ }),

/***/ 6153:
/***/ ((module) => {

"use strict";
module.exports = require("universal-cookie");

/***/ }),

/***/ 3706:
/***/ ((module) => {

"use strict";
module.exports = import("apollo-upload-client");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1678,9755,676,1664,5675,599,2102,3498,6344,7119,6112,9139], () => (__webpack_exec__(5541)));
module.exports = __webpack_exports__;

})();