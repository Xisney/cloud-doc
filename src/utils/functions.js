// 关闭时，从openFileIds中获取到正确的索引，从而获取到activeId
export function getRightIndex(curIndex, len) {
  if (curIndex === len - 1) {
    return curIndex - 1 < 0 ? 0 : curIndex - 1;
  }
  return ++curIndex % len;
}

export function debounce(fn, delay = 200) {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
