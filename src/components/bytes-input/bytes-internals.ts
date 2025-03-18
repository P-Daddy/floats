import {InputInternals}                         from "../input-internals";
import {decrement, increment, replaceSelection} from "./change";
import {onKeyDown}                              from "./event-handlers/keyboard";
import {onDoubleClick, positionAtX}             from "./event-handlers/pointer";
import {getSelection}                           from "./selection";
import {update}                                 from "./update";

export class BytesInternals extends InputInternals {
	buffer = new ArrayBuffer(8);
	data   = new DataView(this.buffer);

	constructor(owner: HTMLElement) { super(owner, 16) }

	increment = increment;
	decrement = decrement;

	getSelection = getSelection;
	positionAtX  = positionAtX;

	replaceSelection = replaceSelection;
	update           = update;

	onDoubleClick = onDoubleClick;
	onKeyDown     = onKeyDown;
}