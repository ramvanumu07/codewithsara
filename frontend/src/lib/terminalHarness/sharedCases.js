/**
 * Shared terminal test matrix — used by Jest and CLI (run-terminal-harness.mjs).
 * Each case: { id, code, mode, functionName?, testCases?, expectSuccess, expectOutput?, expectErrorContains?, expectAllPassed? }
 */

/** Playground = script, no test cases (SessionPlayground Run) */
export const PLAYGROUND_TERMINAL_CASES = [
  { id: 'empty', code: '', expectSuccess: true, expectOutput: '' },
  { id: 'whitespace', code: '   \n\t  ', expectSuccess: true, expectOutput: '' },
  { id: 'console_single', code: "console.log('hello');", expectSuccess: true, expectOutput: 'hello' },
  { id: 'console_multi_line', code: "console.log(1);\nconsole.log(2);", expectSuccess: true, expectOutput: '1\n2' },
  { id: 'console_multi_args', code: 'console.log(1, 2, 3);', expectSuccess: true, expectOutput: '1 2 3' },
  { id: 'function_decl_no_call', code: 'function f() { return 1; }', expectSuccess: true, expectOutput: '' },
  { id: 'arrow_no_call', code: 'const f = () => 42;', expectSuccess: true, expectOutput: '' },
  { id: 'closure_factory_no_call', code: 'function createGreeting(g) { return function(n) { return g + n; }; }', expectSuccess: true, expectOutput: '' },
  { id: 'const_only', code: 'const x = 10;', expectSuccess: true, expectOutput: '' },
  { id: 'let_only', code: 'let x = 5;', expectSuccess: true, expectOutput: '' },
  { id: 'syntax_error', code: 'const x = ;', expectSuccess: false, expectErrorContains: 'Unexpected token' },
  { id: 'ref_error', code: 'console.log(undefinedVar);', expectSuccess: false, expectErrorContains: 'not defined' },
  { id: 'throw', code: "throw new Error('boom');", expectSuccess: false, expectErrorContains: 'boom' },
  { id: 'eval_blocked', code: 'eval("1");', expectSuccess: false, expectErrorContains: 'Blocked' },
  { id: 'fetch_blocked', code: 'fetch("/");', expectSuccess: false, expectErrorContains: 'Blocked' },
  { id: 'string_Function_ok', code: 'const s = "Function"; console.log(s[0]);', expectSuccess: true, expectOutput: 'F' },
  { id: 'math', code: 'console.log(Math.sqrt(16));', expectSuccess: true, expectOutput: '4' },
  { id: 'json_stringify', code: 'console.log(JSON.stringify({a:1}));', expectSuccess: true, expectOutput: '{"a":1}' },
  { id: 'info_capture', code: "console.info('i');", expectSuccess: true, expectOutputContains: '[INFO]' },
  { id: 'warn_capture', code: "console.warn('w');", expectSuccess: true, expectOutputContains: '[WARN]' },
  { id: 'error_capture', code: "console.error('e');", expectSuccess: true, expectOutputContains: '[ERROR]' },
  { id: 'for_small', code: 'for(let i=0;i<3;i++){ console.log(i); }', expectSuccess: true, expectOutput: '0\n1\n2' },
  { id: 'while_small', code: 'let n=0;while(n<2){console.log(n);n++;}', expectSuccess: true, expectOutput: '0\n1' },
  { id: 'expression_only', code: '2 + 3', expectSuccess: true, expectOutput: '5' },
  { id: 'expression_string', code: '"ab"', expectSuccess: true, expectOutput: 'ab' },
  { id: 'no_expr_fallback_with_semicolon', code: '1;', expectSuccess: true, expectOutput: '' },
  { id: 'template_console', code: 'console.log(`x${1+1}`);', expectSuccess: true, expectOutput: 'x2' },
  { id: 'unicode_log', code: "console.log('\\u2603');", expectSuccess: true, expectOutput: '☃' },
  { id: 'null_undefined_log', code: 'console.log(null, undefined);', expectSuccess: true, expectOutput: 'null undefined' },
  { id: 'object_log', code: 'console.log({x:1});', expectSuccess: true, expectOutput: '[object Object]' },
  { id: 'array_log', code: 'console.log([1,2]);', expectSuccess: true, expectOutputContains: '1' },
  { id: 'nested_function_log', code: 'function outer(){ function inner(){ console.log("in"); } inner(); } outer();', expectSuccess: true, expectOutput: 'in' },
  { id: 'iife', code: '(function(){ console.log("iife"); })();', expectSuccess: true, expectOutput: 'iife' },
  { id: 'async_keyword_only', code: 'async function x(){}', expectSuccess: true, expectOutput: '' },
  { id: 'class_decl', code: 'class C {}', expectSuccess: true, expectOutput: '' },
  { id: 'regex', code: 'console.log(/a/.test("a"));', expectSuccess: true, expectOutput: 'true' },
  { id: 'destructuring', code: 'const [a,b]=[1,2]; console.log(a+b);', expectSuccess: true, expectOutput: '3' },
  { id: 'spread', code: 'console.log(...[1,2]);', expectSuccess: true, expectOutput: '1 2' },
  { id: 'try_catch_no_throw', code: 'try { console.log("ok"); } catch(e) {}', expectSuccess: true, expectOutput: 'ok' },
  { id: 'typeerror_runtime', code: 'null.foo;', expectSuccess: false, expectErrorContains: 'null' },
  { id: 'division_by_zero', code: 'console.log(1/0);', expectSuccess: true, expectOutput: 'Infinity' },
  { id: 'nan_log', code: 'console.log(NaN);', expectSuccess: true, expectOutput: 'NaN' },
  { id: 'big_int_log', code: 'console.log(BigInt(1));', expectSuccess: true, expectOutput: '1' },
  { id: 'symbol_blocked_or_logs', code: 'console.log(String(Symbol("s")));', expectSuccess: true, expectOutputContains: 'Symbol' },
  { id: 'optional_chaining', code: 'console.log({a:null}?.a?.b);', expectSuccess: true, expectOutput: 'undefined' },
  { id: 'nullish', code: 'console.log(null ?? "x");', expectSuccess: true, expectOutput: 'x' },
  { id: 'comment_only', code: '// nothing', expectSuccess: true, expectOutput: '' },
  { id: 'block_comment', code: '/* x */ console.log(1);', expectSuccess: true, expectOutput: '1' }
]

