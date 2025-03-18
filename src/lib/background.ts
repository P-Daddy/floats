type RGB  = [r: number, g: number, b: number];
type RGBA = [r: number, g: number, b: number, a: number];

function parseRGB(color: string): RGB {
	const m = /rgb\((.+),\s*(.+),\s*(.+)\)/.exec(color);
	if (!m)
		throw new Error(`Invalid RGB color: ${JSON.stringify(color)}`);

	return [+m[1], +m[2], +m[3]];
}

function parseRGBA(color: string): RGBA {
	const m = /rgba\((.+),\s*(.+),\s*(.+),\s*(.+)\)/.exec(color);
	if (!m)
		throw new Error(`Invalid RGBA color: ${JSON.stringify(color)}`);

	return [+m[1], +m[2], +m[3], +m[4]];
}

const blendChannel = (foreground: number, background: number, alpha: number): number =>
	Math.min(Math.round(foreground * alpha + background * (1 - alpha)), 255);

function blend(foreground: RGBA, background: RGB): RGB {
	const alpha = foreground[3];
	if (!alpha)
		return background;

	const [r, g, b] = background;
	return [
		blendChannel(foreground[0], r, alpha),
		blendChannel(foreground[1], g, alpha),
		blendChannel(foreground[2], b, alpha),
	];
}

function getParent(element: Element): Element | null {
	if (element === document.documentElement)
		return null;

	const {parentElement} = element;
	if (parentElement)
		return parentElement;

	const root = element.getRootNode();
	if (root instanceof ShadowRoot)
		return root.host;

	return document.body;
}

export function getBackgroundColor(element: Element): string {
	const {backgroundColor} = getComputedStyle(element);
	if(!backgroundColor.startsWith("rgba"))
		return backgroundColor;

	const parentElement = getParent(element);
	if (!parentElement) {
		console.log("no parent of", element);
		return "rgb(255, 255, 255)";
	}

	const parentBackground = getBackgroundColor(parentElement);
	const [r, g, b] = blend(parseRGBA(backgroundColor), parseRGB(parentBackground));

	return `rgb(${r}, ${g}, ${b})`;
}