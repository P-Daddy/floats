import {html}          from "../../lib/html";
import {BitsInternals} from "./bits-internals";
import {toBinary}      from "./format";

export function update(this: BitsInternals): void {
	const sign = this.data.getUint8(0) & 128 ? '1' : '0';

	const exponent =
		toBinary(this.data.getUint8(0)).slice(1) +
		toBinary(this.data.getUint8(1)).slice(0, 4);

	const mantissa =
		toBinary(this.data.getUint8(1)).slice(4) +
		toBinary(this.data.getUint8(2)) +
		toBinary(this.data.getUint8(3)) +
		toBinary(this.data.getUint8(4)) +
		toBinary(this.data.getUint8(5)) +
		toBinary(this.data.getUint8(6)) +
		toBinary(this.data.getUint8(7));

	if (this.selectionStart === this.selectionEnd) {
		if (this.selectionEnd === 0)
			this.signCell.innerHTML = html`<span class="caret">${sign}</span>`;
		else
			this.signCell.innerHTML = sign;

		if (this.selectionEnd > 0 && this.selectionEnd < 12) {
			this.exponentCell.innerHTML =
				exponent.slice(0, this.selectionEnd - 1) +
				html`<span class="caret">${exponent[this.selectionEnd - 1]}</span>` +
				exponent.slice(this.selectionEnd);
		} else
			this.exponentCell.innerHTML = exponent;

		if (this.selectionEnd >= 12) {
			this.mantissaCell.innerHTML =
				mantissa.slice(0, this.selectionEnd - 12) +
				html`<span class="caret">${mantissa[this.selectionEnd - 12]}</span>` +
				mantissa.slice(this.selectionEnd - 11);
		} else
			this.mantissaCell.innerHTML = mantissa;

		return;
	}

	const selectionLeft  = this.selectionLeft;
	const selectionRight = this.selectionRight;
	const position       = this.position;

	const notSelected = (start: number, end: number, text: string): string =>
		position < start || position >= end ?
			text :
			text.slice(0, position - start) +
			html`<span class="caret">${text[position - start]}</span>` +
			text.slice(position - start + 1);

	const totallySelected = (start: number, end: number, text: string): string =>
		html`<span class="selection">${notSelected(start, end, text)}</span>`;

	const leftSelected = (start: number, end: number, text: string): string =>
		totallySelected(start, selectionRight, text.slice(0, selectionRight - start)) +
		notSelected(selectionRight, end, text.slice(selectionRight - start));

	const rightSelected = (start: number, end: number, text: string): string =>
		notSelected(start, selectionLeft, text.slice(0, selectionLeft - start)) +
		totallySelected(selectionLeft, end, text.slice(selectionLeft - start));

	const middleSelected = (start: number, end: number, text: string): string =>
		notSelected(start, selectionLeft, text.slice(0, selectionLeft - start)) +
		totallySelected(selectionLeft, selectionRight, text.slice(selectionLeft - start, selectionRight - start)) +
		notSelected(selectionRight, end, text.slice(selectionRight - start));

	const getHTML = (start: number, end: number, text: string): string =>
		selectionRight < start || selectionLeft >= end ?
			notSelected(start, end, text) :
		selectionLeft <= start && selectionRight >= end ?
			totallySelected(start, end, text) :
		selectionLeft <= start ?
			leftSelected(start, end, text) :
		selectionRight >= end ?
			rightSelected(start, end, text) :
		middleSelected(start, end, text);

	this.signCell    .innerHTML = getHTML( 0,  1, sign);
	this.exponentCell.innerHTML = getHTML( 1, 12, exponent);
	this.mantissaCell.innerHTML = getHTML(12, 64, mantissa);
}