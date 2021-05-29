const slugify = (text) => {
  const textNormalize = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  return textNormalize
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0100-\uFFFF\w-]/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const formatArrayToString = (raw) => {
  const stepOne = raw.join(", ");
  const stepTwo = raw ? `${stepOne.slice(0, 50)}...` : null;

  return stepTwo;
};

module.exports = {
  slugify,
  formatArrayToString,
};
