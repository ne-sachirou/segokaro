// @flow
"use strict";

import fs from "fs";
import path from "path";
import promisify from "./promisify";

export default class FontManager {
  static instance: FontManager | typeof undefined;
  fontObjects: RemoteFontObject[];

  constructor() {
    if (FontManager.instance) return FontManager.instance;
    FontManager.instance = this;
    this.fontObjects = [];
  }

  async register(fontPath: string): Promise<LocalFontObject | RemoteFontObject> {
    if (!isFilePath(fontPath)) return new LocalFontObject(fontPath);
    const fontObject = await new RemoteFontObject(fontPath).init();
    this.fontObjects.unshift(fontObject);
    return fontObject;
  }

  unregister(fontPath: string): FontManager {
    const i = this.fontObjects.findIndex(fontObject => fontObject.externalPath === fontPath);
    if (i === -1) return this;
    const [fontObject] = this.fontObjects.splice(i, 1);
    fontObject.destructor();
    return this;
  }
}

FontManager.instance = undefined;

export class LocalFontObject {
  fontFamily: string;

  constructor(fontFamily: string) {
    this.fontFamily = fontFamily;
  }

  get screenName(): string {
    return this.fontFamily;
  }

  get fontFaceSrc(): string {
    return `local("${this.fontFamily}")`;
  }
}

export class RemoteFontObject {
  fontFamily: string;
  externalPath: string;

  constructor(externalPath: string) {
    this.fontFamily = new Buffer(externalPath).toString("base64").replace(/=/g, "");
    // this.fontFace = null;
    this.externalPath = externalPath;
  }

  async init(): Promise<RemoteFontObject> {
    try {
      await promisify(fs.access)("./tmp");
    } catch (error) {
      await promisify(fs.mkdir)("./tmp");
    }
    await promisify(fs.copyFile)(this.externalPath, this.internalPath);
    fs.watchFile(this.externalPath, async (curr, prev) => {
      await promisify(fs.copyFile)(this.externalPath, this.internalPath);
    });
    // this.fontFace = new FontFace(this.fontFamily, `url(${this.internalPath})`);
    // await this.fontFace.load();
    return this;
  }

  destructor(): any {
    fs.unwatchFile(this.externalPath);
  }

  get internalPath(): string {
    return `./tmp/${this.fontFamily}${path.extname(this.externalPath)}`;
  }

  get screenName(): string {
    return this.externalPath;
  }

  get fontFaceSrc(): string {
    return `url(${this.internalPath})`;
  }
}

function isFilePath(filePath: string): boolean {
  return true;
}
