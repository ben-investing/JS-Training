
let fs = require('fs');



module.exports = {
	getFilesInDir: dirPath => new Promise((resolve, reject) => fs.readdir(dirPath, (err, result) => resolve(result))),
	readFile: dirPath => new Promise(resolve => fs.readFile(dirPath, "utf8", (err, result) => resolve(result))),
	writeFile: (path, content) => new Promise(resolve => {
		fs.writeFileSync(path, content);
		resolve();
	})
};