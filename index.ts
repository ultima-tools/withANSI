type TFg = 30
type TBg = 40
// COLORS
type TBlack = 0
type TRed = 1
type TGreen = 2
type TYellow = 3
type TBlue = 4
type TMagenta = 5
type TCyan = 6
type TWhite = 7

const DECORATION_REGEX = /bold|italic|underline|strikethrough/gi;
const COLOR_REGEX = /fg|gb|black|red|green|yellow|blue|magenta|cyan|white|dim/gi;

const N = {
  black: 0,
  red: 1,
  green: 2,
  yello: 3,
  blue: 4, 
  magenta: 5, 
  cyan: 6, 
  white: 7,
  bg: 40,
  fg: 30, 
  dim: 60,
}

const resolveColor = (code = "") => { 
  const [I, II, III] = code.split(':');
  return N[I] + N[II] + N[III];
};

const resoleveDecoratoin = (code) => {
  console.log(code)
};

const getRecordKey = (code) => {
  switch (true) {
    case DECORATION_REGEX.test(code):
      return "DECORATION";
    case COLOR_REGEX.test(code):
      return "COLOR";
    default:
      return "ERROR";
  }
};

const RECORD ={
  "COLOR": resolveColor,
  "DECORATION": resoleveDecoratoin,
  "ERROR": () => {}
}

export function withANSI(
  str: string,
  options: string[] = [],
): string {
  const escapeSequences = ['\x1b['];
  const result = [];

  for (const code of options) {
    const recodKey = getRecordKey(code);
    const codeResolver = RECORD[recodKey];
    const sequence = codeResolver(code);
    result.push(sequence);
    // escapeSequences.push(";");
    // console.log(sequence);
  }
  
  escapeSequences.push(result.join(';'));
  escapeSequences.push('m');

  console.dir(escapeSequences);

  const code = escapeSequences.join('');


  // const d = options.(item => item);

  try {
    return `${code}${str}\x1b[0m`
  } catch {
    return str
  }
};
