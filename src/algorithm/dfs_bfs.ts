const tree = {
  a1: {
    name: 'a1',
    b1: {
      name: 'b1',
      c1: {
        name: 'c1',
      }
    },
    b2: {
      name: 'b2',
      c2: {
        name: 'c2',
      }
    }
  },
  a2: {
    name: 'a2',
    b3: {
      name: 'b3',
      c3: {
        name: 'c3',
      }
    },
  }
}

function dfs(o, p='root') {
  for (let k in o) {
    if (o['name']) {
      o['path'] = p + '.' + o['name'];
      delete o['name'];
    }
    if (!!o[k] && typeof o[k] === 'object') {
      dfs(o[k], o['path'])
    }
  }
}

// dfs(tree);
// console.log(JSON.stringify(tree, null, '  '));
function bfs(oo, pp = 'root') {
  let queue = Object.values(oo).map(o => [pp, o]);
  let po;
  while (po = queue.shift()) {
    let [p, o] = po;
    if (o['name']) {
      o['path'] = p + '.' + o['name'];
      delete o['name'];
    }
    if (!!o && typeof o === 'object') {
      p = o['path'];
      queue = queue.concat(Object.values(o).map(o => [p, o]))
    }
  }
}

bfs(tree);
console.log(JSON.stringify(tree, null, '  '));
