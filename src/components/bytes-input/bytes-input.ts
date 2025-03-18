import {html}                from "../../lib/html";
import {keyEvent}            from "../../lib/keyboard";
import {BaseInput, EventMap} from "../base-input";
import {BytesInternals}      from "./bytes-internals";

export class BytesInput extends BaseInput {
	protected _internals = new BytesInternals(this);

	get value(): number { return this._internals.data.getFloat64(0) }
	set value(value: number) {
		if (this.value !== value) {
			this._internals.data.setFloat64(0, value);
			this._internals.setPosition(this.selectionEnd);
			this._internals.update();
		}
	}

	protected _events = {
		click       : this._internals.onClick.bind(this._internals),
		copy        : this._internals.onCopy.bind(this._internals),
		cut         : this._internals.onCut.bind(this._internals),
		dblclick    : this._internals.onDoubleClick.bind(this._internals),
		keydown     : e => this._internals.onKeyDown(keyEvent(e)),
		paste       : this._internals.onPaste.bind(this._internals),
		pointerdown : this._internals.onPointerDown.bind(this._internals),
		pointermove : this._internals.onPointerMove.bind(this._internals),
		pointerup   : this._internals.onPointerUp.bind(this._internals),
	} satisfies EventMap;

	constructor() {
		super();

		this._internals.cells = Array.from({length: 8}).map((_, i) => {
			const pre = document.createElement("pre");
			pre.innerHTML = i ? "00" : html`<span class="caret">0</span>0`;
			this._shadow.append(pre);
			return pre;
		});
	}
}