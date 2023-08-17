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

test('gendiff stylish json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(expectedStylish);
});

test('gendiff stylish yaml', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  expect(genDiff(file1, file2)).toEqual(expectedStylish);
});

test('gendiff plain json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
});

test('gendiff plain yaml', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
});

test('gendiff json json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});

test('gendiff json yaml', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});

test('unsupported extention', () => {
  const file1 = getFixturePath('file1.html');
  const file2 = getFixturePath('file2.yaml');
  expect(() => {
    genDiff(file1, file2);
  }).toThrow('This extention is not supported!');
});
