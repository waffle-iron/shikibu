import * as path from 'path';
import * as fs   from 'fs';
import * as log  from 'npmlog';
import * as yaml from 'js-yaml';

export function create(name: string) {

  if(fs.existsSync(name)) {
    log.error(`${name} is already exists`);
    process.exit(1);
  }

  /* template for skeleton */
  const hosts: Array<Object> = [{
    localhost: {
      host: 'localhost',
      port: 22,
      user: 'root'
    }
  }];
  const waka: Array<Object> = [{
    hosts: 'localhost',
    tasks: [
      { shell: "say 'めぐりあひて　見しやそれとも　わかぬまに　雲がくれにし　夜半の月かな'" }
    ]
  }];

  new Promise(resolve => {
    fs.mkdir(name, () => {
      log.info('create', name);
      return resolve();
    });
  })
  .then((): void => {
    fs.writeFile(path.resolve(name, 'hosts.yml'), yaml.safeDump(hosts), err => {
      if(err) {
        throw err;
      }
      return;
    });
  })
  .then((): void => {
    const dirname = path.join(name, 'monogatari');
    fs.mkdir(dirname, (): void => {
      log.info('create', dirname);
      return;
    });
  })
  .then((): void => {
    fs.writeFile(path.resolve(name, 'monogatari', 'waka.yml'), yaml.safeDump(waka), err => {
      if(err) {
        throw err;
      }
      return;
    });
  })
  .catch(err => {
    log.error(err);
  });
}
