import { publicKeyUInt8ArrayFromJwk } from '../keyUtils';
import { computeBitcoinAddressFromPublicKey } from './issuingAddress';

export default function deriveIssuingAddressFromPublicKey (verificationMethodPublicKey, chain) {
  const publicKey = publicKeyUInt8ArrayFromJwk(verificationMethodPublicKey.publicKeyJwk);
  try {
    const address = computeBitcoinAddressFromPublicKey(publicKey, chain);
    return address;
  } catch {
      throw new Error( 'Error deriving issuing address');
  }
}
