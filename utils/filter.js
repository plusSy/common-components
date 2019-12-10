const Filter = {
  // 补零
  fillZero: num => {
      return num < 10 ? "0" + num : num;
  }
};
export default Filter;
