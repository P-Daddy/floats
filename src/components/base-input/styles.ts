import {css} from "../../lib/css";

export const styles = new CSSStyleSheet();

styles.replaceSync(css`
	:host(:focus) .caret {
		animation: block-caret 1s step-end infinite;
	}

	:host(:focus.typing) .caret {
		animation  : none;
		background : var(--fg);
		color      : var(--bg);
	}

	:host(:focus) .selection {
		--bg       : #3367d1;
		--fg       : white;
		background : var(--bg);
		color      : var(--fg);
	}

	:host {
		display : flex;
		outline : none;

		& > * {
			border  : 1px solid #808080;
			margin  : 0 -1px 0 0;
			padding : 0.1em;

			font-family: inherit;
		}
	}

	@keyframes block-caret {
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