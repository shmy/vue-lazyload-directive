import lazy from "./lazyload";
const wrapper = (el, url) => {
  el.execute = () => {
    if (el.dataset.success) return;
    const image = new Image();
    image.src = url;
    image.onload = image.onerror = ({ type }) => {
      el.style.opacity = 0.2;
      setTimeout(() => {
        const address = type === "error" ? lazy.failed : url;
        address && (el.style.backgroundImage = `url("${address}")`);
        el.dataset.success = 1;
        el.style.opacity = 1;
      }, lazy.transitionTime);
    };
  };
};
// 图像预加载
export default {
  inserted (el, binding) {
    el.style.transition = `opacity ${lazy.transitionTime}ms`;
    el.style.opacity = 1;
    lazy.loading && (el.style.backgroundImage = `url(${lazy.loading})`);
    el.key = `key_${Math.random().toString(36).substr(2, 6)}`;
    wrapper(el, binding.value);
    lazy.add(el);
    lazy.isElementInViewport(el) && el.execute();
  },
  update (el, binding) {
    if (binding.oldValue === binding.value) return;
    el.dataset.success = "";
    wrapper(el, binding.value);
    lazy.isElementInViewport(el) && el.execute();
  },
  unbind (el) {
    lazy.remove(el.key);
  }
};
