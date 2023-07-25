import isUint8Array from '../secp256k1';
import {publicKeyUInt8ArrayFromJwk} from "../keyUtils";
import deriveIssuingAddressFromPublicKey from "../jsonld-signatures-merkleproof2019/deriveIssuingAddressFromPublicKey";
import MerkleProof2019 from "../MerkleProof2019/MerkleProof2019";
import fixture from '../fixtures/testnet-v3-did.json';

it('should be a Uint8Array', function () {
  // @ts-ignore
  expect(new Buffer.from('hello') instanceof Uint8Array).toBe(true);
});

it('secp256k1 should be a Uint8Array', function () {
  // @ts-ignore
  expect(isUint8Array('test', new Buffer.from('hello'))).toBe(true);
});


it('publicKeyUInt8ArrayFromJwk should convert to the expected data', function () {
  const key = {
    "publicKeyJwk": {
      "kty": "EC",
      "crv": "secp256k1",
      "x": "6_JKJIXL7PJQT9hnr03yQNda_fUfmfrcZpymkRqsmH4",
      "y": "steT4D8LrgwmqASd1EMy6ZyyAqsl-KvNlD7rBhX3za8",
      "kid": "_0qG5QVt8vd6pbVGs5ReFJA4-yvYNEi4Ov1HZHTsobM"
    }
  };

  expect(publicKeyUInt8ArrayFromJwk(key.publicKeyJwk).toString('hex')).toBe('03ebf24a2485cbecf2504fd867af4df240d75afdf51f99fadc669ca6911aac987e');
});

it('jsonld-signatures-merkleproof2019 should derive an issuing address as expected', function () {
  const publicKey = {
    "id": "#key-1",
    "controller": "did:ion:EiA_Z6LQILbB2zj_eVrqfQ2xDm4HNqeJUw5Kj2Z7bFOOeQ",
    "type": "EcdsaSecp256k1VerificationKey2019",
    "publicKeyJwk": {
      "kty": "EC",
      "crv": "secp256k1",
      "x": "6_JKJIXL7PJQT9hnr03yQNda_fUfmfrcZpymkRqsmH4",
      "y": "steT4D8LrgwmqASd1EMy6ZyyAqsl-KvNlD7rBhX3za8",
      "kid": "_0qG5QVt8vd6pbVGs5ReFJA4-yvYNEi4Ov1HZHTsobM"
    }
  };
  const address = deriveIssuingAddressFromPublicKey(publicKey, 'bitcoin');
  expect(address).toBe('127ZSsk5cWiubyDBkocJdW9dFYLN5N1jHF');
});

it('MerkleProof2019 should verify an identity as expected', async function () {
  const MKProof = new MerkleProof2019({
    executeStep: (step) => { console.log(step); },
    document: fixture,
    proof: fixture.proof
  });
  await MKProof.init();
  const result = await MKProof.verifyIdentity();
  expect(result).toBe(true);
});
