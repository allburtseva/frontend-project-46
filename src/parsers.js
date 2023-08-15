import fs from 'fs';
import path from 'path';
import process from 'process';
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

export default getParsedFile;
