let { getFilesInDir, readFile, writeFile } = require('./secondary');

getFilesInDir('./source').then((result) => {
	result.forEach(item => {
		readFile(`./source/${item}`).then(fileContent => {
			let newContent = fileContent.replace(/[\r\n]/g, ''),
				[, filename, extension ] = /^(\w+)\.(\w+)$/.exec(item);
			writeFile(`./destination/${filename}.min.${extension}`, newContent);
		})
	})
});