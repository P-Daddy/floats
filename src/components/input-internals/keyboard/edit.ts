import {KeyEvent}       from "../../../lib/keyboard";
import {InputInternals} from "../input-internals";

export function handleEditKey(this: InputInternals, e: KeyEvent): boolean {
	let changed = false;

	switch (e.keyCombination) {
	// Delete character right
	case "^Delete":
	case "Delete":
		changed = this.replaceSelection('');
		if (this.setPosition(this.position + 1))
			changed = true;
		e.preventDefault();
		break;

	// Delete character left
	case "^Backspace":
	case "Backspace":
		changed = this.setPosition(this.position - 1);
		if (this.replaceSelection(''))
			changed = true;
		e.preventDefault();
		break;

	default:
		return false;
	}

	if (changed)
		this.update();

	return true;
}