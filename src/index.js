import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import yaml from 'js-yaml';

const getFileContent = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return data;
};

const getParsedData = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error('This extention is not supported!');
  }
};

const getParsedFile = (filepath) => {
  const extension = path.extname(filepath);
  const data = getFileContent(filepath);
  const parsedData = getParsedData(data, extension);
  return parsedData;
};

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
