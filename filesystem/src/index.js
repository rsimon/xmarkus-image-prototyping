const readFileContent = (file) => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const contentArrayBuffer = event.target?.result;
      const data = new Blob([contentArrayBuffer], { type: file.type });
      resolve(data);
    };

    reader.onerror = (event) => {
      reject(event.target.error);
    };

    reader.readAsArrayBuffer(file);
  });


// Recursive function that walks the directory structure.
const getFiles = async (dirHandle, path = dirHandle.name) => {
  const dirs = [];
  const files = [];
  for await (const entry of dirHandle.values()) {
    const nestedPath = `${path}/${entry.name}`;
    if (entry.kind === "file") {
      files.push(
        entry.getFile().then((file) => {
          file.directoryHandle = dirHandle;
          file.handle = entry;
          return Object.defineProperty(file, "webkitRelativePath", {
            configurable: true,
            enumerable: true,
            get: () => nestedPath,
          });
        })
      );
    } else if (entry.kind === "directory") {
      dirs.push(getFiles(entry, nestedPath));
    }
  }
  return [
    ...(await Promise.all(dirs)).flat(),
    ...(await Promise.all(files)),
  ];
};

// Fallback if the File System Access API is not supported.
const fallback = () => new Promise((resolve) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.webkitdirectory = true;

  input.addEventListener('change', () => {
    let files = Array.from(input.files);
    resolve(files);
  });
  if ('showPicker' in HTMLInputElement.prototype) {
    input.showPicker();
  } else {
    input.click();
  }
});

window.onload = function() {


  const button = document.getElementById('load');
  button.addEventListener('click', async () => {

    fallback().then(files => {
      // console.log('files', files);

      files.forEach(async file => {
        const filepath = file.name;
        const data = await readFileContent(file);
  
        console.log(file, data);
  
        // TODO proper lifecycle mgmt.
      });
    })
    /*
    console.log('opening a bunch of files!');

    const handle  = await window.showDirectoryPicker({ mode: 'readwrite' });

    const directoryStructure = await getFiles(handle, undefined);
    console.log(directoryStructure);
    */
  });
}