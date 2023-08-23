import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth).slice(0, -2);

const stringify = (data, depth = 1) => {
  if (!(_.isObject(data))) {
    return `${data}`;
  }
  const line = Object.entries(data).map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${line.join('\n')}\n${getIndent(depth - 1)}  }`;
};

const makeStylish = (tree) => {
  const iter = (obj, depth) => obj.map((node) => {
    const {
      key, status,
    } = node;
    switch (status) {
      case 'added':
        return `${getIndent(depth)}+ ${key}: ${stringify(node.value, depth + 1)}`;
      case 'deleted':
        return `${getIndent(depth)}- ${key}: ${stringify(node.value, depth + 1)}`;
      case 'changed': {
        const firstLine = `${getIndent(depth)}- ${key}: ${stringify(node.oldValue, depth + 1)}`;
        const secondLine = `${getIndent(depth)}+ ${key}: ${stringify(node.newValue, depth + 1)}`;
        return `${firstLine}\n${secondLine}`;
      }
      case 'unchanged':
        return `${getIndent(depth)}  ${key}: ${stringify(node.value, depth + 1)}`;
      case 'nested':
        return `${getIndent(depth)}  ${key}: {\n${iter(node.children, depth + 1)}\n${getIndent(depth)}  }`;
      default:
        throw new Error(`'${status}' is incorrect type of node!`);
    }
  }).join('\n');
  return `{\n${iter(tree, 1)}\n}`;
};

export default makeStylish;
