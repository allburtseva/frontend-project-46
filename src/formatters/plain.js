import _ from 'lodash';

const normalizeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const makePlain = (tree) => {
  const iter = (obj, parentName) => obj.flatMap((node) => {
    const {
      key, status, value,
    } = node;
    const name = parentName === '' ? `${key}` : `${parentName}.${key}`;
    switch (status) {
      case 'added':
        return `Property '${name}' was added with value: ${normalizeValue(value)}`;
      case 'deleted':
        return `Property '${name}' was removed`;
      case 'changed':
        return `Property '${name}' was updated. From ${normalizeValue(node.oldValue)} to ${normalizeValue(node.newValue)}`;
      case 'nested': {
        return iter(node.children, name);
      }
      default:
        return [];
    }
  }).join('\n');
  return iter(tree, '');
};

export default makePlain;
