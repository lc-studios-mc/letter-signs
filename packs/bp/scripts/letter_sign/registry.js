export const SIGN_BLOCK_TYPE = Object.freeze({
	NUMBER: "lettersigns:letter_sign_number",
	ALPHABET_1: "lettersigns:letter_sign_alphabet_1",
	ALPHABET_2: "lettersigns:letter_sign_alphabet_2",
	SYMBOL_1: "lettersigns:letter_sign_symbol_1",
	SYMBOL_2: "lettersigns:letter_sign_symbol_2",
});

/**
 * @typedef {Object} SignDefinition
 * @property {SIGN_BLOCK_TYPE[keyof SIGN_BLOCK_TYPE]} type
 * @property {string | number} value
 */

/**
 * @param {SignDefinition["type"]} type
 * @param {SignDefinition["value"]} value
 * @returns {SignDefinition}
 */
const define = (type, value) => ({ type, value });

/** Sign definition objects by character */
export const signRegistry = /** @type {Record<string, SignDefinition>} */ ({
	// Numbers
	0: define(SIGN_BLOCK_TYPE.NUMBER, 0),
	1: define(SIGN_BLOCK_TYPE.NUMBER, 1),
	2: define(SIGN_BLOCK_TYPE.NUMBER, 2),
	3: define(SIGN_BLOCK_TYPE.NUMBER, 3),
	4: define(SIGN_BLOCK_TYPE.NUMBER, 4),
	5: define(SIGN_BLOCK_TYPE.NUMBER, 5),
	6: define(SIGN_BLOCK_TYPE.NUMBER, 6),
	7: define(SIGN_BLOCK_TYPE.NUMBER, 7),
	8: define(SIGN_BLOCK_TYPE.NUMBER, 8),
	9: define(SIGN_BLOCK_TYPE.NUMBER, 9),

	// Alphabets 1 (a-p)
	a: define(SIGN_BLOCK_TYPE.ALPHABET_1, "a"),
	b: define(SIGN_BLOCK_TYPE.ALPHABET_1, "b"),
	c: define(SIGN_BLOCK_TYPE.ALPHABET_1, "c"),
	d: define(SIGN_BLOCK_TYPE.ALPHABET_1, "d"),
	e: define(SIGN_BLOCK_TYPE.ALPHABET_1, "e"),
	f: define(SIGN_BLOCK_TYPE.ALPHABET_1, "f"),
	g: define(SIGN_BLOCK_TYPE.ALPHABET_1, "g"),
	h: define(SIGN_BLOCK_TYPE.ALPHABET_1, "h"),
	i: define(SIGN_BLOCK_TYPE.ALPHABET_1, "i"),
	j: define(SIGN_BLOCK_TYPE.ALPHABET_1, "j"),
	k: define(SIGN_BLOCK_TYPE.ALPHABET_1, "k"),
	l: define(SIGN_BLOCK_TYPE.ALPHABET_1, "l"),
	m: define(SIGN_BLOCK_TYPE.ALPHABET_1, "m"),
	n: define(SIGN_BLOCK_TYPE.ALPHABET_1, "n"),
	o: define(SIGN_BLOCK_TYPE.ALPHABET_1, "o"),
	p: define(SIGN_BLOCK_TYPE.ALPHABET_1, "p"),

	// Alphabets 2 (q-z)
	q: define(SIGN_BLOCK_TYPE.ALPHABET_2, "q"),
	r: define(SIGN_BLOCK_TYPE.ALPHABET_2, "r"),
	s: define(SIGN_BLOCK_TYPE.ALPHABET_2, "s"),
	t: define(SIGN_BLOCK_TYPE.ALPHABET_2, "t"),
	u: define(SIGN_BLOCK_TYPE.ALPHABET_2, "u"),
	v: define(SIGN_BLOCK_TYPE.ALPHABET_2, "v"),
	w: define(SIGN_BLOCK_TYPE.ALPHABET_2, "w"),
	x: define(SIGN_BLOCK_TYPE.ALPHABET_2, "x"),
	y: define(SIGN_BLOCK_TYPE.ALPHABET_2, "y"),
	z: define(SIGN_BLOCK_TYPE.ALPHABET_2, "z"),

	// Symbols 1
	"!": define(SIGN_BLOCK_TYPE.SYMBOL_1, "excl"),
	'"': define(SIGN_BLOCK_TYPE.SYMBOL_1, "dqt"),
	"#": define(SIGN_BLOCK_TYPE.SYMBOL_1, "hash"),
	$: define(SIGN_BLOCK_TYPE.SYMBOL_1, "doll"),
	"%": define(SIGN_BLOCK_TYPE.SYMBOL_1, "perc"),
	"&": define(SIGN_BLOCK_TYPE.SYMBOL_1, "amp"),
	"'": define(SIGN_BLOCK_TYPE.SYMBOL_1, "sqt"),
	"(": define(SIGN_BLOCK_TYPE.SYMBOL_1, "lprn"),
	")": define(SIGN_BLOCK_TYPE.SYMBOL_1, "rprn"),
	"*": define(SIGN_BLOCK_TYPE.SYMBOL_1, "ast"),
	"+": define(SIGN_BLOCK_TYPE.SYMBOL_1, "plus"),
	",": define(SIGN_BLOCK_TYPE.SYMBOL_1, "cmma"),
	"-": define(SIGN_BLOCK_TYPE.SYMBOL_1, "hyph"),
	".": define(SIGN_BLOCK_TYPE.SYMBOL_1, "dot"),
	"/": define(SIGN_BLOCK_TYPE.SYMBOL_1, "slsh"),
	":": define(SIGN_BLOCK_TYPE.SYMBOL_1, "coln"),

	// Symbols 2
	";": define(SIGN_BLOCK_TYPE.SYMBOL_2, "scol"),
	"<": define(SIGN_BLOCK_TYPE.SYMBOL_2, "less"),
	"=": define(SIGN_BLOCK_TYPE.SYMBOL_2, "equl"),
	">": define(SIGN_BLOCK_TYPE.SYMBOL_2, "gtr"),
	"?": define(SIGN_BLOCK_TYPE.SYMBOL_2, "ques"),
	"@": define(SIGN_BLOCK_TYPE.SYMBOL_2, "at"),
	"[": define(SIGN_BLOCK_TYPE.SYMBOL_2, "lbkt"),
	"\\": define(SIGN_BLOCK_TYPE.SYMBOL_2, "bsls"),
	"]": define(SIGN_BLOCK_TYPE.SYMBOL_2, "rbkt"),
	"^": define(SIGN_BLOCK_TYPE.SYMBOL_2, "cart"),
	_: define(SIGN_BLOCK_TYPE.SYMBOL_2, "undr"),
	"`": define(SIGN_BLOCK_TYPE.SYMBOL_2, "grav"),
	"{": define(SIGN_BLOCK_TYPE.SYMBOL_2, "lbrc"),
	"|": define(SIGN_BLOCK_TYPE.SYMBOL_2, "pipe"),
	"}": define(SIGN_BLOCK_TYPE.SYMBOL_2, "rbrc"),
	"~": define(SIGN_BLOCK_TYPE.SYMBOL_2, "tilde"),
});
