async function saveFile() {
  // create a new handle
  const newHandle = await window.showSaveFilePicker();

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  const enc = new TextEncoder(); // always utf-8
  const foo = enc.encode("This is a string converted to a Uint8Array");

  // write our file
  await writableStream.write(foo);

  // close the file and write the contents to disk.
  await writableStream.close();
}

async function writeFile(fileHandle, contents) {
  // Support for Chrome 82 and earlier.
  if (fileHandle.createWriter) {
    // Create a writer (request permission if necessary).
    const writer = await fileHandle.createWriter();
    // Write the full length of the contents
    await writer.write(0, contents);
    // Close the file and write the contents to disk
    await writer.close();
    return;
  }
  // For Chrome 83 and later.
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}

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
  const button1 = document.getElementById('save');
  button1.addEventListener('click', async () => {
    saveFile();
  });


  const button2 = document.getElementById('load');
  button2.addEventListener('click', async () => {

    /*
    fallback().then(files => {
      // console.log('files', files);

      files.forEach(async file => {
        const filepath = file.name;
        const data = await readFileContent(file);
  
        console.log(file, data);
  
        // TODO proper lifecycle mgmt.
      });
    })
    
    console.log('opening a bunch of files!');
    */
    
    console.log('opening');
    const handle  = await window.showDirectoryPicker({ mode: 'readwrite' });
    console.log('creating file');


    const newFileHandle1 = await handle.getFileHandle('My Notes.txt', { create: true });

    console.log('write 1');
    writeFile(newFileHandle1, 'hello world!');

    window.setTimeout(() => {
      writeFile(newFileHandle1, 'hello world! #2');
    }, 10000);

/*
    const newFileHandle2 = await handle.getFileHandle('My Notes 2.txt', { create: true });

    writeFile(newFileHandle2, 'hello asdfworld!');

    const newFileHandle3 = await handle.getFileHandle('My Notes 3.txt', { create: true });
    writeFile(newFileHandle3, 'hello woasdfasdfasdfasdrld!');
  */

    /*
    const directoryStructure = await getFiles(handle, undefined);
    console.log(directoryStructure);
    */

    // handle.saveFile()
    
  });
}