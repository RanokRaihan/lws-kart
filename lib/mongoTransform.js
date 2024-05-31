export const transformMongoArray = (array) => {
  const transformedArray = array?.map((item) => {
    const { _id, ...rest } = item;
    return {
      id: _id?.toString(),
      ...rest,
    };
  });
  return transformedArray;
};

export const transformedObject = (obj) => {
  const { _id, ...rest } = obj;
  return { ...rest, _id: _id.toString() };
};
