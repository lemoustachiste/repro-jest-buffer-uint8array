# Jest Buffer Uint8Array bug

This repro highlights an issue with jest and Uint8Array and jsdom.
Similar to the issue described here: https://github.com/jestjs/jest/issues/4422, my tests fail on an error:

```
Expected test to be an Uint8Array
```

Thrown by the [secp256k1](https://github.com/cryptocoinjs/secp256k1-node/blob/master/lib/index.js#L22) package.

The puzzling part is that the error occurs as soon as there are more than one test file running and consuming the above 
script.

# Steps to reproduce

1. clone the repo
2. `npm install`
3. `npm test` # this shows the tests failing
4. (`npm run test:only-one`) # this runs only one test to show that it works with only one file
5. (`npm run node:compare`) # this runs a node script to show that a Buffer should be an `instanceof` `Uint8Array`

jest.config.js does hold the `globals` object as presented as a solution in the above issue, and if it's removed tests fail.

**Removing the `jsdom` `testEnvironment` option from jest.config.js removes the issue.**

**Not using ts-jest as a transformer turns off the error, maybe? Inconsistent results with jest cache**

# Expected behavior

a `Buffer` should be an instance of `Uint8Array` when running multiple tests

# Actual behavior

a `Buffer` is not an instance of `Uint8Array` when running multiple tests
