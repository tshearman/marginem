globalThis.process ??= {}; globalThis.process.env ??= {};
const thermoImage = new Proxy({"src":"/_astro/thermo.zF7fA3mZ.png","width":774,"height":362,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/toby/projects/blogupdate/src/content/imgs/thermo.png";
							}
							
							return target[name];
						}
					});

const phasesImage = new Proxy({"src":"/_astro/phases.Db149dTd.png","width":1720,"height":372,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/toby/projects/blogupdate/src/content/imgs/phases.png";
							}
							
							return target[name];
						}
					});

export { phasesImage as p, thermoImage as t };
