import url from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedPlain = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
const expectedStylish = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
const expectedJSON = fs.readFileSync(getFixturePath('expected_json.txt'), 'utf-8');

test('gendiff default format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yaml');
  expect(genDiff(file1, file2)).toEqual(expectedStylish);
});

test('unsupported extention', () => {
  const file1 = getFixturePath('file1.html');
  const file2 = getFixturePath('file2.yaml');
  expect(() => {
    genDiff(file1, file2);
  }).toThrow();
});

test.each([
  ['file1.json', 'file2.json', 'stylish', expectedStylish],
  ['file1.yaml', 'file2.yaml', 'stylish', expectedStylish],
  ['file1.json', 'file2.json', 'plain', expectedPlain],
  ['file1.yaml', 'file2.yaml', 'plain', expectedPlain],
  ['file1.json', 'file2.json', 'json', expectedJSON],
  ['file1.yaml', 'file2.yaml', 'json', expectedJSON],
])('gendiff between %s and %s in %s format', (a, b, format, expected) => {
  expect(genDiff(getFixturePath(a), getFixturePath(b), format)).toBe(expected);
});
