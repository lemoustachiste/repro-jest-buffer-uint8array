it('should be a Uint8Array', function () {
  expect(new Buffer.from('hello') instanceof Uint8Array).toBe(true);
});
