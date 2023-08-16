import fs from 'fs';
import path from 'path';
import process from 'process';
import getParsedData from './parsers.js';
import buildTree from './buildtree.js';

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

const genDiff = (filepath1, filepath2) => {
  const file1 = getParsedFile(filepath1);
  const file2 = getParsedFile(filepath2);
  return buildTree(file1, file2);
};

export default genDiff;

console.log(JSON.stringify(genDiff('/home/allburtseva/education_projects/frontend-project-46/__fixtures__/file1.json', '/home/allburtseva/education_projects/frontend-project-46/__fixtures__/file2.json'), null, 2));
