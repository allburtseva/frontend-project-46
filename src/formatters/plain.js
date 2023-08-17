import _ from 'lodash';

const makePlain = (tree) => {
  const iter = (obj, parentName) => obj.flatMap((node) => {
    const {
      key, status, value, oldValue, newValue, children,
    } = node;
    const name = parentName === '' ? `${key}` : `${parentName}.${key}`;
    switch (status) {
      case 'added': {
        const val = typeof value === 'string' ? `'${value}'` : value;
        const addedValue = _.isObject(value) ? '[complex value]' : val;
        return `Property '${name}' was added with value: ${addedValue}`;
      }
      case 'deleted':
        return `Property '${name}' was removed`;
      case 'unchanged':
        return [];
      case 'changed': {
        const old = typeof oldValue === 'string' ? `'${oldValue}'` : oldValue;
        const upd = typeof newValue === 'string' ? `'${newValue}'` : newValue;
        const oldStr = _.isObject(oldValue) ? '[complex value]' : `${old}`;
        const updatedStr = _.isObject(newValue) ? '[complex value]' : `${upd}`;
        return `Property '${name}' was updated. From ${oldStr} to ${updatedStr}`;
      }
      case 'nested': {
        return iter(children, name);
      }
      default:
        return [];
    }
  }).join('\n');
  return iter(tree, '');
};

export default makePlain;
