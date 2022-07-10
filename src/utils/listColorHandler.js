const listColorHandler = (data, listId, color) => {
  const newData = data.map((list) =>
    list.id === listId ? { ...list, color } : list
  );
  return newData;
};

export { listColorHandler };
