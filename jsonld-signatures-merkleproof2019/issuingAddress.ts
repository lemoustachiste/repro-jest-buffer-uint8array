import * as bitcoin from 'bitcoinjs-lib';

export function computeBitcoinAddressFromPublicKey (publicKey, chain) {
  return bitcoin.payments.p2pkh({ pubkey: publicKey, network: bitcoin.networks[chain.code] }).address;
}
