import { withANSI } from "./index.ts";

console.log(withANSI(' Hello with ANSI ', ['dim:dim']));

// console.log('\033]Pg4040ff\033\\');