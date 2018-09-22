//@flow

export default class FontFile {
  fontFamily: string;
  path: string;
  url: string;

  constructor(props) {
    this.fontFamily = "";
    this.path = props.path;
    this.url = "";
  }

  save() {
    const me = this;
    const form = new FormData();
    form.append("path", this.path);
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      req.onload = () => {
        try {
          const res = JSON.parse(req.responseText);
          me.fontFamily = res.fontFamily;
          me.url = res.url;
          resolve(me);
        } catch (err) {
          console.log(err);
          reject(req);
        }
      };
      req.onabort = req.onerror = () => {
        reject(req);
      };
      req.open("POST", "/api/fonts", form);
      req.send();
    });
  }
}

FontFile.fromPath = function(path: string): FontFile {
  const fontFile = new FontFile({ path: path });
};
