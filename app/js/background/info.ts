import { BackgroundpageWindow } from './sharedTypes';

declare const self: BackgroundpageWindow;

export namespace Info {
	export function init() {
		if (typeof location === 'undefined' || typeof location.host === 'undefined') {
			// Running in node
			self.log = () => { };
			self.logAsync = () => { };
			self.info = () => { };
			self.infoAsync = () => { };
			self.testLog = console.log.bind(console);
		} else {
			// Running in the browser
			self.log = console.log.bind(console);
			self.logAsync = async (...args: any[]) => {
				console.log.apply(console, await Promise.all(args));
			}
			if (self.location && self.location.hash && self.location.hash.indexOf('noBackgroundInfo')) {
				self.info = () => { };
				self.infoAsync = () => { };
			} else {
				self.info = console.log.bind(console);
				self.infoAsync = async (...args: any[]) => {
					console.log.apply(console, await Promise.all(args));
				}
			}
		}
	}
}