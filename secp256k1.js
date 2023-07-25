function assert (cond, msg) {
  if (!cond) throw new Error(msg)
}

module.exports = function isUint8Array (name, value, length) {
  console.log('is Buffer an Uint8Array?', new Buffer.from('hello') instanceof Uint8Array);
  assert(value instanceof Uint8Array, `Expected ${name} to be an Uint8Array`)

  if (length !== undefined) {
    if (Array.isArray(length)) {
      const numbers = length.join(', ')
      const msg = `Expected ${name} to be an Uint8Array with length [${numbers}]`
      assert(length.includes(value.length), msg)
    } else {
      const msg = `Expected ${name} to be an Uint8Array with length ${length}`
      assert(value.length === length, msg)
    }
  }

  return true;
}