/** Assignment Run = script + []; assignment Test = script or function + cases */
export const ASSIGNMENT_TERMINAL_CASES = [
  {
    id: 'run_script_like_playground',
    mode: 'run',
    code: 'function greet(){return "Hi";}\nconsole.log("x");',
    expectSuccess: true,
    expectOutput: 'x'
  },
  {
    id: 'run_function_no_call_no_output',
    mode: 'run',
    code: 'function add(a,b){return a+b;}',
    expectSuccess: true,
    expectOutput: ''
  },
  {
    id: 'run_closure_no_output',
    mode: 'run',
    code: 'function create(x){ return function(y){ return x+y; }; }',
    expectSuccess: true,
    expectOutput: ''
  },
  {
    id: 'script_task_with_injected_input',
    mode: 'script_test',
    code: '// desc\nconst a = 1;\nconsole.log(a);',
    testCases: [{ input: { a: 99 }, expectedOutput: '99' }],
    expectAllPassed: true
  },
  {
    id: 'script_task_wrong_output',
    mode: 'script_test',
    code: 'const x = 1;\nconsole.log(x);',
    testCases: [{ input: { x: 5 }, expectedOutput: '99' }],
    expectSomeFail: true
  },
  {
    id: 'function_task_double',
    mode: 'function_test',
    code: 'function double(n){ return n*2; }',
    functionName: 'double',
    testCases: [
      { input: { n: 3 }, expectedOutput: '6' },
      { input: { n: 0 }, expectedOutput: '0' }
    ],
    expectAllPassed: true
  },
  {
    id: 'function_thenCallArgs',
    mode: 'function_test',
    code: 'function make(m){ return function(n){ return m+n; }; }',
    functionName: 'make',
    testCases: [
      { input: { m: 'Hi,' }, thenCallArgs: [' you'], expectedOutput: 'Hi, you' }
    ],
    expectAllPassed: true
  },
  {
    id: 'function_missing',
    mode: 'function_test',
    code: 'function other(){}',
    functionName: 'requiredName',
    testCases: [{ input: {}, expectedOutput: 'x' }],
    expectSuccess: false
  },
  {
    id: 'run_blocked_eval',
    mode: 'run',
    code: 'eval("1")',
    expectSuccess: false,
    expectErrorContains: 'Blocked'
  },
  {
    id: 'script_strip_const_redeclare',
    mode: 'script_test',
    code: 'const k = 0;\nconsole.log(k);',
    testCases: [{ input: { k: 7 }, expectedOutput: '7' }],
    expectAllPassed: true
  },
  {
    id: 'leading_comments_function',
    mode: 'function_test',
    code: '// line1\n// line2\nfunction id(x){ return x; }',
    functionName: 'id',
    testCases: [{ input: { x: 42 }, expectedOutput: '42' }],
    expectAllPassed: true
  },
  {
    id: 'empty_run',
    mode: 'run',
    code: '',
    expectSuccess: true,
    expectOutput: ''
  },
  {
    id: 'multi_test_script',
    mode: 'script_test',
    code: 'console.log(a+b);',
    testCases: [
      { input: { a: 1, b: 2 }, expectedOutput: '3' },
      { input: { a: 10, b: 20 }, expectedOutput: '30' }
    ],
    expectAllPassed: true
  },
  {
    id: 'function_returns_zero_string',
    mode: 'function_test',
    code: 'function z(){ return 0; }',
    functionName: 'z',
    testCases: [{ input: {}, expectedOutput: '0' }],
    expectAllPassed: true
  },
  {
    id: 'function_boolean',
    mode: 'function_test',
    code: 'function isEven(n){ return n % 2 === 0; }',
    functionName: 'isEven',
    testCases: [{ input: { n: 4 }, expectedOutput: 'true' }],
    expectAllPassed: true
  },
  {
    id: 'syntax_fail_script_test',
    mode: 'script_test',
    code: 'const x = ;',
    testCases: [{ input: {}, expectedOutput: '1' }],
    expectAllPassed: false,
    expectSomeFail: true
  }
]
