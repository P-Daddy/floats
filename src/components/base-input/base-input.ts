import {getBackgroundColor} from "../../lib/background";
import {TypedObject}        from "../../lib/typed-object";
import {InputInternals}     from "../input-internals";
import {styles}             from "./styles";

export type EventMap = {
	[K in keyof HTMLElementEventMap]?: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;
};

export abstract class BaseInput extends HTMLElement {
	protected abstract _internals : InputInternals;
	protected abstract _events    : EventMap;

	protected _shadow: ShadowRoot;

	get selectionStart()              { return this._internals.selectionStart }
	set selectionStart(value: number) { this._internals.selectionStart = value }

	get selectionEnd()              { return this._internals.selectionEnd }
	set selectionEnd(value: number) { this._internals.selectionEnd = value }

	constructor() {
		super();

		this._shadow = this.attachShadow({mode: "open"});
		this._shadow.adoptedStyleSheets = [styles];
	}

	connectedCallback(): void {
		this.contentEditable = "true";
		if (!this.tabIndex || this.tabIndex < 0)
			this.tabIndex = 0;

		for (const pre of this._internals.cells) {
			const {color} = getComputedStyle(pre);
			const backgroundColor = getBackgroundColor(pre);
			console.log(pre, color, backgroundColor);
			pre.style.setProperty("--fg", color);
			pre.style.setProperty("--bg", backgroundColor);
		}

		for (const [event, handler] of TypedObject.entries(this._events))
			this.addEventListener(event, handler as any);
	}

	disconnectedCallback(): void {
		for (const [event, handler] of TypedObject.entries(this._events))
			this.removeEventListener(event, handler as any);
	}
}