import { LDMerkleProof2019 } from 'jsonld-signatures-merkleproof2019';
export default class MerkleProof2019 {
  constructor (props) {
    this.executeStep = props.executeStep;
    this.documentToVerify = props.document;
    this.proof = props.proof;
  }

  async init () {
    await this.setVerificationSuite();
  }

  async verifyIdentity () {
    try {
      await this.suite.verifyIdentity();
      return true;
    } catch {
      return false;
    }
  }

  async executeStep (step, action, verificationSuite) {
    throw new Error('executeStep method needs to be overwritten by injecting from Verifier');
  }

  async setVerificationSuite () {
    this.verificationMethodPublicKey = {
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
    this.suite = new LDMerkleProof2019({
      document: this.documentToVerify,
      proof: this.proof,
      verificationMethod: this.verificationMethodPublicKey,
      options: {
        executeStepMethod: this.executeStep
      }
    });
  }
}
