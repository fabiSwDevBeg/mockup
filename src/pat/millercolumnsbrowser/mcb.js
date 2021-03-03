//import $ from "jquery";
import _ from "underscore";
import Base from "patternslib/src/core/base";
import Parser from "patternslib/src/core/parser";
import _t from "../../core/i18n-wrapper";
//import utils from "../../core/utils";

// This pattern
import registry from "patternslib/src/core/registry";
import MillerColumnsBrowser from "./src/MillerColumnsBrowser.svelte";
const parser = new Parser("contentbrowser");

parser.addArgument("vocabulary-url", "http://localhost:8081/Plone/@@getVocabulary");
parser.addArgument("attributes", "UID, Title, portal_type, path, getURL, getIcon, is_folderish, review_state");

//import "./relateditems.scss";

// const KEY = {
//     LEFT: 37,
//     RIGHT: 39,
// };


export default Base.extend({
    name: "contentbrowser",
    trigger: ".pat-contentbrowser",
    //parser: "mockup",
    // currentPath: undefined,
    // selectedUIDs: [],
    // openAfterInit: undefined,
    // defaults: {
    //     // main option
    //     vocabularyUrl: null, // must be set to work

    //     // more options
    //     attributes: [
    //         "UID",
    //         "Title",
    //         "portal_type",
    //         "path",
    //         "getURL",
    //         "getIcon",
    //         "is_folderish",
    //         "review_state",
    //     ], // used by utils.QueryHelper
    //     basePath: "",
    //     pageSize: 10,
    //     browsing: undefined,
    //     closeOnSelect: true,
    //     contextPath: undefined,
    //     favorites: [],
    //     // orderable: true, // mockup-patterns-select2
    //     pathOperator: "plone.app.querystring.operation.string.path",
    //     rootPath: "/",
    //     rootUrl: "", // default to be relative.
    //     scanSelection: false, // False, to no unnecessarily use CPU time on this.
    //     selectableTypes: null, // null means everything is selectable, otherwise a list of strings to match types that are selectable
    //     separator: ",",
    //     sortOn: null,
    //     sortOrder: "ascending",
    //     tokenSeparators: [",", " "],
    //     // upload: false,
    //     // uploadAllowView: undefined,
    //     // width: "100%",

    //     // needed
    //     multiple: true,
    // },

    browseTo: function (path) {
        var self = this;
        // self.emit("before-browse");
        self.currentPath = path;
        // $(self.el).select2("close");
        // self.renderToolbar();
        // $(self.el).select2("open");
        // self.emit("after-browse");
    },

    isSelectable: function (item) {
        var self = this;
        if (item.selectable === false) {
            return false;
        }
        if (self.options.selectableTypes === null) {
            return true;
        } else {
            return (
                self.options.selectableTypes.indexOf(item.portal_type) !== -1
            );
        }
    },

    init: function () {
        console.log("init mcb");
        this.options = parser.parse(this.el, this.options);
        console.log("self.options: ", this.options);
        this.component_instance = new MillerColumnsBrowser({
            target: this.el,
            // hydrate: true,
            props: {
                maxDepth: this.options.maxDepth,
                vocabularyUrl: this.options.vocabularyUrl,
            },
        });
    },
});