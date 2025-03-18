import {KeyEvent}       from "../../../lib/keyboard";
import {InputInternals} from "../input-internals";

export function handleInvalidKey(this: InputInternals, e: KeyEvent): boolean {
	switch (e.keyCombination) {
	case "^!Home":
	case "^!PageUp":
	case "^!End":
	case "^!PageDown":
		e.preventDefault();
		break;

	default:
		return false;
	}

	return true;
}
