
// A simple (incomplete) implementation of what require-js does
// Expose a loading function that unifies all modules
// and recursively initializes them by their dependencies

// This code is not tested or complete, it serves to show the
// general idea of how require-js works

(function () {
	let definedModules = {},
		initializedModules = {},
		objForEach = (object, iterator) => { // Iterate over object keys
			let key;
			for (key in object) {
				iterator(object[key], key); // Value, key
			}
		},
		allModulesAreLoaded = (moduleNamesArray) => { /* return boolean if all of these modules were already initialized */ },
		getModules = (moduleNamesArray) => { /* return an array of initialized modules */ },
		initializeModule = ({ dependencies, callback }, moduleName) => initializedModules[moduleName] = callback(getModules(dependencies)),
		initializeChunk = modules => {
			objForEach(modules, ({ dependencies }, moduleName) => {
				if (allModulesAreLoaded(dependencies)) {
					initializeChunk(dependencies); // Recurse
				}
				!initializedModules[moduleName] && initializeModule(moduleName);
			});
		};

	window.define = function (moduleName, dependencies, callback) {
		definedModules[moduleName] = {
			dependencies,
			callback
		};
	}

	window.initializeAll = () => { // Runs once all the modules are defined
		initializeChunk(definedModules)
	}
})()



window.define('Helpers', [], function () {
	return {
		sum: (a, b) => a + b
	}
})

window.define('Http', [], function () {
	return {
		ajax: function (url, settings) {

		}
	}
})

window.define('SumReporter', ['Helpers', 'Http'], function (Helpers, Http) {

	return {
		sumAndReport: (a, b, url) => Http.ajax(url, { data: Helpers.sum(a, b) })
	}
})
