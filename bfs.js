const tree = {
  a: ['b', 'c'],
  c: ['e','f'],
  e: ['j']
};

const bfs = (tree, requiredNode) => {

  let found = false;
  let start = Object.keys(tree)[0];
  let q = [start];

  while (q.length) {
    console.log('current q ', q);
  
    const dqd =  q.shift();
    if (dqd === requiredNode) {
      found = true;
      break;
    } else {
      q = [...q, ...(tree[dqd] ? tree[dqd] : [])];
    }
  
  }

  return found;

}

console.log(bfs(tree, 'g'));