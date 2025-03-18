import {BitsInput}   from "./bits-input";
import {BytesInput}  from "./bytes-input";
import {OldHexInput} from "./old-hex-input";

export function registerComponents() {
	customElements.define("old-hex-input", OldHexInput);
	customElements.define("bytes-input",   BytesInput);
	customElements.define("bits-input",    BitsInput)
}