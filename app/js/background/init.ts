import { ModuleData, StorageModules, Modules } from "./moduleTypes";
import { BackgroundpageWindow, GlobalObject } from "./sharedTypes";
import { GlobalDeclarations } from "./global-declarations.js";
import { MessageHandling } from "./messagehandling.js";
import { CRMAPIFunctions } from "./crmapifunctions.js";
import { BrowserHandler } from "./browserhandler.js";
import { I18NKeys } from "../../_locales/i18n-keys";
import { APIMessaging } from "./api-messaging.js";
import { CRMAPICall } from "./crmapicall.js";
import { URLParsing } from "./urlparsing.js";
import { Resources } from "./resources.js";
import { Storages } from "./storages.js";
import { Logging } from "./logging.js";
import { Sandbox } from "./sandbox.js";
import { Global } from "./global.js";
import { CRMNodes } from "./crm.js";
import { Caches } from "./cache.js";
import { Info } from "./info.js";
import { Util } from "./util.js";

declare const browserAPI: browserAPI;
declare const self: BackgroundpageWindow;

export namespace Init {
	let modules: ModuleData;

	function initModule(_modules: ModuleData) {
		modules = _modules;
	}

	export async function init() {
		await initModules();
		await (modules.globalObject.backgroundPageLoaded = initRoutine());
		setGlobals();
	}

	function isNode() {
		return (
			typeof location === "undefined" ||
			typeof location.host === "undefined"
		);
	}

	async function genStorageModules(): Promise<StorageModules> {
		const isDev =
			(await browserAPI.runtime.getManifest()).short_name.indexOf("dev") >
			-1;
		const globalObject: GlobalObject = isNode() || isDev ? self : {};
		const globals = Global.globals;
		globalObject.globals = globals;

		const {
			crm,
			storages,
			crmValues,
			constants,
			listeners,
			background,
			toExecuteNodes,
		} = globals;
		return {
			crm,
			storages,
			crmValues,
			constants,
			listeners,
			background,
			toExecuteNodes,
			globalObject,
		};
	}

	function genModulesObject(): Modules {
		return {
			APIMessaging,
			BrowserHandler,
			Caches,
			CRMNodes,
			CRMAPICall,
			CRMAPIFunctions,
			GlobalDeclarations,
			Logging,
			MessageHandling,
			Resources,
			Sandbox,
			Storages,
			URLParsing,
			Util,
		};
	}

	async function genModulesData(): Promise<ModuleData> {
		return { ...(await genStorageModules()), ...genModulesObject() };
	}

	async function initModules() {
		const moduleData = await genModulesData();

		APIMessaging.initModule(moduleData);
		BrowserHandler.initModule(moduleData);
		Caches.initModule(moduleData);
		CRMNodes.initModule(moduleData);
		CRMAPICall.initModule(moduleData);
		CRMAPIFunctions.initModule(null, moduleData);
		Global.initModule(moduleData);
		GlobalDeclarations.initModule(moduleData);
		Logging.initModule(moduleData);
		MessageHandling.initModule(moduleData);
		Resources.initModule(moduleData);
		Storages.initModule(moduleData);
		URLParsing.initModule(moduleData);
		Util.initModule(moduleData);
		initModule(moduleData);
	}

	async function initRoutine() {
		Info.init();

		console.group(await self.__(I18NKeys.background.init.initialization));
		console.group(await self.__(I18NKeys.background.init.storage));
		await Util.iipe(async () => {
			await Storages.loadStorages();
			console.groupEnd();
			try {
				modules.globalObject.globals.latestId =
					modules.storages.settingsStorage.latestId;
				self.info(
					await self.__(
						I18NKeys.background.init.registeringPermissionListeners
					)
				);
				await GlobalDeclarations.refreshPermissions();
				self.info(
					await self.__(I18NKeys.background.init.registeringHandler)
				);
				GlobalDeclarations.setHandlerFunction();
				browserAPI.runtime.onConnect.addListener((port) => {
					port.onMessage.addListener(
						self.createHandlerFunction(port)
					);
				});
				browserAPI.runtime.onMessage.addListener(
					MessageHandling.handleRuntimeMessageInitial
				);
				self.info(await self.__(I18NKeys.background.init.buildingCrm));
				await CRMNodes.buildPageCRM();
				self.info(await self.__(I18NKeys.background.init.compilingTs));
				await CRMNodes.TS.compileAllInTree();
				console.groupCollapsed(
					await self.__(I18NKeys.background.init.previousOpenTabs)
				);
				await GlobalDeclarations.restoreOpenTabs();
				console.groupEnd();
				console.groupCollapsed(
					await self.__(I18NKeys.background.init.backgroundpages)
				);
				await CRMNodes.Script.Background.createBackgroundPages();
				console.groupEnd();
				self.info(
					await self.__(I18NKeys.background.init.registeringHandlers)
				);
				GlobalDeclarations.init();

				//Checks if all values are still correct
				console.group(
					await self.__(I18NKeys.background.init.resources)
				);
				self.info(
					await self.__(I18NKeys.background.init.updatingResources)
				);
				Resources.updateResourceValues();
				self.info(
					await self.__(I18NKeys.background.init.updatingNodes)
				);
				//Dont' wait for them but do them in order
				(async () => {
					await CRMNodes.Script.Updating.updateScripts();
					await CRMNodes.Stylesheet.Updating.updateStylesheets();
				})();
				setInterval(() => {
					(async () => {
						self.info(
							await self.__(
								I18NKeys.background.init.updatingNodes
							)
						);
						await CRMNodes.Script.Updating.updateScripts();
						await CRMNodes.Stylesheet.Updating.updateStylesheets();
					})();
				}, 6 * 60 * 60 * 1000);
				console.groupEnd();

				//Debugging data
				console.groupCollapsed(
					await self.__(I18NKeys.background.init.debugging)
				);
				self.info(await self.__(I18NKeys.background.init.debugInfo));
				self.info(
					await self.__(I18NKeys.background.init.invalidatedTabs),
					modules.storages.failedLookups
				);
				self.info(
					await self.__(
						I18NKeys.background.init.insufficientPermissions
					),
					modules.storages.insufficientPermissions
				);
				console.groupEnd();

				self.info(
					await self.__(
						I18NKeys.background.init.registeringConsoleInterface
					)
				);
				GlobalDeclarations.initGlobalFunctions();

				if (location.href.indexOf("test") > -1) {
					modules.globalObject.Storages = Storages;
				}
				if (isNode()) {
					modules.globalObject.TransferFromOld =
						Storages.SetupHandling.TransferFromOld;
				}

				for (let i = 0; i < 5; i++) {
					console.groupEnd();
				}

				self.info(await self.__(I18NKeys.background.init.done));
				if (!isNode()) {
					self.log("");
					self.logAsync(
						self.__(
							I18NKeys.background.init.loggingExplanation,
							browserAPI.runtime.getURL("html/logging.html")
						)
					);
					self.logAsync(
						self.__(I18NKeys.background.init.debugExplanation)
					);
				}
			} catch (e) {
				for (let i = 0; i < 10; i++) {
					console.groupEnd();
				}

				self.log(e);
				console.trace();
				throw e;
			}
		});
	}

	function setGlobals() {
		self.logging = modules.globalObject.globals.logging;
		self.backgroundPageLog = modules.Logging.backgroundPageLog;
	}
}
