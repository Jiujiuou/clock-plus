export const getNumberList = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const getTenAndUnit = (number) => {
  const ten = Math.floor(number / 10);
  const unit = number % 10;
  return { ten, unit };
};

export const getTranslateY = (number, size) => {
  return {
    ten: -(Math.floor(number / 10) * size),
    unit: -((number % 10) * size),
  };
};
