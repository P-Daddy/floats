import {registerComponents} from "./components";
import {BitsInput}          from "./components/bits-input";
import {BytesInput}         from "./components/bytes-input";
import {keyCombination}     from "./lib/keyboard";

registerComponents();

const codeInput    = document.querySelector("#code > input")    as HTMLInputElement;
const integerInput = document.querySelector("#integer > input") as HTMLInputElement;
const hexInput     = document.querySelector("#hex > input")     as HTMLInputElement;
const floatInput   = document.querySelector("#float > input")   as HTMLInputElement;
const bytesInput   = document.getElementById("bytes")           as BytesInput;
const bitsInput    = document.getElementById("bits")            as BitsInput;

codeInput.addEventListener("input", () => {
	codeInput.classList.remove("stale");
	if (!codeInput.value) {
		codeInput.classList.remove("error");
		return;
	}

	try {
		const value = eval(codeInput.value);
		if (typeof value === "number") {
			integerInput.value = Math.trunc(value).toString();
			hexInput    .value = value.toString(16);
			floatInput  .value = value.toString();
			bytesInput  .value = bitsInput.value = value;
			codeInput.classList.remove("error");
			return;
		}
	} catch {}
	codeInput.classList.add("error");
});

integerInput.addEventListener("keydown", e => {
	const key = keyCombination(e);
	if (key.length === 1) {
		if (key < '0' || key > '9')
			e.preventDefault();
	}
});
integerInput.addEventListener("input", () => {
	const value = Number(integerInput.value);
	hexInput  .value = value.toString(16);
	floatInput.value = value.toString();
	bytesInput.value = bitsInput.value = value;
	if (codeInput.value)
		codeInput.classList.add("stale");
});

hexInput.addEventListener("keydown", e => {
	console.log(e);
	const key = keyCombination(e);
	if (key.length === 1) {
		if (key < '0' || (key > '9' && key < 'A'))
			e.preventDefault();
		else if (key > 'F' && key < 'a')
			e.preventDefault();
		else if (key >= 'a' && key <= 'f') {
			e.preventDefault();
			const start = hexInput.selectionStart ?? 0;
			const end   = hexInput.selectionEnd   ?? 0;

			hexInput.value =
				hexInput.value.slice(0, start) +
				key.toUpperCase() +
				hexInput.value.slice(end);

			hexInput.selectionStart = hexInput.selectionEnd = start + 1;
		} else if (key > 'f')
			e.preventDefault();
	}
});
hexInput.addEventListener("input", () => {
	const value = parseInt(hexInput.value, 16);
	integerInput.value = floatInput.value = value.toString();
	bytesInput  .value = bitsInput .value = value;
	if (codeInput.value)
		codeInput.classList.add("stale");
});

floatInput.addEventListener("input", () => {
	const value = Number(floatInput.value);
	integerInput.value = Math.trunc(value).toString();
	hexInput    .value = value.toString(16);
	bytesInput  .value = bitsInput.value = value;
	if (codeInput.value)
		codeInput.classList.add("stale");
});

bytesInput.addEventListener("change", () => {
	const {value} = bytesInput;
	integerInput.value = Math.trunc(value).toString();
	hexInput    .value = value.toString(16);
	floatInput  .value = value.toString();
	bitsInput   .value = value;
	if (codeInput.value)
		codeInput.classList.add("stale");
});

bitsInput.addEventListener("change", () => {
	const {value} = bitsInput;
	integerInput.value = Math.trunc(value).toString();
	hexInput    .value = value.toString(16);
	floatInput  .value = value.toString();
	bytesInput  .value = value;
	if (codeInput.value)
		codeInput.classList.add("stale");
});