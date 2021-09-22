const findTagsByType = (tags, type) => {
  const filteredTags = tags.filter((tag) => tag.split(":")[0].trim() == type);
  const tagValues = filteredTags.map((tag) => tag.split(":")[1].trim());
  return tagValues;
};

const findOneTagByType = (tags, type) => {
  const tag = tags.find((tag) => tag.split(":")[0].trim() == type);
  const tagValue = tag?.split(":")[1].trim();
  return tagValue;
};

export { findTagsByType, findOneTagByType };
