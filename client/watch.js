// @flow
"use strict";

import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import promisify from "./src/promisify";

type ConciseWatcherTarget = {
  path: string,
  recursive?: boolean,
  pattern?: RegExp
};

type WatcherTarget = {
  path: string,
  recursive: boolean,
  pattern: RegExp
};

class Watcher {
  targets: { target: WatcherTarget, callback: string => any }[];

  constructor() {
    this.targets = [];
  }

  watch(conciseTarget: ConciseWatcherTarget, callback: string => any): Watcher {
    const target = {
      path: conciseTarget.path,
      recursive: conciseTarget.recursive === undefined ? true : conciseTarget.recursive,
      pattern: conciseTarget.pattern || /.?/
    };
    this.targets.push({ target, callback });
    return this;
  }

  start(): Watcher {
    const me = this;
    for (const { target, callback } of this.targets) {
      fs.watch(target.path, { recursive: target.recursive }, (eventType, filename) => {
        (async function() {
          try {
            filename = path.join(target.path, filename);
            if (!(await me._isWatching(target, filename))) return;
            console.log("%s %s", eventType, filename);
            callback(filename);
          } catch (error) {
            console.error(error);
          }
        })();
      });
    }
    return this;
  }

  async _isWatching(target: WatcherTarget, filename: string): Promise<boolean> {
    try {
      if (!(await promisify(fs.stat)(filename)).isFile()) return false;
    } catch (error) {
      return false;
    }
    const code = await new Promise((resolve, reject) => {
      const git = spawn("git", ["check-ignore", "-q"]);
      git.on("close", code => resolve(code));
      git.on("error", error => reject(error));
    });
    return code !== 0 && target.pattern.test(filename);
  }
}

function sh(command: string, args: string[]): Promise<any> {
  console.log("%s %s", command, args.join());
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: "inherit" });
    proc.on("close", code => (code === 0 ? resolve : reject)(code));
    proc.on("error", error => reject(error));
  });
}

const watcher = new Watcher();
watcher.watch({ path: "src", pattern: /\.(?:css|js)$/ }, async filename => {
  const dest = filename.replace(/^src/, "lib");
  await sh("prettier", ["--write", filename]);
  await sh("make", [dest]);
});
watcher.watch(
  {
    path: ".",
    recursive: false,
    pattern: /(?:^\.babelrc$)|(?:\.(?:js|json)$)/
  },
  async filename => {
    await sh("prettier", ["--write", filename]);
  }
);
watcher.start();
