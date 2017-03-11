import throttle from "./lodash.throttle";
class Lazyload {
  constructor () {
    this.elms = {};
    this.loading = null;
    this.failed = null;
    this.throttleFn = null;
    this.transitionTime = 400;
    this.listener();
  }
  listener () {
    document.addEventListener("scroll", this.handler.bind(this), true);
  }
  handler () {
    !this.throttleFn && (this.throttleFn = throttle(this.scroll, 300));
    this.throttleFn();
  }
  add (elm) {
    this.elms[elm.key] = elm;
  }
  remove (key) {
    delete this.elms[key];
  }
  scroll () {
    const keys = Object.keys(this.elms);
    for (let key of keys) {
      if (this.elms[key].dataset.success) {
        continue;
      }
      if (this.isElementInViewport(this.elms[key])) {
        this.elms[key].execute();
      } else {
        // this.refs[key].restore();
      }
    }
  }
  isElementInViewport (el) {
    const { top, left, bottom, right, height, width } = el.getBoundingClientRect();
    return (
      top + height >= 0 &&
      left + width >= 0 &&
      bottom - height <= (window.innerHeight || document.documentElement.clientHeight) &&
      right - width <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

export default new Lazyload();
