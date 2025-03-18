import {html}                from "../../lib/html";
import {keyEvent}            from "../../lib/keyboard";
import {BaseInput, EventMap} from "../base-input";
import {BitsInternals}       from "./bits-internals";
import {styles} from "./styles";

export class BitsInput extends BaseInput {
	protected _internals = new BitsInternals(this);

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

		this._shadow.adoptedStyleSheets.push(styles);

		const signCell     = document.createElement("pre");
		const exponentCell = document.createElement("pre");
		const mantissaCell = document.createElement("pre");

		signCell    .innerHTML = html`<span class="caret">0</span>`;
		exponentCell.innerHTML = '0'.repeat(11);
		mantissaCell.innerHTML = '0'.repeat(52);

		this._shadow.append(signCell);
		this._shadow.append(exponentCell);
		this._shadow.append(mantissaCell);

		this._internals.cells = [signCell, exponentCell, mantissaCell];
	}
}