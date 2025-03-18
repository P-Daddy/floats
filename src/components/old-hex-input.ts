import {css}                from "../lib/css";
import {html}               from "../lib/html";
import {KeyEvent, keyEvent} from "../lib/keyboard";

const styles = new CSSStyleSheet();
styles.replaceSync(css`
	pre {
		font-family:
			"Fira Code",
			"DejaVu Sans Mono",
			"Bitstream Vera Sans Mono",
			"Liberation Mono",
			"Inconsolata",
			monospace;

		margin: 0.125em;

		caret-color: transparent;

		&:active, &:focus {
			outline: none;
		}

		&:focus > span.caret {
			animation: blink 1s step-end infinite;
		}

		&.typing:focus > span.caret {
			background : var(--fg);
			color      : var(--bg);
		}
	}

	@keyframes blink {
		from, to {
			background : var(--fg);
			color      : var(--bg);
		}
		50% {
			background : var(--bg);
			color      : var(--fg);
		}
	}
`);

export class OldHexInput extends HTMLElement {
	#value    = 0;
	#position = 0;

	#pre! : HTMLPreElement;

	constructor() {
		super();
	}

	#onKeyDown(e: KeyEvent): void {
		let changed = false;

		switch (e.keyCombination) {
		case "^Home":
		case "!Home":
		case "Home":
		case "^PageUp":
		case "!PageUp":
		case "PageUp":
		case "^ArrowLeft":
		case "!ArrowLeft":
		case "ArrowLeft":
			if (this.#position) {
				this.#position = 0;
				changed = true;
			}
			e.preventDefault();
			break;
		case "^End":
		case "!End":
		case "End":
		case "^PageDown":
		case "!PageDown":
		case "PageDown":
		case "^ArrowRight":
		case "!ArrowRight":
		case "ArrowRight":
			if (!this.#position) {
				this.#position = 1;
				changed = true;
			}
			e.preventDefault();
			break;
		case "^Delete":
		case "!Delete":
		case "Delete":
			e.preventDefault();
			break;
		}

		if (changed)
			this.#update();
	}

	#onPaste(e: ClipboardEvent): void {
		const pastedText = e.clipboardData?.getData("text").trim();
		e.preventDefault();

		const text = pastedText?.slice(0, 2 - this.#position);
		if (text && /^[0-9A-Fa-f]+$/.test(text)) {
			const currentText = this.#value.toString(16).padStart(2, '0');
			this.#value = parseInt(
				currentText.slice(0, this.#position) +
					text +
					currentText.slice(this.#position + text.length),
				16
			);
			this.#position = 1;
			this.#update();
		}
	}

	#update(): void {
		this.#pre.classList.add("typing");
		setTimeout(() => this.#pre.classList.remove("typing"));
		const text = this.#value.toString(16).padStart(2, '0');
		this.#pre.innerHTML =
			text.slice(0, this.#position) +
			html`<span class="caret">${text[this.#position] ?? "&nbsp;"}</span>` +
			text.slice(this.#position + 1);
	}

	connectedCallback(): void {
		const shadow = this.attachShadow({mode: "open"});

		shadow.adoptedStyleSheets = [styles];

		this.#pre = document.createElement("pre");
		this.#pre.contentEditable = "true";
		this.#pre.tabIndex        = 0;
		this.#pre.innerHTML       = html`<span class="caret">0</span>0`;

		this.#pre.addEventListener("keydown", e => this.#onKeyDown(keyEvent(e)));
		this.#pre.addEventListener("paste", this.#onPaste.bind(this));

		shadow.append(this.#pre);
		const {color, backgroundColor} = getComputedStyle(this);
		this.#pre.style.setProperty("--fg", color);
		this.#pre.style.setProperty("--bg", backgroundColor);
	}
}