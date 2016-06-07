import * as path from 'path';
import * as fs   from 'fs';
import * as yaml from 'js-yaml';
import * as log  from 'npmlog';
import * as Connection from 'ssh2';

interface PlayOptions {
  hostsfile  : string
  privateKey : string
}

export function play(monogatari: string, options: PlayOptions) {

  if (!fs.existsSync(options.hostsfile)) {
    log.error('play', `${options.hostsfile} does not exists`);
    process.exit(1);
  }

  const cwd: string = process.cwd();
  monogatari = path.resolve(cwd, 'monogatari', monogatari);
  const hostsfile  = path.resolve(cwd, options.hostsfile);

  const hosts       = yaml.safeLoad(fs.readFileSync(hostsfile, 'utf8'))[0];
  const monogataris = yaml.safeLoad(fs.readFileSync(monogatari, 'utf8'))[0];

  console.log(hosts);
  console.log(monogataris);

  //TODO: update .d.ts of ssh2 and send PR
  const client = new Connection();

  client.on('ready', () => {
    log.info('play', 'connected');

    client.exec(monogataris.tasks[0].shell, (err, stream) => {
      if(err) {
        throw err;
      }

      stream.on('close', (code, signal) => {
        log.info('play', `end code:${code}, signal:${signal}`);
        client.end();
      })
      .on('data', data => {
        log.info('play', data);
      })
      .stderr.on('data', data => {
        log.error('play', data);
      });

    });
  })
  .connect({
    host: hosts[monogataris.hosts].host,
    port: hosts[monogataris.hosts].port,
    username: hosts[monogataris.hosts].user,
    privateKey: fs.readFileSync(options.privateKey)
  });
}
