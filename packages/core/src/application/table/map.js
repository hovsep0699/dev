function map(response) {
  const ar = [];

  function pushNewContainerInArray(item) {
    const container = {
      type: 'container',
      container_id: item.container_id,
      items: [item],
    };
    ar.push({ ...container });
  }

  response.rows.forEach((item) => {
    if (item.container_id) {
      const container = ar.find(elem => elem.container_id === item.container_id);

      if (typeof container === 'undefined') {
        pushNewContainerInArray(item);
      } else {
        container.items.push(item);
      }
    } else {
      ar.push(item);
    }
  });
  return ar;
}

export default map;
