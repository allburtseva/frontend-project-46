import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const tree = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!keys1.includes(key)) {
      if (!_.isObject(value2)) {
        return { key, status: 'added', value: value2 };
      }
      return { key, status: 'added', value: _.cloneDeep(value2) };
    }
    if (!keys2.includes(key)) {
      if (!_.isObject(value2)) {
        return { key, status: 'deleted', value: value1 };
      }
      return { key, status: 'deleted', value: _.cloneDeep(value1) };
    }
    if (!_.isEqual(value1, value2)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return {
          key,
          status: 'nested',
          value: buildTree(value1, value2),
        };
      }
      return {
        key,
        status: 'changed',
        oldValue: _.cloneDeep(value1),
        newValue: _.cloneDeep(value2),
      };
    }
    return { key, status: 'unchanged', value: _.cloneDeep(value1) };
  });
  return tree;
};

export default buildTree;
