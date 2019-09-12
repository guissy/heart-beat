const keymap = { 'id': 'value', 'name': 'label', 'list': 'chilren' } as any;

export function changeKey(o1: Record<string, any[] | string>) {
  const o2 = {} as any;
  for (let k1 in o1) {
    let k2 = keymap[k1];
    const val = o1[k1];
    if (Array.isArray(val)) {
      o2[k2] = val.map(v => changeKey(v));
    } else {
      o2[k2] = val;
    }
  }
  return o2;
}

const obj = {
  name: "老大",
  id: "1",
  list: [{
    name: "老二",
    id: "2",
    list: [{
      name: "老三",
      id: "3",
      list: [
        {
          name: "老四",
          id: "4",
        }
      ]
    }]
  }]
};

console.log(JSON.stringify(changeKey(obj)));