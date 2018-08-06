"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteFontObject = exports.LocalFontObject = exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _promisify = _interopRequireDefault(require("./promisify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FontManager {
  constructor() {
    if (FontManager.instance) return FontManager.instance;
    FontManager.instance = this;
    this.fontObjects = [];
  }

  async register(fontPath) {
    if (!isFilePath(fontPath)) return new LocalFontObject(fontPath);
    const fontObject = await new RemoteFontObject(fontPath).init();
    this.fontObjects.unshift(fontObject);
    return fontObject;
  }

  unregister(fontPath) {
    const i = this.fontObjects.findIndex(fontObject => fontObject.externalPath === fontPath);
    if (i === -1) return this;
    const [fontObject] = this.fontObjects.splice(i, 1);
    fontObject.destructor();
    return this;
  }

}

exports.default = FontManager;
FontManager.instance = undefined;

class LocalFontObject {
  constructor(fontFamily) {
    this.fontFamily = fontFamily;
  }

  get screenName() {
    return this.fontFamily;
  }

  get fontFaceSrc() {
    return `local("${this.fontFamily}")`;
  }

}

exports.LocalFontObject = LocalFontObject;

class RemoteFontObject {
  constructor(externalPath) {
    this.fontFamily = new Buffer(externalPath).toString("base64").replace(/=/g, ""); // this.fontFace = null;

    this.externalPath = externalPath;
  }

  async init() {
    try {
      await (0, _promisify.default)(_fs.default.access)("./tmp");
    } catch (error) {
      await (0, _promisify.default)(_fs.default.mkdir)("./tmp");
    }

    await (0, _promisify.default)(_fs.default.copyFile)(this.externalPath, this.internalPath);

    _fs.default.watchFile(this.externalPath, async (curr, prev) => {
      await (0, _promisify.default)(_fs.default.copyFile)(this.externalPath, this.internalPath);
    }); // this.fontFace = new FontFace(this.fontFamily, `url(${this.internalPath})`);
    // await this.fontFace.load();


    return this;
  }

  destructor() {
    _fs.default.unwatchFile(this.externalPath);
  }

  get internalPath() {
    return `./tmp/${this.fontFamily}${_path.default.extname(this.externalPath)}`;
  }

  get screenName() {
    return this.externalPath;
  }

  get fontFaceSrc() {
    return `url(${this.internalPath})`;
  }

}

exports.RemoteFontObject = RemoteFontObject;

function isFilePath(filePath) {
  return true;
}
