import {KeyEvent}       from "../../../lib/keyboard";
import {InputInternals} from "../input-internals";

export async function handleClipboardKey(this: InputInternals, e: KeyEvent): Promise<boolean> {
	let changed = false;

	switch (e.keyCombination) {
	// Copy
	case "^c":
	case "^!C":
	case "^Insert":
		try {
			await this.copy(text => navigator.clipboard.writeText(text));
			e.preventDefault();
		} catch {}
		break;

	// Cut
	case "^x":
	case "^!X":
	case "!Delete":
		try {
			changed = await this.cut(text => navigator.clipboard.writeText(text));
			e.preventDefault();
		} catch {}
		break;

	// Paste
	case "^v":
	case "^!V":
	case "!Insert":
		try {
			changed = this.paste(await navigator.clipboard.readText());
			e.preventDefault();
		} catch {}
		break;

	default:
		return false;
	}

	if (changed)
		this.update();

	return true;
}