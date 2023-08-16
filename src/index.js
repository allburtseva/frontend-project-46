import getParsedFile from './parsers.js';
import buildTree from './buildtree.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = getParsedFile(filepath1);
  const file2 = getParsedFile(filepath2);
  return buildTree(file1, file2);
};

export default genDiff;

console.log(JSON.stringify(genDiff('/home/allburtseva/education_projects/frontend-project-46/__fixtures__/file1.json', '/home/allburtseva/education_projects/frontend-project-46/__fixtures__/file2.json'), null, 2));
