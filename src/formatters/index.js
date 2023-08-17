import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatTree = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    default:
      throw new Error('Incorrect output format!');
  }
};

export default formatTree;
