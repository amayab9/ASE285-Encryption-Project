'use strict';

const fs = require('fs');
const { readFile, writeFile, hash } = require('../util/utility.js');
const { createHash } = require('crypto');

describe('readFile function', () => {
    const fileName = './test.txt';
    const fileContent = 'line1\nline2\nline3';

    beforeAll(() => {
        fs.writeFileSync(fileName, fileContent);
    });

    afterAll(() => {
        fs.unlinkSync(fileName);
    });

    test('read file + return array of lines', () => {
        const lines = readFile(fileName);
        expect(lines).toEqual(['line1', 'line2', 'line3']);
    });

    test('should throw error if file does not exist', () => {
        expect(() => readFile('./nonexistent.txt')).toThrow();
    });
});

describe('writeFile function', () => {
    const fileName = './test_write.txt';
    const content = ['line1', 'line2', 'line3'];

    afterAll(() => {
        fs.unlinkSync(fileName);
    });

    test('write array of lines to file', () => {
        writeFile(content, fileName);
        const fileContent = fs.readFileSync(fileName, 'utf-8');
        expect(fileContent.trim()).toEqual(content.join('\n'));
    });
});

describe('hash function', () => {
    test('return SHA-256 hash', () => {
        const input = 'password1234';
        const expectedHash = createHash('sha256').update(input).digest('hex');
        expect(hash(input)).toEqual(expectedHash);
    });
});
