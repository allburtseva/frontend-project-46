import fs from 'fs';
import path from 'path';
import process from 'process';
import getParsedData from './parsers.js';
import buildTree from './buildtree.js';
import formatTree from './formatters/index.js';

const getFileContent = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return data;
};

const getParsedFile = (filepath) => {
  const extension = path.extname(filepath);
  const data = getFileContent(filepath);
  const parsedData = getParsedData(data, extension);
  return parsedData;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getParsedFile(filepath1);
  const file2 = getParsedFile(filepath2);
  const tree = buildTree(file1, file2);
  return formatTree(tree, format);
};

export default genDiff;
