/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Example "wait" block that will pause the interpreter for a
 * number of seconds. Because wait is a blocking behaviour, such blocks will
 * only work in interpreted environments.
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */

Blockly.defineBlocksWithJsonArray([{
  "type": "wait_seconds",
  "message0": " wait %1 seconds",
  "args0": [{
    "type": "field_number",
    "name": "SECONDS",
    "min": 0,
    "max": 600,
    "value": 1,
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_LOOPS_HUE}",
}]);

/**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */
Blockly.JavaScript['wait_seconds'] = function(block) {
  const seconds = Number(block.getFieldValue('SECONDS'));
  const code = 'waitForSeconds(' + seconds + ');\n';
  return code;
};

/**
 * Register the interpreter asynchronous function
 * <code>waitForSeconds()</code>.
 */
function initInterpreterWaitForSeconds(interpreter, globalObject) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('waitForSeconds');

  const wrapper = interpreter.createAsyncFunction(
    function(timeInSeconds, callback) {
      // Delay the call to the callback.
      setTimeout(callback, timeInSeconds * 1000);
      Manual.upArrowEvent();
    });
  interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);
}

function initInterpreterMove(interpreter, globalObject) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('upArrowEvent');

  const wrapper2 = interpreter.createNativeFunction(
    function(callback) {
      // Delay the call to the callback.      
      Manual.upArrowEvent();
      callback;
    });
  interpreter.setProperty(globalObject, 'upArrowEvent', wrapper2);
}

function initInterpreterStop(interpreter, globalObject) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('stop');

  const wrapper3 = interpreter.createNativeFunction(
    function(callback) {
      // Delay the call to the callback.
      Manual.stop();
      callback;
    });
  interpreter.setProperty(globalObject, 'stop', wrapper3);
}
