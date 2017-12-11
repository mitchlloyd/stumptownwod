import * as fs from 'fs';

export function loadFixture(name: string) {
  return fs.readFileSync(`./test/fixtures/${name}.html`, 'utf8');
}
