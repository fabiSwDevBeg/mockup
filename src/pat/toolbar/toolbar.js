import $ from "jquery";
import { BasePattern } from "@patternslib/patternslib/src/core/basepattern";
import Parser from "@patternslib/patternslib/src/core/parser";
import registry from "@patternslib/patternslib/src/core/registry";
import utils from "../../core/utils";
import Cookies from "js-cookie";

export const parser = new Parser("toolbar");
parser.addArgument("update-trigger", "structure-url-changed");
parser.addArgument("render-url", "@@render-toolbar");

class Pattern extends BasePattern {
    static name = "toolbar";
    static trigger = ".pat-toolbar";
    static parser = parser;

    parser_group_options = false;

    async init() {
        if (window.__patternslib_import_styles) {
            import("./toolbar.scss");
        }

        $("body").on(this.options["update-trigger"], (e, path) => {
            $.ajax({
                url: $("body").attr("data-portal-url") + path + "/" + this.options["render-url"],
            }).done((data) => {
                const wrapper = $(utils.parseBodyTag(data));
                const $main_toolbar = wrapper.find("#edit-zone .plone-toolbar-main");
                const $personal_tools = wrapper.find(
                    "#edit-zone #collapse-personaltools"
                );
                // setup modals
                registry.scan($main_toolbar);
                $(".plone-toolbar-main", this.$el).replaceWith($main_toolbar);
                $("#collapse-personaltools", this.$el).replaceWith($personal_tools);
            });
        });

        const $el = $(this.el);

        // unpin toolbar and save state
        $el.on("click", ".toolbar-collapse", () => {
            $("body").removeClass("plone-toolbar-left-expanded");
            Cookies.set("plone-toolbar", JSON.stringify({ expanded: false }), {
                path: "/",
            });
        });

        // pin toolbar and save state
        $el.on("click", ".toolbar-expand", () => {
            $("body").addClass("plone-toolbar-left-expanded");
            Cookies.set("plone-toolbar", JSON.stringify({ expanded: true }), {
                path: "/",
            });
        });

        this.el.classList.add("initialized");
    }
}
registry.register(Pattern);
export default Pattern;
export { Pattern };
