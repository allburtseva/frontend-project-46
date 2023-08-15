import url from 'url';
import fs from 'fs';
import path from 'path';
import process from 'process';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/expected-json.txt'), 'utf-8');

test('gendiff flat json objects', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(expected);
});
