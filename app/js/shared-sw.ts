/// <reference path="promiseType.ts" />

import { Polymer } from "../../tools/definitions/polymer";
import { Withable, I18N } from "./shared";
self;

declare global {
	interface Window {
		Promise: typeof Promise;
		onExists<T extends keyof C, C = Window>(
			key: T,
			container?: C
		): PromiseLike<C[T]>;
		onExistsChain<
			C,
			T1 extends keyof C,
			T2 extends keyof C[T1],
			T3 extends keyof C[T1][T2],
			T4 extends keyof C[T1][T2][T3],
			T5 extends keyof C[T1][T2][T3][T4]
		>(
			container: C,
			key1: T1
		): PromiseLike<C[T1]>;
		onExistsChain<
			C,
			T1 extends keyof C,
			T2 extends keyof C[T1],
			T3 extends keyof C[T1][T2],
			T4 extends keyof C[T1][T2][T3],
			T5 extends keyof C[T1][T2][T3][T4]
		>(
			container: C,
			key1: T1,
			key2: T2
		): PromiseLike<C[T1][T2]>;
		onExistsChain<
			C,
			T1 extends keyof C,
			T2 extends keyof C[T1],
			T3 extends keyof C[T1][T2],
			T4 extends keyof C[T1][T2][T3],
			T5 extends keyof C[T1][T2][T3][T4]
		>(
			container: C,
			key1: T1,
			key2: T2,
			key3: T3
		): PromiseLike<C[T1][T2][T3]>;
		onExistsChain<
			C,
			T1 extends keyof C,
			T2 extends keyof C[T1],
			T3 extends keyof C[T1][T2],
			T4 extends keyof C[T1][T2][T3],
			T5 extends keyof C[T1][T2][T3][T4]
		>(
			container: C,
			key1: T1,
			key2: T2,
			key3: T3,
			key4: T4
		): PromiseLike<C[T1][T2][T3][T4]>;
		onExistsChain<
			C,
			T1 extends keyof C,
			T2 extends keyof C[T1],
			T3 extends keyof C[T1][T2],
			T4 extends keyof C[T1][T2][T3],
			T5 extends keyof C[T1][T2][T3][T4]
		>(
			container: C,
			key1: T1,
			key2: T2,
			key3: T3,
			key4: T4,
			key5: T5
		): PromiseLike<C[T1][T2][T3][T4][T5]>;
		onExistsChain<
			C,
			T1 extends keyof C,
			T2 extends keyof C[T1],
			T3 extends keyof C[T1][T2],
			T4 extends keyof C[T1][T2][T3],
			T5 extends keyof C[T1][T2][T3][T4]
		>(
			container: C,
			key1: T1,
			key2?: T2,
			key3?: T3,
			key4?: T4,
			key5?: T5
		):
			| PromiseLike<C[T1][T2][T3][T4][T5]>
			| PromiseLike<C[T1][T2][T3][T4]>
			| PromiseLike<C[T1][T2][T3]>
			| PromiseLike<C[T1][T2]>
			| PromiseLike<C[T1]>;
		objectify<T>(fn: T): T;
		register(...fns: any[]): void;
		with<T>(initializer: () => Withable, fn: () => T): T;
		withAsync<T>(
			initializer: () => Promise<Withable>,
			fn: () => Promise<T>
		): Promise<T>;
		setDisplayFlex(el: { style: CSSStyleDeclaration }): void;
		setTransform(el: HTMLElement | SVGElement, value: string): void;
		animateTransform(
			el: HTMLElement | Polymer.PolymerElement,
			properties: {
				propName: string;
				postfix?: string;
				from: number;
				to: number;
			},
			options: {
				duration?: number;
				easing?: string;
				fill?: "forwards" | "backwards" | "both";
			}
		): Animation;
		__: I18N;
	}
}
