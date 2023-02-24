"use strict";
exports.id = 8046;
exports.ids = [8046];
exports.modules = {

/***/ 8046:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "r8": () => (/* binding */ DiscList),
  "ie": () => (/* binding */ Downloads),
  "W_": () => (/* binding */ Navigation),
  "sH": () => (/* binding */ SharedForms),
  "rL": () => (/* binding */ StoreDownloads)
});

// UNUSED EXPORTS: providers, providersDownload

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: ./components/Selectors.jsx
var Selectors = __webpack_require__(9675);
// EXTERNAL MODULE: ./components/utils.js
var utils = __webpack_require__(599);
// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__(1187);
// EXTERNAL MODULE: ./components/SubmitButton.jsx
var SubmitButton = __webpack_require__(2628);
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(9114);
;// CONCATENATED MODULE: ./components/forms/AddPublisher.jsx





const mutation = client_.gql`
mutation createPublisher($name:String!){
  createPublisher(
    name: $name
  ) {
    id
    name
  }
}

`;
function AddPublisher() {
    const [mutate, { loading  }] = (0,client_.useMutation)(mutation);
    function handleSubmitForm(e) {
        mutate({
            mutation,
            variables: {
                name: e.target.elements.name.value
            }
        }).then((results)=>{
            external_react_toastify_.toast.success(`Added "${e.target.elements.name.value}" publisher succesfully!`);
            e.target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
        e.preventDefault();
        e.persist();
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mt-3",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "addPub",
                className: "mb-2",
                children: "Add Publisher"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "site-form blackblock",
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form, {
                    onSubmit: handleSubmitForm,
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 8,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                    type: "text",
                                    name: "name"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                    loading: loading,
                                    type: "submit",
                                    color: "primary",
                                    className: "mb-2",
                                    children: "Add Publisher"
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}

// EXTERNAL MODULE: external "form-serialize"
var external_form_serialize_ = __webpack_require__(684);
var external_form_serialize_default = /*#__PURE__*/__webpack_require__.n(external_form_serialize_);
;// CONCATENATED MODULE: ./components/forms/AddSeries.jsx








const AddSeries_mutation = client_.gql`
    mutation CreateSeries($slug:String!, $name:String!, $cover: Upload!){
      createSeries(
        name: $name
        slug: $slug
        cover: $cover
      ) {
        slug
        name
      }
    }
    
`;
function AddSeries() {
    const [slug, setSlug] = (0,external_react_.useState)("");
    const [mutate, { loading  }] = (0,client_.useMutation)(AddSeries_mutation);
    function handleSubmitForm(e) {
        e.preventDefault();
        e.persist();
        const data = external_form_serialize_default()(e.target, {
            hash: true
        });
        data.cover = e.target.elements.cover.files[0];
        mutate({
            mutation: AddSeries_mutation,
            variables: data
        }).then((results)=>{
            external_react_toastify_.toast.success(`Added "${data.name}" series succesfully!`);
            e.target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "addSeries",
                className: "mb-2 mt-3",
                children: "Add Series"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                className: "site-form blackblock",
                onSubmit: handleSubmitForm,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "slug",
                                            children: "Slug:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "slug",
                                            readOnly: true,
                                            value: slug
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Name:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "name",
                                            onChange: (e)=>setSlug((0,utils/* slugify */.lV)(e.target.value))
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "cover",
                                            children: "Cover:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            name: "cover",
                                            type: "file",
                                            accept: "image/*"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                            className: "m-auto",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                loading: loading,
                                type: "submit",
                                children: "Add Series"
                            })
                        })
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/AddGame.jsx









const AddGame_mutation = client_.gql`
mutation CreateGame($cover:Upload!, $releaseDate:String!, $slug:String!, $name:String!, $series: [String]!, $publishers:[ID]!, $platforms:[ID]){
  createGame(
    name: $name
    slug: $slug
    series: $series
    publishers: $publishers   
    releaseDate: $releaseDate
    cover: $cover,
    platforms: $platforms
  ) {
      slug
    }
  }
`;
function AddGame() {
    const [slug, setSlug] = (0,external_react_.useState)("");
    const [mutate, { loading  }] = (0,client_.useMutation)(AddGame_mutation);
    function handleSubmitForm(e) {
        e.preventDefault();
        e.persist();
        const game = external_form_serialize_default()(e.target, {
            hash: true
        });
        game.cover = e.target.elements.cover.files[0];
        game.releaseDate = new Date(game.releaseDate).toISOString().substring(0, 10);
        if (!game.series) game.series = [];
        if (!game.publishers) game.publishers = [];
        if (!game.platforms) game.platforms = [];
        mutate({
            mutation: AddGame_mutation,
            variables: game
        }).then((results)=>{
            external_react_toastify_.toast.success(`Added "${game.name}" game succesfully!`);
            e.target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "addGame",
                className: "mb-2 mt-3",
                children: "Add Game"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                className: "site-form blackblock",
                onSubmit: handleSubmitForm,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "slug",
                                            children: "Slug:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "slug",
                                            readOnly: true,
                                            value: slug
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Name:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "name",
                                            onChange: (e)=>setSlug((0,utils/* slugify */.lV)(e.target.value))
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "releaseDate",
                                            children: "Release Date:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "date",
                                            name: "releaseDate"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "series",
                                            children: "Series:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* SeriesSelector */.ov, {
                                            options: {
                                                name: "series"
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "publishers",
                                            children: "Publishers:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* PublisherSelector */.cZ, {
                                            options: {
                                                name: "publishers"
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "platforms",
                                            children: "Platforms:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* PlatformSelector */.J3, {
                                            categories: [
                                                "Game"
                                            ],
                                            options: {
                                                name: "platforms"
                                            }
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                            md: 4,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                        htmlFor: "cover",
                                        children: "Cover:"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                        name: "cover",
                                        type: "file",
                                        accept: "image/*"
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                            className: "m-auto",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                loading: loading,
                                type: "submit",
                                color: "primary",
                                children: "Add Game"
                            })
                        })
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/AddStudio.jsx







const AddStudio_mutation = client_.gql`
mutation CreateStudio($slug:String!, $name:String!){
  createStudio(
    name: $name
    slug: $slug
  ) {
    slug
    name
  }
}

`;
function AddStudio() {
    const [slug, setSlug] = (0,external_react_.useState)("");
    const [mutate] = (0,client_.useMutation)(AddStudio_mutation);
    function handleSubmitForm(e) {
        e.preventDefault();
        e.persist();
        const data = external_form_serialize_default()(e.target, {
            hash: true
        });
        mutate({
            mutation: AddStudio_mutation,
            variables: data
        }).then((results)=>{
            external_react_toastify_.toast.success(`Added "${data.name}" studio succesfully!`);
            e.target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "addStudio",
                className: "mb-2 mt-3",
                children: "Add Studio"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                className: "site-form blackblock",
                onSubmit: handleSubmitForm,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 6,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "slug",
                                            children: "Slug:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "slug",
                                            readOnly: true,
                                            value: slug
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 6,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Name:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "name",
                                            onChange: (e)=>setSlug((0,utils/* slugify */.lV)(e.target.value))
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                            className: "m-auto",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                                type: "submit",
                                color: "primary",
                                children: "Add Studio"
                            })
                        })
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/AddAnimation.jsx







const AddAnimation_mutation = client_.gql`
mutation CreateAnimation($cover:Upload, $subTitle:String, $releaseDate:String!, $title:String!, $studios: [String]!){
  createAnimation(
    title: $title
    subTitle: $subTitle
    studios: $studios   
    releaseDate: $releaseDate
    cover: $cover
  ) {
      id
    }
  }
`;
function AddAnimation() {
    const [mutate, { loading  }] = (0,client_.useMutation)(AddAnimation_mutation);
    function handleSubmitForm(e) {
        e.preventDefault();
        e.persist();
        const animation = external_form_serialize_default()(e.target, {
            hash: true
        });
        animation.cover = e.target.elements.cover.files[0];
        animation.releaseDate = new Date(animation.releaseDate).toISOString().substring(0, 10);
        mutate({
            mutation: AddAnimation_mutation,
            variables: animation
        }).then((results)=>{
            external_react_toastify_.toast.success(`Added "${animation.title}" animation succesfully!`);
            e.target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "addAnim",
                className: "mb-2 mt-3",
                children: "Add Animation"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                className: "site-form blackblock",
                onSubmit: handleSubmitForm,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 6,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Title:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "title"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 6,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Sub-title:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "subTitle"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "releaseDate",
                                            children: "Release Date:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "date",
                                            name: "releaseDate"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "studios",
                                            children: "Studios:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* StudioSelector */.ln, {
                                            options: {
                                                name: "studios"
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "cover",
                                            children: "Cover:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            name: "cover",
                                            type: "file",
                                            accept: "image/*",
                                            required: true
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                            className: "m-auto",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                loading: loading,
                                type: "submit",
                                color: "primary",
                                children: "Add Animation"
                            })
                        })
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/AddPlatform.jsx





const AddPlatform_mutation = client_.gql`
    mutation CreatePlatform($name:String!, $type: String!){
      createPlatform(
        name: $name
        type: $type
      ) {
        id
        name
      }
    }
    
`;
function AddPlatform() {
    const [mutate] = (0,client_.useMutation)(AddPlatform_mutation);
    function handleSubmitForm(e) {
        const variables = external_form_serialize_default()(e.target, {
            hash: true
        });
        mutate({
            mutation: AddPlatform_mutation,
            variables
        }).then((results)=>{
            external_react_toastify_.toast.success(`Added "${e.target.elements.name.value}" platform succesfully!`);
            e.target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
        e.preventDefault();
        e.persist();
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mt-3",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "addPlat",
                className: "mb-2",
                children: "Add Platform"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "site-form blackblock",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                    onSubmit: handleSubmitForm,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 6,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "name",
                                                children: "Name:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                                type: "text",
                                                name: "name",
                                                required: true
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 6,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "type",
                                                children: "Type:"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                                className: "form-control",
                                                name: "type",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                        value: "Game",
                                                        children: "Game"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                        value: "Animation",
                                                        children: "Animation"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                className: "m-auto",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                                    type: "submit",
                                    color: "primary",
                                    children: "Add Platform"
                                })
                            })
                        })
                    ]
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/EditPublisher.jsx








const mutationUpdate = client_.gql`
    mutation UpdatePublisher($id: ID!, $name:String!){
      updatePublisher(
        id: $id
        name: $name
      ) {
        id
        name
      }
    } 
`;
const mutationDelete = client_.gql`
    mutation DeletePublisher($id: ID!){
      deletePublisher(id: $id)
    }   
`;
function EditPublisher() {
    const formRef = (0,external_react_.useRef)(null);
    const [mutateUpdate, { loading: loadingUpdate  }] = (0,client_.useMutation)(mutationUpdate);
    const [mutateDelete, { loading: loadingDelete  }] = (0,client_.useMutation)(mutationDelete);
    function handleSubmitForm(mutate, verb) {
        const target = formRef.current;
        mutate({
            variables: external_form_serialize_default()(target, {
                hash: true
            })
        }).then((results)=>{
            external_react_toastify_.toast.success(`${verb} publisher succesfully!`);
            target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mt-3",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "editPub",
                className: "mb-2",
                children: "Edit Publisher"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "site-form blackblock",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                    ref: formRef,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 6,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "id",
                                                children: "Publisher:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* PublisherSelector */.cZ, {
                                                options: {
                                                    isSingle: true,
                                                    required: true,
                                                    name: "id"
                                                }
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 6,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "name",
                                                children: "Name:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                                type: "text",
                                                name: "name",
                                                required: true
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    xs: "auto",
                                    className: "my-auto mx-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                        type: "button",
                                        onClick: ()=>handleSubmitForm(mutateUpdate, "Edited"),
                                        loading: loadingUpdate,
                                        children: "Save Changes"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    xs: "auto",
                                    className: "my-auto mx-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                        type: "button",
                                        onClick: ()=>handleSubmitForm(mutateDelete, "Deleted"),
                                        loading: loadingDelete,
                                        children: "Delete Publisher"
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/EditPlatform.jsx








const query = client_.gql`
  query Platform($key: ID!){
    platform(id: $key){
      name
      type
    }
  }
`;
const queryCategories = client_.gql`
      query {
        categories {
          name
        }     
      }
    `;
const EditPlatform_mutationUpdate = client_.gql`
    mutation UpdatePlatform($key:ID!, $name:String, $type: String!){
      updatePlatform(
        key: $key
        name: $name
        type: $type
      ) {
        id
        name
      }
    }
    
`;
const EditPlatform_mutationDelete = client_.gql`
    mutation DeletePlatform($key:ID!){
      deletePlatform(key: $key)
    }
    
`;
function EditPlatform() {
    const { data: categoryData = {}  } = (0,client_.useQuery)(queryCategories);
    const { categories =[]  } = categoryData;
    const formRef = (0,external_react_.useRef)(null);
    const [mutateUpdate, { loading: loadingUpdate  }] = (0,client_.useMutation)(EditPlatform_mutationUpdate);
    const [mutateDelete, { loading: loadingDelete  }] = (0,client_.useMutation)(EditPlatform_mutationDelete);
    const [getPlatform, { data , loading: loadingInfo  }] = (0,client_.useLazyQuery)(query);
    function handleSubmitForm(mutate, verb) {
        const target = formRef.current;
        const variables = external_form_serialize_default()(target, {
            hash: true
        });
        mutate({
            variables
        }).then((results)=>{
            external_react_toastify_.toast.success(`${verb} platform succesfully!`);
            target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mt-3",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "editPlat",
                className: "mb-2",
                children: "Edit Platform"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "site-form blackblock",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                    ref: formRef,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 4,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "key",
                                                children: "Platform:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* PlatformSelector */.J3, {
                                                categories: categories.map((c)=>c.name),
                                                options: {
                                                    isSingle: true,
                                                    required: true,
                                                    name: "key",
                                                    onChange: (row)=>getPlatform({
                                                            variables: {
                                                                key: row.value
                                                            }
                                                        }),
                                                    loading: loadingInfo
                                                }
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 4,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "name",
                                                children: "Name:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                                type: "text",
                                                name: "name",
                                                required: true,
                                                defaultValue: data && data.platform.name
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 4,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "type",
                                                children: "Type:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("select", {
                                                className: "form-control",
                                                name: "type",
                                                children: categories.map((c)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                        selected: data && data.platform.type === c.name,
                                                        value: c.name,
                                                        children: c.name
                                                    }, c.name))
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    xs: "auto",
                                    className: "my-auto mx-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                        type: "button",
                                        onClick: ()=>handleSubmitForm(mutateUpdate, "Edited"),
                                        loading: loadingUpdate,
                                        children: "Save Changes"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    xs: "auto",
                                    className: "my-auto mx-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                        type: "button",
                                        onClick: ()=>handleSubmitForm(mutateDelete, "Deleted"),
                                        loading: loadingDelete,
                                        children: "Delete Platform"
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/EditSeries.jsx








const EditSeries_query = client_.gql`
  query Series($slug: String!){
    seriesOne(slug: $slug){
      name
    }
  }
`;
const EditSeries_mutationUpdate = client_.gql`
    mutation UpdateSeries($slug:String!, $name:String, $cover: Upload){
      updateSeries(
        name: $name
        slug: $slug
        cover: $cover
      ) {
        slug
        name
      }
    }
`;
const EditSeries_mutationDelete = client_.gql`
    mutation DeleteSeries($slug:String!){
      deleteSeries(slug: $slug)
    }
`;
function EditSeries() {
    const formRef = (0,external_react_.useRef)(null);
    const [mutateUpdate, { loading: loadingUpdate  }] = (0,client_.useMutation)(EditSeries_mutationUpdate);
    const [mutateDelete, { loading: loadingDelete  }] = (0,client_.useMutation)(EditSeries_mutationDelete);
    const [getSeries, { data , error , loading: loadingInfo  }] = (0,client_.useLazyQuery)(EditSeries_query);
    (0,external_react_.useEffect)(()=>{
        if (!error) return;
        console.log(error);
        external_react_toastify_.toast.error(error.message, {
            autoclose: false
        });
    }, [
        error
    ]);
    function handleSubmitForm(mutate, verb) {
        const target = formRef.current;
        const data = external_form_serialize_default()(target, {
            hash: true
        });
        if (target.elements.cover.files) data.cover = target.elements.cover.files[0];
        mutate({
            variables: data
        }).then((results)=>{
            external_react_toastify_.toast.success(`${verb} series succesfully!`);
            target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "editSeries",
                className: "mb-2 mt-3",
                children: "Edit Series"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                className: "site-form blackblock",
                ref: formRef,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "slug",
                                            children: "Series:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* SeriesSelector */.ov, {
                                            options: {
                                                isSingle: true,
                                                required: true,
                                                name: "slug",
                                                loading: loadingInfo,
                                                onChange: (row)=>getSeries({
                                                        variables: {
                                                            slug: row.value
                                                        }
                                                    })
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Name:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "name",
                                            defaultValue: data && data.seriesOne.name
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "cover",
                                            children: "Cover:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            name: "cover",
                                            type: "file",
                                            accept: "image/*"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                xs: "auto",
                                className: "my-auto mx-1",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                    type: "button",
                                    onClick: ()=>handleSubmitForm(mutateUpdate, "Edited"),
                                    loading: loadingUpdate,
                                    children: "Save Changes"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                xs: "auto",
                                className: "my-auto mx-1",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                    type: "button",
                                    onClick: ()=>handleSubmitForm(mutateDelete, "Deleted"),
                                    loading: loadingDelete,
                                    children: "Delete Series"
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/EditGame.jsx








const EditGame_query = client_.gql`
  query Game($slug: String!){
    game(slug:$slug){
      name
      releaseDate
      publishers {
        value: id
        label: name
      }
      platforms {
        value: id
        label: name
      }
      series {
        value: slug
        label: name
      }
    }
  }
`;
const EditGame_mutationUpdate = client_.gql`
    mutation UpdateGame($cover:Upload, $releaseDate:String, $slug:String, $name:String, $series: [String], $publishers:[ID], $platforms:[ID]){
      updateGame(
        name: $name
        slug: $slug
        series: $series
        publishers: $publishers   
        releaseDate: $releaseDate
        cover: $cover,
        platforms: $platforms
      ) {
          slug
        }
      }
`;
const EditGame_mutationDelete = client_.gql`
    mutation DeleteGame($slug: String!){
      deleteGame(slug: $slug)
    }
`;
function EditGame() {
    const formRef = (0,external_react_.useRef)(null);
    const [mutateUpdate, { loading: loadingUpdate  }] = (0,client_.useMutation)(EditGame_mutationUpdate);
    const [mutateDelete, { loading: loadingDelete  }] = (0,client_.useMutation)(EditGame_mutationDelete);
    const [getGame, { data , loading , error  }] = (0,client_.useLazyQuery)(EditGame_query);
    (0,external_react_.useEffect)(()=>{
        if (!error) return;
        console.log(error);
        external_react_toastify_.toast.error(error.message, {
            autoclose: false
        });
    }, [
        error
    ]);
    function handleSubmitForm(mutate, verb) {
        const target = formRef.current;
        const game = external_form_serialize_default()(target, {
            hash: true
        });
        game.cover = target.elements.cover.files[0];
        game.releaseDate = new Date(game.releaseDate).toISOString().substring(0, 10);
        mutate({
            variables: game
        }).then((results)=>{
            external_react_toastify_.toast.success(`${verb} "${game.name}" game succesfully!`);
            target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "editGame",
                className: "mb-2 mt-3",
                children: "Edit Game"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                className: "site-form blackblock",
                ref: formRef,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "slug",
                                            children: "Game:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* GameSelector */.D_, {
                                            options: {
                                                isSingle: true,
                                                required: true,
                                                name: "slug",
                                                loading,
                                                onChange: (row)=>getGame({
                                                        variables: {
                                                            slug: row.value
                                                        }
                                                    })
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Name:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "name",
                                            defaultValue: data && data.game.name
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "releaseDate",
                                            children: "Release Date:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "date",
                                            name: "releaseDate",
                                            defaultValue: data && data.game.releaseDate
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    data && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "series",
                                            children: "Series:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* SeriesSelector */.ov, {
                                            options: {
                                                loading,
                                                name: "series",
                                                defaultValue: data?.game.series
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "publishers",
                                            children: "Publishers:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* PublisherSelector */.cZ, {
                                            options: {
                                                loading: loading,
                                                name: "publishers",
                                                defaultValue: data?.game.publishers
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "platforms",
                                            children: "Platforms:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* PlatformSelector */.J3, {
                                            categories: [
                                                "Game"
                                            ],
                                            options: {
                                                name: "platforms",
                                                defaultValue: data?.game.platforms
                                            }
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                            md: 4,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                        htmlFor: "cover",
                                        children: "Cover:"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                        name: "cover",
                                        type: "file",
                                        accept: "image/*"
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                xs: "auto",
                                className: "my-auto mx-1",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                    type: "button",
                                    onClick: ()=>handleSubmitForm(mutateUpdate, "Edited"),
                                    loading: loadingUpdate,
                                    children: "Save Changes"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                xs: "auto",
                                className: "my-auto mx-1",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                    type: "button",
                                    onClick: ()=>handleSubmitForm(mutateDelete, "Deleted"),
                                    loading: loadingDelete,
                                    children: "Delete Game"
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/EditStudio.jsx








const EditStudio_mutationUpdate = client_.gql`
    mutation UpdateStudio($slug: String!, $name:String!){
      updateStudio(
        slug: $slug
        name: $name
      ) {
        slug
      }
    }
`;
const EditStudio_mutationDelete = client_.gql`
    mutation DeleteStudio($slug: String!){
      deleteStudio(slug: $slug)
    }
`;
function EditStudio() {
    const formRef = (0,external_react_.useRef)(null);
    const [defaultName, setName] = (0,external_react_.useState)();
    const [mutateUpdate, { loading: loadingUpdate  }] = (0,client_.useMutation)(EditStudio_mutationUpdate);
    const [mutateDelete, { loading: loadingDelete  }] = (0,client_.useMutation)(EditStudio_mutationDelete);
    function handleSubmitForm(mutate, verb) {
        const target = formRef.current;
        mutate({
            variables: external_form_serialize_default()(target, {
                hash: true
            })
        }).then((results)=>{
            external_react_toastify_.toast.success(`${verb} studio succesfully!`);
            target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mt-3",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "editStudio",
                className: "mb-2",
                children: "Edit Studio"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "site-form blackblock",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                    ref: formRef,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 6,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "slug",
                                                children: "Studio:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* StudioSelector */.ln, {
                                                options: {
                                                    isSingle: true,
                                                    required: true,
                                                    name: "slug",
                                                    onChange: (row)=>setName(row.label)
                                                }
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 6,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                htmlFor: "name",
                                                children: "Name:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                                type: "text",
                                                name: "name",
                                                required: true,
                                                defaultValue: defaultName
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    xs: "auto",
                                    className: "my-auto mx-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                        type: "button",
                                        onClick: ()=>handleSubmitForm(mutateUpdate, "Edited"),
                                        loading: loadingUpdate,
                                        children: "Save Changes"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    xs: "auto",
                                    className: "my-auto mx-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                        type: "button",
                                        onClick: ()=>handleSubmitForm(mutateDelete, "Deleted"),
                                        loading: loadingDelete,
                                        children: "Delete Studio"
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/forms/EditAnimation.jsx








const EditAnimation_query = client_.gql`
  query Anim($id: ID!){
    animation(id: $id){
      title
      subTitle
      releaseDate
      studios {
        value: slug
        label: name
      }
    }
  }
`;
const EditAnimation_mutationUpdate = client_.gql`
mutation UpdateAnimation($id: ID!, $cover:Upload, $subTitle:String, $releaseDate:String, $title:String, $studios: [String]){
  updateAnimation(
    id: $id
    title: $title
    subTitle: $subTitle
    studios: $studios   
    releaseDate: $releaseDate
    cover: $cover
  ) {
      id
    }
  }
`;
const EditAnimation_mutationDelete = client_.gql`
mutation DeleteAnimation($id: ID!){
  deleteAnimation(id: $id) 
}
`;
function EditAnimation_AddAnimation() {
    const formRef = (0,external_react_.useRef)(null);
    const [mutateUpdate, { loading: loadingUpdate  }] = (0,client_.useMutation)(EditAnimation_mutationUpdate);
    const [mutateDelete, { loading: loadingDelete  }] = (0,client_.useMutation)(EditAnimation_mutationDelete);
    const [getAnim, { data , error , loading: loadingInfo  }] = (0,client_.useLazyQuery)(EditAnimation_query);
    (0,external_react_.useEffect)(()=>{
        if (!error) return;
        console.log(error);
        external_react_toastify_.toast.error(error.message, {
            autoclose: false
        });
    }, [
        error
    ]);
    function handleSubmitForm(mutate, verb) {
        const target = formRef.current;
        const animation = external_form_serialize_default()(target, {
            hash: true
        });
        animation.cover = target.elements.cover.files[0];
        animation.releaseDate = new Date(animation.releaseDate).toISOString().substring(0, 10);
        mutate({
            variables: animation
        }).then((results)=>{
            external_react_toastify_.toast.success(`${verb} "${animation.title}" animation succesfully!`);
            target.reset();
        }).catch((err)=>{
            console.log(err);
            external_react_toastify_.toast.error(err.message, {
                autoclose: false
            });
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "editAnim",
                className: "mb-2 mt-3",
                children: "Edit Animation"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form, {
                className: "site-form blackblock",
                ref: formRef,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Animation:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* AnimSelector */.S7, {
                                            options: {
                                                isSingle: true,
                                                name: "id",
                                                loading: loadingInfo,
                                                onChange: (row)=>getAnim({
                                                        variables: {
                                                            id: row.value
                                                        }
                                                    })
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Title:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "title",
                                            defaultValue: data && data.animation.title
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: 4,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "name",
                                            children: "Sub-title:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "text",
                                            name: "subTitle",
                                            defaultValue: data && data.animation.subTitle
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "releaseDate",
                                            children: "Release Date:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            type: "date",
                                            name: "releaseDate",
                                            defaultValue: data && data.animation.releaseDate
                                        })
                                    ]
                                })
                            }),
                            data && /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "studios",
                                            children: "Studios:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* StudioSelector */.ln, {
                                            options: {
                                                name: "studios",
                                                defaultValue: data.animation.studios
                                            }
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            htmlFor: "cover",
                                            children: "Cover:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            name: "cover",
                                            type: "file",
                                            accept: "image/*"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                xs: "auto",
                                className: "my-auto mx-1",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                    type: "button",
                                    onClick: ()=>handleSubmitForm(mutateUpdate, "Edited"),
                                    loading: loadingUpdate,
                                    children: "Save Changes"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                xs: "auto",
                                className: "my-auto mx-1",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(SubmitButton/* default */.Z, {
                                    type: "button",
                                    onClick: ()=>handleSubmitForm(mutateDelete, "Deleted"),
                                    loading: loadingDelete,
                                    children: "Delete Animation"
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/SharedForms.jsx

















const providers = [
    {
        value: "SOON",
        label: "SOON"
    },
    {
        value: "amazon",
        label: "Amazon"
    },
    {
        value: "amazon_jp",
        label: "Amazon JP"
    },
    {
        value: "play_asia",
        label: "Play Asia"
    },
    {
        value: "cd_japan",
        label: "CD Japan"
    },
    {
        value: "spotify",
        label: "Spotify"
    },
    {
        value: "google_play",
        label: "Google Play"
    },
    {
        value: "steam",
        label: "Steam"
    },
    {
        value: "mora",
        label: "Mora"
    },
    {
        value: "apple_music",
        label: "Apple Music"
    },
    {
        value: "ototoy",
        label: "OTOTOY"
    },
    {
        value: "bandcamp",
        label: "Bandcamp"
    },
    {
        value: "deezer",
        label: "Deezer"
    }
];
const providersDownload = [
    {
        value: "SOON",
        label: "SOON"
    },
    {
        value: "MEGA",
        label: "MEGA"
    },
    {
        value: "MEDIAFIRE",
        label: "MediaFire"
    },
    {
        value: "GOOGLEDRIVE",
        label: "Google Drive"
    },
    {
        value: "TERABOX",
        label: "TeraBox"
    },
    {
        value: "MIRROR",
        label: "Mirror"
    }
];
function Navigation({ title  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "sticky-top",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "mb-2 mt-3 text-center",
                children: "Navigation"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "py-2 site-form blackblock d-flex flex-column",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                        href: "#addAlbum",
                        children: [
                            title,
                            " Album"
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#addPub",
                        children: "Add Publisher"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#addPlat",
                        children: "Add Platform"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#addSeries",
                        children: "Add Series"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#addGame",
                        children: "Add Game"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#addStudio",
                        children: "Add Studio"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#addAnim",
                        children: "Add Animation"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        className: "mt-3",
                        href: "#editPub",
                        children: "Edit Publisher"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#editPlat",
                        children: "Edit Platform"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#editSeries",
                        children: "Edit Series"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#editGame",
                        children: "Edit Game"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#editStudio",
                        children: "Edit Studio"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#editAnim",
                        children: "Edit Animation"
                    })
                ]
            })
        ]
    });
}
function SharedForms() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(AddPublisher, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(AddPlatform, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(AddSeries, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(AddGame, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(AddStudio, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(AddAnimation, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(EditPublisher, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(EditPlatform, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(EditSeries, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(EditGame, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(EditStudio, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(EditAnimation_AddAnimation, {})
        ]
    });
}
function DiscList(props) {
    const { defaults =[
        {
            number: 0
        }
    ]  } = props;
    const [keys, setKeys] = (0,external_react_.useState)(defaults);
    function addEmptyDisc() {
        const lastDisc = keys[keys.length - 1];
        setKeys([
            ...keys,
            {
                number: lastDisc ? lastDisc.number + 1 : 0
            }
        ]);
    }
    function clearEmptyDiscs() {
        const newKeys = [];
        keys.forEach((k)=>{
            const body = document.getElementById(`discInput${k.number}`).value;
            if (!body || body.length === 0) return;
            newKeys.push({
                number: newKeys.length,
                body
            });
        });
        setKeys(newKeys);
    }
    (0,external_react_.useEffect)(()=>{
        setKeys(defaults);
    }, [
        defaults
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                            className: "me-2",
                            color: "primary",
                            onClick: addEmptyDisc,
                            children: "Add Disc"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                            color: "primary",
                            onClick: clearEmptyDiscs,
                            children: "Remove empty discs"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                className: "mt-3",
                children: keys.map((disc)=>/*#__PURE__*/ jsx_runtime_.jsx(DiscField, {
                        ...disc
                    }, disc.number))
            })
        ]
    });
}
function DiscField(props) {
    const { number , body =""  } = props;
    const formRef = (0,external_react_.useRef)(null);
    (0,external_react_.useEffect)(()=>{
        formRef.current.value = body;
    }, [
        body
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
        md: 6,
        className: "mb-3",
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                md: 12,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Label, {
                            children: [
                                "Disc ",
                                number + 1,
                                ":"
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                            ref: formRef,
                            required: true,
                            name: "discs[][body]",
                            as: "textarea",
                            id: `discInput${number}`,
                            defaultValue: body
                        })
                    ]
                })
            })
        })
    });
}
function StoreDownloads(props) {
    const defaults = props.defaults || [];
    const [keys, setKeys] = (0,external_react_.useState)(props.defaults ? defaults.map((d, i)=>i) : [
        0
    ]);
    (0,external_react_.useEffect)(()=>{
        if (keys.length === 0) setKeys([
            0
        ]);
    }, [
        keys
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                            className: "me-2",
                            color: "primary",
                            onClick: ()=>setKeys([
                                    ...keys,
                                    keys[keys.length - 1] + 1
                                ]),
                            children: "Add Store link"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                            color: "primary",
                            onClick: ()=>setKeys((0,utils/* clearKeys */.z5)(keys, [
                                    "storeInput"
                                ])),
                            children: "Remove empty links"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                className: "mt-3",
                children: keys.map((key, i)=>/*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                        md: 6,
                        className: "mb-3",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 6,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                children: "Provider:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* SimpleSelector */.d7, {
                                                isSingle: true,
                                                name: `stores[${i}][provider]`,
                                                defaultValue: defaults[key] ? providers.find((e)=>e.value === defaults[key].provider) : providers[0],
                                                options: providers
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: 6,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                children: "Url:"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                                required: true,
                                                name: `stores[${i}][url]`,
                                                defaultValue: defaults[key] ? defaults[key].url : "",
                                                id: `storeInput${key}`,
                                                type: "text"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    }, key))
            })
        ]
    });
}
function DownloadList(props) {
    const { valueList =[] , length =0 , setValueList , prefix =0  } = props;
    function removeItem(index) {
        const newArray = [
            ...valueList
        ];
        newArray.splice(index, 1);
        setValueList(newArray);
    }
    function removeLink(i, i2) {
        const newArray = [
            ...valueList
        ];
        const newLinks = [
            ...newArray[i].links
        ];
        newLinks.splice(i2, 1);
        newArray[i] = {
            ...newArray[i],
            links: newLinks
        };
        setValueList(newArray);
    }
    function addLink(i) {
        const newArray = [
            ...valueList
        ];
        const newLinks = [
            ...newArray[i].links,
            {
                id: `n${newArray[i].links.length}`
            }
        ];
        newArray[i] = {
            ...newArray[i],
            links: newLinks
        };
        setValueList(newArray);
    }
    return valueList.map((cat, i)=>/*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Col, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                        className: "mb-3",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                    className: "mt-1",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Label, {
                                            children: [
                                                "Category ",
                                                prefix + i + 1,
                                                " title:"
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            defaultValue: cat.title,
                                            required: true,
                                            name: `downloads[${i + prefix}][title]`,
                                            type: "text"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: "auto",
                                className: "mt-auto",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Group, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                                        color: "primary",
                                        onClick: ()=>removeItem(i),
                                        disabled: length === 1,
                                        children: "Remove category"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: "auto",
                                className: "mt-auto",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Group, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                                        className: "me-2",
                                        color: "primary",
                                        onClick: ()=>addLink(i),
                                        children: "Add Download Link"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                md: "auto",
                                className: "mt-auto mb-3",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "form-check",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                            defaultValue: cat.small,
                                            type: "checkbox",
                                            name: `downloads[${i + prefix}][small]`,
                                            className: "form-check-input"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                            className: "form-check-label",
                                            htmlFor: `downloads[${i + prefix}][small]`,
                                            children: "Small Title"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    cat.links.map((link, i2)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                            className: "mb-3",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                                md: 4,
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                            children: "Provider:"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx(Selectors/* SimpleSelector */.d7, {
                                                            isSingle: true,
                                                            defaultValue: providersDownload.find((p)=>p.value === link.provider),
                                                            name: `downloads[${i + prefix}][links][${i2}][provider]`,
                                                            options: providersDownload
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                                md: 4,
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                            children: "Url:"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                                            defaultValue: link.url,
                                                            required: true,
                                                            type: "text",
                                                            name: `downloads[${i + prefix}][links][${i2}][url]`
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                                md: 4,
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Form.Group, {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Label, {
                                                            children: "Direct Url:"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.FormControl, {
                                                            defaultValue: link.directUrl,
                                                            required: true,
                                                            type: "text",
                                                            name: `downloads[${i + prefix}][links][${i2}][directUrl]`
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                                    md: "auto",
                                    className: "mt-auto",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Group, {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                                            color: "primary",
                                            onClick: ()=>removeLink(i, i2),
                                            children: "Remove link"
                                        })
                                    })
                                })
                            ]
                        }, link.id))
                ]
            })
        }, cat.id));
}
function Downloads(props) {
    const { defaults =[]  } = props;
    const [defaultValues, setDefaultValues] = (0,external_react_.useState)(defaults);
    const [newValues, setNewValues] = (0,external_react_.useState)([]);
    const length = defaultValues.length + newValues.length;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(DownloadList, {
                valueList: defaultValues,
                setValueList: setDefaultValues,
                length: length
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(DownloadList, {
                valueList: newValues,
                setValueList: setNewValues,
                length: length,
                prefix: defaultValues.length
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                className: "mb-3",
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                        className: "me-2",
                        color: "primary",
                        onClick: ()=>setNewValues([
                                ...newValues,
                                {
                                    id: `n${newValues.length}`,
                                    links: []
                                }
                            ]),
                        children: "Add Download Section"
                    })
                })
            })
        ]
    });
}


/***/ })

};
;