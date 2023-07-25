import keyto from '@trust/keyto';
import secp256k1 from 'secp256k1';
import { Buffer as BufferPolyfill } from 'buffer';

const buffer = typeof Buffer === 'undefined' ? BufferPolyfill : Buffer;

export const publicKeyHexFromJwk = (jwk) => {
  const uncompressedPublicKey = keyto
    .from(
      {
        ...jwk,
        crv: 'K-256'
      },
      'jwk'
    )
    .toString('blk', 'public');

  const compressed = secp256k1.publicKeyConvert(
    buffer.from(uncompressedPublicKey, 'hex'),
    true
  );
  return buffer.from(compressed).toString('hex');
};

export const publicKeyUInt8ArrayFromJwk = (jwk) => {
  const publicKeyHex = publicKeyHexFromJwk(jwk);
  let asBuffer = buffer.from(publicKeyHex, 'hex');
  let padding = 32 - asBuffer.length;
  while (padding > 0) {
    asBuffer = buffer.concat([buffer.from('00', 'hex'), asBuffer]);
    padding--;
  }
  return asBuffer;
};

