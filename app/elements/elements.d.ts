/// <reference path="../../tools/definitions/chrome.d.ts"/>
/// <reference path="../../tools/definitions/polymer.d.ts"/>
/// <reference path="../../tools/definitions/jquery.d.ts"/>
/// <reference path="./center-element/center-element.ts" />
/// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />
/// <reference path="./change-log/change-log.ts" />
/// <reference path="./crm-app/crm-app.ts" />
/// <reference path="./crm-edit-page/crm-edit-page.ts" />
/// <reference path="./default-link/default-link.ts" />
/// <reference path="./echo-html/echo-html.ts" />
/// <reference path="./edit-crm/edit-crm.ts" />
/// <reference path="./edit-crm-item/edit-crm-item.ts" />
/// <reference path="./edit-pages/divider-edit/divider-edit.ts" />
/// <reference path="./edit-pages/link-edit/link-edit.ts" />
/// <reference path="./edit-pages/menu-edit/menu-edit.ts" />
/// <reference path="./edit-pages/script-edit/script-edit.ts" />
/// <reference path="./edit-pages/stylesheet-edit/stylesheet-edit.ts" />
/// <reference path="./edit-pages/code-edit-pages/code-edit-behavior.ts" />
/// <reference path="./edit-pages/code-edit-pages/monaco-commands.ts" />
/// <reference path="./edit-pages/monaco-editor/monaco-editor.ts" />
/// <reference path="./error-reporting-tool/error-reporting-tool.ts" />
/// <reference path="./installing/install-confirm/install-confirm.ts" />
/// <reference path="./installing/install-error/install-error.ts" />
/// <reference path="./installing/install-page/install-page.ts" />
/// <reference path="./log-console/log-console.ts" />
/// <reference path="./log-page/log-page.ts" />
/// <reference path="./animations/scale-up-animation/scale-up-animation.ts" />
/// <reference path="./animations/scale-down-animation/scale-down-animation.ts" />
/// <reference path="./animations/fade-out-animation/fade-out-animation.ts" />
/// <reference path="./node-edit-behavior/node-edit-behavior.ts" />
/// <reference path="./inputs/paper-dropdown-behavior/paper-dropdown-behavior.ts" />
/// <reference path="./inputs/paper-dropdown-menu/paper-dropdown-menu.ts" />
/// <reference path="./inputs/paper-toggle-option/paper-toggle-option.ts" />
/// <reference path="./inputs/paper-array-input/paper-array-input.ts" />
/// <reference path="./inputs/paper-menu/paper-menu.ts" />
/// <reference path="./tools/paper-get-page-properties/paper-get-page-properties.ts" />
/// <reference path="./tools/paper-libraries-selector/paper-libraries-selector.ts" />
/// <reference path="./tools/paper-search-website-dialog/paper-search-website-dialog.ts" />
/// <reference path="./tools/use-external-editor/use-external-editor.ts" />
/// <reference path="./type-switcher/type-switcher.ts" />
/// <reference path="../js/shared.ts" />


interface Completion {
	doc: string;
	name: string;
	type: string;
	url?: string;
}

interface Completions {
	completions: Array<Completion>;
	end: {
		ch: number;
		line: number;
	};
	isObjectKey: boolean;
	isProperty: boolean;
	start: {
		ch: number;
		line: number;
	}
}

interface CMCompletionFns {
	resolvePos(file: Tern.File, pos: {
		line: number;
		ch: number;
	}): number;
}

interface JSLintWarning {
	name: string;
	column: number;
	line: number;
	code: string;
	message: string;
	a: any;
	b?: any;
	c?: any;
	d?: any;
}

interface JSLintResult {
	directives: Array<any>;
	edition: string;
	exports: {
		[key: string]: any;
	};
	froms: Array<string>;
	functions: Array<any>;
	global: any;
	id: "(JSLint)";
	json: boolean;
	lines: Array<string>;
	module: boolean;
	ok: boolean;
	option: {
		[key: string]: any;
	};
	property: any;
	stop: boolean;
	tokens: Array<any>;
	tree: Array<any>;
	warnings: Array<JSLintWarning>;
}

interface CSSLintWarning {
	type: string;
	line: number;
	col: number;
	message: string;
}

interface LinterWarning {
	col: number;
	line: number;
	message: string;
}

interface Window {
	jslint(source: String, option_object: {
		[key: string]: any;
	}, globals: Array<string>): JSLintResult;
	CSSLint: {
		verify(text: string, ruleset?: Array<any>): {
			messages: Array<CSSLintWarning>;
		}
	}
	monaco: typeof monaco;
	require: {
		(paths: Array<string>, callback: () => void): void;
		config(config: {
			paths: {
				[key: string]: string;
			}
		}): void;
	}
	monacoCommands: MonacoCommands;
	MonacoEditorHookManager: typeof MonacoEditorElement.MonacoEditorHookManager;
	crmAPIDefs?: any;
	lastError?: Error;
	polymerElementsLoaded?: boolean;
	CRMLoaded?: {
		listener: () => void;
		register(fn: () => void): void;
	}
	requestIdleCallback(callback: (deadline: {
		timeRemaining(): number;
	}) => void): number;
	Intl: typeof Intl;
	unescape(str: string): string;
	md5: (input: any) => string;

	doc: ModuleMap['crm-app'];
	logElements?: {
		logLines: any;
	};
	runOrAddAsCallback(toRun: Function, thisElement: HTMLElement, params: Array<any>): void;
	useOptionsCompletions: boolean;
	Storages: {
		loadStorages(callback: () => void): void;
	}

	app: CrmApp;
	logPage: LogPage;
	changeLog: ChangeLog;
	logConsole: LogConsole;
	crmEditPage: CrmEditPage;
	installPage: InstallPage;
	splashScreen: SplashScreen;
	installConfirm: InstallConfirm;
	externalEditor: UseExternalEditor;
	errorReportingTool: ErrorReportingTool;
	linkEdit: NodeEditBehaviorLinkInstance;
	menuEdit: NodeEditBehaviorMenuInstance;
	scriptEdit: NodeEditBehaviorScriptInstance;
	dividerEdit: NodeEditBehaviorDividerInstance;
	stylesheetEdit: NodeEditBehaviorStylesheetInstance;
}

type EditPage = NodeEditBehaviorScriptInstance|
	NodeEditBehaviorStylesheetInstance|NodeEditBehaviorLinkInstance|
	NodeEditBehaviorMenuInstance|NodeEditBehaviorDividerInstance;

interface LogLineContainerInterface {
	add(lineData: Array<LogLineData>, line: LogListenerLine): void;
	popEval(): {
		data: Array<LogLineData>;
		line: LogListenerLine;
	};
	clear(): void;
	render(): JSX.Element;

	props: {
		items: Array<any>;
		logConsole: LogConsole;
	}
}

//Animation
interface Animation {
	onfinish?: () => void;
	play(): void;
	reverse(): void;
	effect: {
		target: HTMLElement;
	}
}

interface HTMLElement {
	animate<K extends {
		[key: string]: string;
	} = {
		[key: string]: string;
	}>(this: HTMLElement, properties: [{
		[key in keyof K]: string|number;
	}, {
		[key in keyof K]: string|number;
	}], options: {
		duration?: number;
		easing?: string;
		fill?: 'forwards'|'backwards'|'both';
	}): Animation;
	disabled: boolean;
	getRootNode(): ShadowRoot;
}

interface CSSStyleDeclaration {
	willChange: string;
	WebkitTransform: string;
}