import { ModuleData } from "./moduleTypes";
import {
	BackgroundpageWindow,
	ContextMenuCreateProperties,
	ContextMenuUpdateProperties,
	ContextMenuOverrides,
} from "./sharedTypes";

declare const browserAPI: browserAPI;
declare const BrowserAPI: BrowserAPI;
declare const self: BackgroundpageWindow;

export namespace Util {
	export let modules: ModuleData;

	export function initModule(_modules: ModuleData) {
		modules = _modules;
	}

	export const md5 = (input: string) => {
		function t(n, t) {
			var r = (65535 & n) + (65535 & t),
				e = (n >> 16) + (t >> 16) + (r >> 16);
			return (e << 16) | (65535 & r);
		}

		function r(n, t) {
			return (n << t) | (n >>> (32 - t));
		}

		function e(n, e, o, u, c, f) {
			return t(r(t(t(e, n), t(u, f)), c), o);
		}

		function o(n, t, r, o, u, c, f) {
			return e((t & r) | (~t & o), n, t, u, c, f);
		}

		function u(n, t, r, o, u, c, f) {
			return e((t & o) | (r & ~o), n, t, u, c, f);
		}

		function c(n, t, r, o, u, c, f) {
			return e(t ^ r ^ o, n, t, u, c, f);
		}

		function f(n, t, r, o, u, c, f) {
			return e(r ^ (t | ~o), n, t, u, c, f);
		}

		function i(n, r) {
			(n[r >> 5] |= 128 << r % 32), (n[(((r + 64) >>> 9) << 4) + 14] = r);
			var e,
				i,
				a,
				h,
				d,
				l = 1732584193,
				g = -271733879,
				v = -1732584194,
				m = 271733878;
			for (e = 0; e < n.length; e += 16)
				(i = l),
					(a = g),
					(h = v),
					(d = m),
					(l = o(l, g, v, m, n[e], 7, -680876936)),
					(m = o(m, l, g, v, n[e + 1], 12, -389564586)),
					(v = o(v, m, l, g, n[e + 2], 17, 606105819)),
					(g = o(g, v, m, l, n[e + 3], 22, -1044525330)),
					(l = o(l, g, v, m, n[e + 4], 7, -176418897)),
					(m = o(m, l, g, v, n[e + 5], 12, 1200080426)),
					(v = o(v, m, l, g, n[e + 6], 17, -1473231341)),
					(g = o(g, v, m, l, n[e + 7], 22, -45705983)),
					(l = o(l, g, v, m, n[e + 8], 7, 1770035416)),
					(m = o(m, l, g, v, n[e + 9], 12, -1958414417)),
					(v = o(v, m, l, g, n[e + 10], 17, -42063)),
					(g = o(g, v, m, l, n[e + 11], 22, -1990404162)),
					(l = o(l, g, v, m, n[e + 12], 7, 1804603682)),
					(m = o(m, l, g, v, n[e + 13], 12, -40341101)),
					(v = o(v, m, l, g, n[e + 14], 17, -1502002290)),
					(g = o(g, v, m, l, n[e + 15], 22, 1236535329)),
					(l = u(l, g, v, m, n[e + 1], 5, -165796510)),
					(m = u(m, l, g, v, n[e + 6], 9, -1069501632)),
					(v = u(v, m, l, g, n[e + 11], 14, 643717713)),
					(g = u(g, v, m, l, n[e], 20, -373897302)),
					(l = u(l, g, v, m, n[e + 5], 5, -701558691)),
					(m = u(m, l, g, v, n[e + 10], 9, 38016083)),
					(v = u(v, m, l, g, n[e + 15], 14, -660478335)),
					(g = u(g, v, m, l, n[e + 4], 20, -405537848)),
					(l = u(l, g, v, m, n[e + 9], 5, 568446438)),
					(m = u(m, l, g, v, n[e + 14], 9, -1019803690)),
					(v = u(v, m, l, g, n[e + 3], 14, -187363961)),
					(g = u(g, v, m, l, n[e + 8], 20, 1163531501)),
					(l = u(l, g, v, m, n[e + 13], 5, -1444681467)),
					(m = u(m, l, g, v, n[e + 2], 9, -51403784)),
					(v = u(v, m, l, g, n[e + 7], 14, 1735328473)),
					(g = u(g, v, m, l, n[e + 12], 20, -1926607734)),
					(l = c(l, g, v, m, n[e + 5], 4, -378558)),
					(m = c(m, l, g, v, n[e + 8], 11, -2022574463)),
					(v = c(v, m, l, g, n[e + 11], 16, 1839030562)),
					(g = c(g, v, m, l, n[e + 14], 23, -35309556)),
					(l = c(l, g, v, m, n[e + 1], 4, -1530992060)),
					(m = c(m, l, g, v, n[e + 4], 11, 1272893353)),
					(v = c(v, m, l, g, n[e + 7], 16, -155497632)),
					(g = c(g, v, m, l, n[e + 10], 23, -1094730640)),
					(l = c(l, g, v, m, n[e + 13], 4, 681279174)),
					(m = c(m, l, g, v, n[e], 11, -358537222)),
					(v = c(v, m, l, g, n[e + 3], 16, -722521979)),
					(g = c(g, v, m, l, n[e + 6], 23, 76029189)),
					(l = c(l, g, v, m, n[e + 9], 4, -640364487)),
					(m = c(m, l, g, v, n[e + 12], 11, -421815835)),
					(v = c(v, m, l, g, n[e + 15], 16, 530742520)),
					(g = c(g, v, m, l, n[e + 2], 23, -995338651)),
					(l = f(l, g, v, m, n[e], 6, -198630844)),
					(m = f(m, l, g, v, n[e + 7], 10, 1126891415)),
					(v = f(v, m, l, g, n[e + 14], 15, -1416354905)),
					(g = f(g, v, m, l, n[e + 5], 21, -57434055)),
					(l = f(l, g, v, m, n[e + 12], 6, 1700485571)),
					(m = f(m, l, g, v, n[e + 3], 10, -1894986606)),
					(v = f(v, m, l, g, n[e + 10], 15, -1051523)),
					(g = f(g, v, m, l, n[e + 1], 21, -2054922799)),
					(l = f(l, g, v, m, n[e + 8], 6, 1873313359)),
					(m = f(m, l, g, v, n[e + 15], 10, -30611744)),
					(v = f(v, m, l, g, n[e + 6], 15, -1560198380)),
					(g = f(g, v, m, l, n[e + 13], 21, 1309151649)),
					(l = f(l, g, v, m, n[e + 4], 6, -145523070)),
					(m = f(m, l, g, v, n[e + 11], 10, -1120210379)),
					(v = f(v, m, l, g, n[e + 2], 15, 718787259)),
					(g = f(g, v, m, l, n[e + 9], 21, -343485551)),
					(l = t(l, i)),
					(g = t(g, a)),
					(v = t(v, h)),
					(m = t(m, d));
			return [l, g, v, m];
		}

		function a(n) {
			var t,
				r = "";
			for (t = 0; t < 32 * n.length; t += 8)
				r += String.fromCharCode((n[t >> 5] >>> t % 32) & 255);
			return r;
		}

		function h(n) {
			var t,
				r = [];
			for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)
				r[t] = 0;
			for (t = 0; t < 8 * n.length; t += 8)
				r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
			return r;
		}

