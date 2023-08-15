import _ from 'lodash';
import getParsedFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = getParsedFile(filepath1);
  const file2 = getParsedFile(filepath2);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const diff = keys.map((key) => {
    if (!keys1.includes(key)) {
      return `  + ${key}: ${file2[key]}`;
    } if (!keys2.includes(key)) {
      return `  - ${key}: ${file1[key]}`;
    } if (file1[key] !== file2[key]) {
      return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    }
    return `    ${key}: ${file1[key]}`;
  });
  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
