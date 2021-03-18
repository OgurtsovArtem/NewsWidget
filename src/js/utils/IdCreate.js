function id() {
  return `_${Math.random().toString(9).substr(2, 9)}`;
}

export default id;
