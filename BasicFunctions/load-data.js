const FileLoader = {
  openFile(onLoad) {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        onLoad(e.target.result);
      };
      reader.readAsText(file);
    };
    input.click();
  },
  text(callback) {
    this.openFile(callback);
  },
  csv(callback) {
    this.openFile((text) => {
      const data = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.split(",").map((v) => v.trim()));
      callback(data);
    });
  },
};

FileLoader.text((data) => {
  console.log(data);
});

FileLoader.csv((data) => {
  console.table(data);
});
