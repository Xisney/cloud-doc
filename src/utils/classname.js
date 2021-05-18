export default function classname(obj) {
  const res = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      res.push(key);
    }
  });
  return res.join(" ");
}