		function d(n) {
			return a(i(h(n), 8 * n.length));
		}

		function l(n, t) {
			var r,
				e,
				o = h(n),
				u = [],
				c = [];
			for (
				u[15] = c[15] = void 0,
					o.length > 16 && (o = i(o, 8 * n.length)),
					r = 0;
				16 > r;
				r += 1
			)
				(u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r]);
			return (
				(e = i(u.concat(h(t)), 512 + 8 * t.length)),
				a(i(c.concat(e), 640))
			);
		}

		function g(n) {
			var t,
				r,
				e = "0123456789abcdef",
				o = "";
			for (r = 0; r < n.length; r += 1)
				(t = n.charCodeAt(r)),
					(o += e.charAt((t >>> 4) & 15) + e.charAt(15 & t));
			return o;
		}

		function v(n) {
			return unescape(encodeURIComponent(n));
		}

		function m(n) {
			return d(v(n));
		}

		function p(n) {
			return g(m(n));
		}

		function s(n, t) {
			return l(v(n), v(t));
		}

		function C(n, t) {
			return g(s(n, t));
		}

		return (function (n, t, r) {
			return t ? (r ? s(t, n) : C(t, n)) : r ? m(n) : p(n);
		})(input);
	};

	/**
	 * JSONfn - javascript (both node.js and browser) plugin to stringify,
	 *          parse and clone objects with Functions, Regexp and Date.
	 *
	 * Version - 0.60.00
	 * Copyright (c) 2012 - 2014 Vadim Kiryukhin
	 * vkiryukhin @ gmail.com
	 * http://www.eslinstructor.net/jsonfn/
	 *
	 * Licensed under the MIT license ( http://www.opensource.org/licenses/mit-license.php )
	 */
	export const jsonFn = {
		stringify: (obj: any): string => {
			return JSON.stringify(obj, (_: string, value: any) => {
				if (value instanceof Function || typeof value === "function") {
					return value.toString();
				}
				if (value instanceof RegExp) {
					return "_PxEgEr_" + value;
				}
				return value;
			});
		},
		parse: (str: string, date2Obj?: boolean): any => {
			const iso8061 = !date2Obj
				? false
				: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
			return JSON.parse(str, (_key: string, value: any) => {
				if (typeof value !== "string") {
					return value;
				}
				if (value.length < 8) {
					return value;
				}

				const prefix = value.substring(0, 8);

				if (iso8061 && value.match(iso8061 as RegExp)) {
					return new Date(value);
				}
				if (prefix === "function") {
					return new Function(value);
				}
				if (prefix === "_PxEgEr_") {
					return new RegExp(value.slice(8));
				}

				return value;
			});
		},
	};
	function compareObj(
		firstObj: {
			[key: string]: any;
			[key: number]: any;
		},
		secondObj: {
			[key: string]: any;
			[key: number]: any;
		}
	): boolean {
		for (let key in firstObj) {
			if (firstObj.hasOwnProperty(key) && firstObj[key] !== undefined) {
				if (typeof firstObj[key] === "object") {
					if (typeof secondObj[key] !== "object") {
						return false;
					}
					if (Array.isArray(firstObj[key])) {
						if (!Array.isArray(secondObj[key])) {
							return false;
						}
						if (!compareArray(firstObj[key], secondObj[key])) {
							return false;
						}
					} else if (!compareObj(firstObj[key], secondObj[key])) {
						return false;
					}
				} else if (firstObj[key] !== secondObj[key]) {
					return false;
				}
			}
		}
		return true;
	}
	export function compareArray(
		firstArray: any[],
		secondArray: any[]
	): boolean {
		if (!firstArray && !secondArray) {
			return false;
		} else if (!firstArray || !secondArray) {
			return true;
		}
		const firstLength = firstArray.length;
		if (firstLength !== secondArray.length) {
			return false;
		}
		for (let i = 0; i < firstLength; i++) {
			if (typeof firstArray[i] === "object") {
				if (typeof secondArray[i] !== "object") {
					return false;
				}
				if (Array.isArray(firstArray[i])) {
					if (!Array.isArray(secondArray[i])) {
						return false;
					}
					if (!compareArray(firstArray[i], secondArray[i])) {
						return false;
					}
				} else if (!compareObj(firstArray[i], secondArray[i])) {
					return false;
				}
			} else if (firstArray[i] !== secondArray[i]) {
				return false;
			}
		}
		return true;
	}
	export function safe(node: CRM.MenuNode): CRM.SafeMenuNode;
	export function safe(node: CRM.LinkNode): CRM.SafeLinkNode;
	export function safe(node: CRM.ScriptNode): CRM.SafeScriptNode;
	export function safe(node: CRM.DividerNode): CRM.SafeDividerNode;
	export function safe(node: CRM.StylesheetNode): CRM.SafeStylesheetNode;
	export function safe(node: CRM.Node): CRM.SafeNode;
	export function safe(node: CRM.Node): CRM.SafeNode {
		return modules.crm.crmByIdSafe.get(node.id as CRM.NodeId<CRM.SafeNode>);
	}

	const keys: {
		[secretKey: string]: boolean;
	} = {};
	export function createSecretKey(): number[] {
		const key: number[] = [];
		for (let i = 0; i < 25; i++) {
			key[i] = Math.round(Math.random() * 100);
		}
		if (!keys[key.join(",")]) {
			keys[key.join(",")] = true;
			return key;
		} else {
			return createSecretKey();
		}
	}
	let _lastNumber: number = Math.round(Math.random() * 100);
	export function createUniqueNumber(): number {
		//Make it somewhat unpredictable
		const addition = Math.round(Math.random() * 100);
		_lastNumber += addition;
		return _lastNumber;
	}
	export async function generateItemId(): Promise<CRM.GenericNodeId> {
		modules.globalObject.globals.latestId =
			modules.globalObject.globals.latestId || 0;
		modules.globalObject.globals.latestId++;
		if (modules.storages.settingsStorage) {
			await modules.Storages.applyChanges({
				type: "optionsPage",
				settingsChanges: [
					{
						key: "latestId",
						oldValue: modules.globalObject.globals.latestId - 1,
						newValue: modules.globalObject.globals.latestId,
					},
				],
			});
		}
		return modules.globalObject.globals.latestId as CRM.GenericNodeId;
	}
	export async function getMultipleItemIds(
		amount: number
	): Promise<CRM.GenericNodeId[]> {
		modules.globalObject.globals.latestId =
			modules.globalObject.globals.latestId || 0;
		const ids: CRM.GenericNodeId[] = [];
		for (let i = 0; i < amount; i++) {
			modules.globalObject.globals.latestId++;
			ids.push(
				modules.globalObject.globals.latestId as CRM.GenericNodeId
			);
		}
		if (modules.storages.settingsStorage) {
			await modules.Storages.applyChanges({
				type: "optionsPage",
				settingsChanges: [
					{
						key: "latestId",
						oldValue:
							modules.globalObject.globals.latestId - amount,
						newValue: modules.globalObject.globals.latestId,
					},
				],
			});
		}
		return ids;
	}
	export function convertFileToDataURI(
		url: string,
		callback: (dataURI: string, dataString: string) => void,
		onError?: () => void
	) {
		fetch(url)
			.then((response) => {
				const readerResults: [string, string] = [null, null];

				// Get blob from response
				response.blob().then((blob) => {
					// Convert blob to data URI
					const blobReader = new FileReader();
					blobReader.onloadend = () => {
						readerResults[0] = blobReader.result as string;
						if (readerResults[1]) {
							callback(readerResults[0], readerResults[1]);
						}
					};
					blobReader.readAsDataURL(blob);

					// Also get text content
					const textReader = new FileReader();
					textReader.onloadend = () => {
						readerResults[1] = textReader.result as string;
						if (readerResults[0]) {
							callback(readerResults[0], readerResults[1]);
						}
					};
					textReader.readAsText(blob);
				});
			})
			.catch((err) => {
				if (onError) {
					onError();
				}
			});
	}
	export function isNewer(newVersion: string, oldVersion: string): boolean {
		const newSplit = newVersion.split(".");
		const oldSplit = oldVersion.split(".");

		const longest = Math.max(newSplit.length, oldSplit.length);
		for (let i = 0; i < longest; i++) {
			const newNum = ~~newSplit[i];
			const oldNum = ~~oldSplit[i];
			if (newNum > oldNum) {
				return true;
			} else if (newNum < oldNum) {
				return false;
			}
		}
		return false;
	}
	export function pushIntoArray<T, U>(
		toPush: T,
		position: number,
		target: (T | U)[]
	): (T | U)[] {
		if (position === target.length) {
			target[position] = toPush;
		} else {
			const length = target.length + 1;
			let temp1: T | U = target[position];
			let temp2: T | U = toPush;
			for (let i = position; i < length; i++) {
				target[i] = temp2;
				temp2 = temp1;
				temp1 = target[i + 1];
			}
		}
		return target;
	}
	export function flattenCrm(searchScope: CRM.Node[], obj: CRM.Node): void;
	export function flattenCrm(
		searchScope: CRM.SafeNode[],
		obj: CRM.SafeNode
	): void;
	export function flattenCrm(
		searchScope: CRM.Node[] | CRM.SafeNode[],
		obj: CRM.Node | CRM.SafeNode
	) {
		(searchScope as any).push(obj as any);
		if (obj.type === "menu" && obj.children) {
			for (const child of obj.children) {
				flattenCrm(searchScope, child);
			}
		}
	}
	export function iterateMap<K, V>(
		map: Map<K, V>,
		handler: (key: K, val: V) => void | true
	) {
		let breakLoop: boolean = false;
		map.forEach((value, key) => {
			if (breakLoop) {
				return;
			}
			if (handler(key, value)) {
				breakLoop = true;
			}
		});
	}
	export function mapToArr<K, V>(map: Map<K, V>): [K, V][] {
		const pairs: [K, V][] = [];
		map.forEach((value, key) => {
			pairs.push([key, value]);
		});
		return pairs;
	}
	export async function asyncIterateMap<K, V>(
		map: Map<K, V>,
		handler: (key: K, val: V) => Promise<void | true>
	) {
		for (const [key, value] of mapToArr(map)) {
			if (await handler(key, value)) {
				return;
			}
		}
	}
	export function setMapDefault<K, V>(
		map: Map<K, V>,
		key: K,
		defaultValue: V
	): boolean {
		if (!map.has(key)) {
			map.set(key, defaultValue);
			return true;
		}
		return false;
	}
	export function accessPath<
		B,
		K1 extends keyof B,
		K2 extends keyof B[K1],
		K3 extends keyof B[K1][K2],
		K4 extends keyof B[K1][K2][K3],
		K5 extends keyof B[K1][K2][K3][K4]
	>(base: B, key1: K1): B[K1] | void;
	export function accessPath<
		B,
		K1 extends keyof B,
		K2 extends keyof B[K1],
		K3 extends keyof B[K1][K2],
		K4 extends keyof B[K1][K2][K3],
		K5 extends keyof B[K1][K2][K3][K4]
	>(base: B, key1: K1, key2: K2): B[K1][K2] | void;
	export function accessPath<
		B,
		K1 extends keyof B,
		K2 extends keyof B[K1],
		K3 extends keyof B[K1][K2],
		K4 extends keyof B[K1][K2][K3],
		K5 extends keyof B[K1][K2][K3][K4]
	>(base: B, key1: K1, key2: K2, key3: K3): B[K1][K2][K3] | void;
	export function accessPath<
		B,
		K1 extends keyof B,
		K2 extends keyof B[K1],
		K3 extends keyof B[K1][K2],
		K4 extends keyof B[K1][K2][K3],
		K5 extends keyof B[K1][K2][K3][K4]
	>(
		base: B,
		key1: K1,
		key2: K2,
		key3: K3,
		key4: K4
	): B[K1][K2][K3][K4] | void;
	export function accessPath<
		B,
		K1 extends keyof B,
		K2 extends keyof B[K1],
		K3 extends keyof B[K1][K2],
		K4 extends keyof B[K1][K2][K3],
		K5 extends keyof B[K1][K2][K3][K4]
	>(
		base: B,
		key1: K1,
		key2: K2,
		key3: K3,
		key4: K4,
		key5: K5
	): B[K1][K2][K3][K4][K5] | void;
	export function accessPath<
		B,
		K1 extends keyof B,
		K2 extends keyof B[K1],
		K3 extends keyof B[K1][K2],
		K4 extends keyof B[K1][K2][K3],
		K5 extends keyof B[K1][K2][K3][K4]
	>(
		base: B,
		key1: K1,
		key2?: K2,
		key3?: K3,
		key4?: K4,
		key5?: K5
	):
		| B[K1][K2][K3][K4][K5]
		| B[K1][K2][K3][K4]
		| B[K1][K2][K3]
		| B[K1][K2]
		| B[K1]
		| void {
		const v1 = base[key1];
		if (!v1) {
			return undefined;
		}
		if (!key2) {
			return v1;
		}

		const v2 = v1[key2];
		if (!v2) {
			return undefined;
		}
		if (!key3) {
			return v2;
		}

		const v3 = v2[key3];
		if (!v3) {
			return undefined;
		}
		if (!key4) {
			return v3;
		}

		const v4 = v3[key4];
		if (!v4) {
			return undefined;
		}
		if (!key5) {
			return v4;
		}

		const v5 = v4[key5];
		if (!v5) {
			return undefined;
		}
		return v5;
	}
	export function toMap<
		V,
		K extends string | number,
		O extends CRM.ObjectifiedMap<K, V>
	>(obj: O): Map<K, V> {
		return new Map<K, V>(
			Object.getOwnPropertyNames(obj).map((key: any) => {
				return [
					key,
					obj[key as Extract<keyof CRM.ObjectifiedMap<K, V>, string>],
				];
			})
		);
	}
	export function fromMap<K, V>(map: Map<K, V>): CRM.ObjectifiedMap<K, V> {
		const obj: CRM.ObjectifiedMap<K, V> = {} as any;
		map.forEach((val, key) => {
			(obj as any)[key] = val;
		});
		return obj;
	}
	export function toArray<
		T,
		O extends {
			[key: string]: T;
		} = {}
	>(obj: O): [string, T][] {
		return Object.getOwnPropertyNames(obj).map((key) => {
			return [key, obj[key]] as [string, T];
		});
	}
	export function removeTab(tabId: TabId) {
		const nodeStatusses = modules.crmValues.nodeTabStatuses;

		iterateMap(nodeStatusses, (_, { tabs }) => {
			if (tabs.has(tabId)) {
				tabs.delete(tabId);
			}
		});

		modules.crmValues.tabData.delete(tabId);
	}
	export function leftPad(char: string, amount: number): string {
		let res = "";
		for (let i = 0; i < amount; i++) {
			res += char;
		}
		return res;
	}
	export function getLastItem<T>(arr: T[]): T {
		return arr[arr.length - 1];
	}
	export function endsWith(haystack: string, needle: string): boolean {
		return (
			haystack
				.split("")
				.reverse()
				.join("")
				.indexOf(needle.split("").reverse().join("")) === 0
		);
	}
	const _requiredFiles: string[] = [];
	export async function execFile(
		path: string,
		global?: keyof BackgroundpageWindow
	): Promise<void> {
		if (_requiredFiles.indexOf(path) > -1) {
			return;
		}
		const el = document.createElement("script");
		el.src = browserAPI.runtime.getURL(path);
		document.body.appendChild(el);
		_requiredFiles.push(path);
		if (global) {
			await self.onExists(global, self);
		}
	}
	export function getScriptNodeJS(
		script: CRM.ScriptNode | CRM.SafeScriptNode,
		type: "background" | "script" = "script"
	): string {
		return type === "background"
			? script.value.backgroundScript
			: script.value.script;
	}
	export async function getScriptNodeScript(
		script: CRM.ScriptNode | CRM.SafeScriptNode,
		type: "background" | "script" = "script"
	): Promise<string> {
		if (script.value.ts && script.value.ts.enabled) {
			await modules.CRMNodes.TS.compileNode(script);
			return type === "background"
				? script.value.ts.backgroundScript.compiled
				: script.value.ts.script.compiled;
		}
		return getScriptNodeJS(script, type);
	}
	export async function getLibraryCode(library: CRM.InstalledLibrary) {
		if (library.ts && library.ts.enabled) {
			if (library.ts.code) {
				return library.ts.code.compiled;
			}
			const { ts } = await await modules.CRMNodes.TS.compileLibrary(
				library
			);
			return ts.code.compiled;
		}
		return library.code;
	}
	const HOUR = 1000 * 60 * 60;
	let lastFsAccessCheck: number;
	let fsAccessAllowed: boolean;
	export function canRunOnUrl(url: string): boolean {
		if (
			!url ||
			modules.CRMNodes.Running.urlIsGlobalExcluded(url) ||
			url.indexOf("chrome://") !== -1 ||
			url.indexOf("chrome-extension://") !== -1 ||
			url.indexOf("about://") !== -1 ||
			url.indexOf("chrome-devtools://") !== -1 ||
			url.indexOf("view-source:") !== -1 ||
			(url.indexOf("://chrome.google") > -1 &&
				url.indexOf("/webstore") > -1)
		) {
			return false;
		}

		if (Date.now() - lastFsAccessCheck > HOUR) {
			async () => {
				fsAccessAllowed =
					await browserAPI.extension.isAllowedFileSchemeAccess();
				lastFsAccessCheck = Date.now();
			};
		}
		if (fsAccessAllowed) {
			return true;
		}
		return url.indexOf("file://") === -1;
	}
	export async function xhr(url: string): Promise<string> {
		const res = await fetch(url);
		return res.text();
	}
	export function wait(duration: number): Promise<void> {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve(null);
			}, duration);
		});
	}
	//Immediately-invoked promise expresion
	export function iipe<T>(fn: () => Promise<T>): Promise<T> {
		return fn();
	}
	export function createArray(length: number): void[] {
		const arr = [];
		for (let i = 0; i < length; i++) {
			arr[i] = undefined;
		}
		return arr;
	}
	export function promiseChain<T>(initializers: (() => Promise<any>)[]) {
		return new Promise<T>((resolve) => {
			if (!initializers[0]) {
				return resolve(null);
			}

			initializers[0]().then(async (result) => {
				if (initializers[1]) {
					result = await promiseChain<T>(initializers.slice(1));
				}
				resolve(result);
			});
		});
	}
	export function postMessage(
		port: {
			postMessage(message: any): void;
		},
		message: any
	) {
		port.postMessage(message);
	}
	export function climbTree<
		T extends {
			children: T[];
		}
	>(tree: T[], shouldContinue: (item: T) => boolean) {
		for (const item of tree) {
			if (shouldContinue(item)) {
				climbTree(item.children, shouldContinue);
			}
		}
	}
	export function isThennable(value: any): value is Promise<any> {
		return (
			value &&
			typeof value === "object" &&
			typeof value.then === "function"
		);
	}
	export async function filter<T>(
		tree: T[],
		fn: (item: T) => boolean | Promise<boolean>
	) {
		for (let i = 0; i < tree.length; i++) {
			let res = fn(tree[i]);
			if (isThennable(res)) {
				res = await res;
			}
			if (!res) {
				//Remove
				tree.splice(i, 1);
			}
		}
	}
	export function crmForEach(crm: CRM.Tree, fn: (node: CRM.Node) => void) {
		for (const node of crm) {
			fn(node);
			if (node.type === "menu" && node.children) {
				crmForEach(node.children, fn);
			}
		}
	}
	export async function crmForEachAsync(
		crm: CRM.Tree,
		fn: (node: CRM.Node) => Promise<void>
	) {
		for (const node of crm) {
			await fn(node);
			if (node.type === "menu" && node.children) {
				await crmForEach(node.children, fn);
			}
		}
	}
	export function getChromeVersion() {
		if (BrowserAPI.getBrowser() === "chrome") {
			return parseInt(
				navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2],
				10
			);
		}
		return 1000;
	}
	export function applyContextmenuOverride<
		T extends ContextMenuCreateProperties | ContextMenuUpdateProperties,
		U extends ContextMenuOverrides
	>(base: T, override: U): T {
		override = override || ({} as U);
		base = base || ({} as T);
		const { type, checked, contentTypes, isVisible, isDisabled, name } =
			override;
		if (type) {
			base.type = type;
		}
		if (typeof checked === "boolean") {
			base.checked = checked;
		}
		if (contentTypes) {
			base.contexts = contentTypes;
		}
		if (
			typeof isVisible === "boolean" &&
			BrowserAPI.getBrowser() === "chrome" &&
			getChromeVersion() >= 62
		) {
			(base as any).visible = isVisible;
		}
		if (typeof isDisabled === "boolean") {
			base.enabled = !isDisabled;
		}
		if (name) {
			base.title = name;
		}
		return base;
	}
	const locks: Map<LOCK, Promise<void>> = new Map();
	export const enum LOCK {
		ROOT_CONTEXTMENU_NODE,
	}
	export function lock(lockName: LOCK): Promise<() => void> {
		setMapDefault(locks, lockName, Promise.resolve(null));

		const currentLock = locks.get(lockName);
		let _resolve: () => void;
		const returnPromise = new Promise<void>((resolve) => {
			_resolve = () => {
				resolve(null);
			};
		});
		const prom = new Promise<void>((resolve) => {
			returnPromise.then(() => {
				resolve(null);
			});
		});
		locks.set(lockName, prom);

		return new Promise((resolve) => {
			currentLock.then(() => {
				resolve(_resolve);
			});
		});
	}
}
