export const transformMongoArray = (array) => {
  const transformedArray = array?.map((item) => {
    const { _id, createdAt, updatedAt, ...rest } = item;
    return {
      id: _id?.toString(),
      ...rest,
    };
  });
  return transformedArray;
};

export const transformedObject = (obj) => {
  const { _id, createdAt, updatedAt, ...rest } = obj;
  return { ...rest, _id: _id.toString() };
};
