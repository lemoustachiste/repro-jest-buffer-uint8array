# Jest Buffer uint8Array bug

This repro highlights an issue with jest and uint8Array.
Similar to the issue described here: https://github.com/jestjs/jest/issues/4422, tests fail on an error:

```
Expected test to be an Uint8Array
```

Thrown by the [secp256k1](https://github.com/cryptocoinjs/secp256k1-node/blob/master/lib/index.js#L22) package.

The puzzling part is that the error occurs as soon as there are more than one test file running and consuming the above 
script.

# Steps to reproduce

1. clone the repo
2. npm install
3. npm test

The 5 tests in a file highlight different level of consumption as I was trying to isolate the issue replicating the
structure of the project where it's occurring. It's only after duplicating the test file (buffer2.test.js) that the 
issue appeared.

Typescript and ts-jest seem to have no effect whatsoever, but I'm leaving them in as they are part of my setup.

jest.config.js does hold the "global" object as presented as a solution in the above issue, and if it's removed tests fail.

# Expected behavior

Tests should pass

# Actual behavior

Tests don't pass
