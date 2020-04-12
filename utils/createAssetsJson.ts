import * as fs from 'fs';
import * as path from 'path';

const generateJson = () => {
  const pics = fs
    // .readdirSync(path.join('public/', 'static/'))
    .readdirSync(path.resolve('public/', 'static/'))
    .filter((image: string) => /jpe?g/.test(image));

  console.log('dir read resolve', path.resolve('public/', 'static/'));
  console.log('dir read join', path.join('public/', 'static/'));
  console.log(
    'dir  join contents',
    fs.readdirSync(path.resolve('public/', 'static/'))
  );
  console.log(
    'dir join contents',
    fs.readdirSync(path.join('public/', 'static/'))
  );

  console.log('top level contents', fs.readdirSync(path.join('public')));

  const obj = { pics };

  const json = JSON.stringify(obj);

  fs.writeFileSync(path.join('public', 'images.json'), json);
  // eslint-disable-next-line no-console
  console.log('wrote list of images to public dir', json);
};

generateJson();
