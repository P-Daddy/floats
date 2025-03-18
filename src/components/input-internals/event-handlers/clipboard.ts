import {InputInternals} from "../input-internals";

export function copy<T extends void | Promise<void>>(
	this    : InputInternals,
	setData : (text: string) => T,
): T {
	return setData(this.getSelection());
}

export function cut(this: InputInternals, setData: (text: string) => Promise<void>): Promise<boolean>;
export function cut(this: InputInternals, setData: (text: string) => void): boolean;

export function cut(
	this    : InputInternals,
	setData : (text: string) => void | Promise<void>,
): boolean | Promise<boolean> {
	const result = setData(this.getSelection());
	const handler = () => {
		let changed = this.replaceSelection('');
		if (this.setPosition(this.position))
			changed = true;
		return changed;
	};
	if (result instanceof Promise) {
		return result.then(handler);
	}
	return handler();
}

export function paste(this: InputInternals, data: string | undefined): boolean {
	let changed = this.replaceSelection(data ?? "");
	if (this.setPosition(this.position + (data?.length ?? 0)))
		changed = true;
	return changed;
}

export function onCopy(this: InputInternals, e: ClipboardEvent): void {
	this.copy(text => e.clipboardData?.setData("text", text));
}

export function onCut(this: InputInternals, e: ClipboardEvent): void {
	if (this.cut(text => e.clipboardData?.setData("text", text)))
		this.update();
}

export function onPaste(this: InputInternals, e: ClipboardEvent): void {
	if (this.paste(e.clipboardData?.getData("text")))
		this.update();
}