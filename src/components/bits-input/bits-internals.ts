import {InputInternals}                               from "../input-internals";
import {decrement, flip, increment, replaceSelection} from "./change";
import {onKeyDown}                                    from "./event-handlers/keyboard";
import {onDoubleClick, positionAtX}                   from "./event-handlers/pointer";
import {getSelection}                                 from "./selection";
import {update}                                       from "./update";

export class BitsInternals extends InputInternals {
	buffer = new ArrayBuffer(8);
	data   = new DataView(this.buffer);

	get signCell     () { return this.cells[0] }
	get exponentCell () { return this.cells[1] }
	get mantissaCell () { return this.cells[2] }

	constructor(owner: HTMLElement) { super(owner, 64) }

	increment = increment;
	decrement = decrement;
	flip      = flip;

	getSelection = getSelection;
	positionAtX  = positionAtX;

	replaceSelection = replaceSelection;
	update           = update;

	onDoubleClick = onDoubleClick;
	onKeyDown     = onKeyDown
}