import lazy from "./lazyload";
import directive from "./directive";
export default {
  install (Vue, opts) {
    if (typeof opts === "object") {
      opts.loading && (lazy.loading = opts.loading);
      opts.failed && (lazy.failed = opts.failed);
    }
    new Image(lazy.loading);
    new Image(lazy.failed);
    Vue.directive("lazyload", directive);
  }
};
