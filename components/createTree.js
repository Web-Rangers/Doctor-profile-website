export function createTree(data, variant) {
    let newData = variant == "current" ? data?.map((item)=>(item)) : data?.map((item)=>(item.services[0]));
    const idMapping = newData?.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
      }, {});

    let root;

    newData?.forEach((el) => {
        if (el.parentServiceId === null) {
            root = el;
            return;
        }
        const parentEl = newData[idMapping[el.parentServiceId]];
        parentEl.children = [...(parentEl.children || []), el];
    });

    return root
}
