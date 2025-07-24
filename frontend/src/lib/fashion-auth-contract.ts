import { 
  rpc, 
  Contract, 
  Keypair, 
  TransactionBuilder,
  nativeToScVal,
  scValToNative
} from '@stellar/stellar-sdk';
import { defaultConfig, ContractConfig } from './contract-config';

export interface Certificate {
  id: string;
  owner: string;
  metadataHash: string;
  isValid: boolean;
  issueDate: string;
  productType: string;
}

export class FashionAuthContract {
  private server: rpc.Server;
  private contract: Contract;
  private config: ContractConfig;

  constructor(config: ContractConfig = defaultConfig) {
    this.config = config;
    this.server = new rpc.Server(config.rpcUrl);
    this.contract = new Contract(config.contractAddress);
  }

  /**
   * Initialize the contract with an admin address
   */
  async initContract(adminKeypair: Keypair): Promise<boolean> {
    try {
      if (!this.config.contractAddress) {
        throw new Error('Contract address not configured');
      }

      const account = await this.server.getAccount(adminKeypair.publicKey());
      
      const transaction = new TransactionBuilder(account, {
        fee: '100000',
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(this.contract.call('init', nativeToScVal(adminKeypair.publicKey(), { type: 'address' })))
        .setTimeout(300)
        .build();

      transaction.sign(adminKeypair);

      const result = await this.server.sendTransaction(transaction);
      return result.status === 'SUCCESS';
    } catch (error) {
      console.error('Failed to initialize contract:', error);
      return false;
    }
  }

  /**
   * Issue a new certificate
   */
  async issueCertificate(
    adminKeypair: Keypair,
    certId: string,
    metadataHash: string,
    ownerAddress: string
  ): Promise<boolean> {
    try {
      const account = await this.server.getAccount(adminKeypair.publicKey());
      
      const transaction = new TransactionBuilder(account, {
        fee: '100000',
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(this.contract.call(
          'issue_certificate',
          nativeToScVal(certId, { type: 'string' }),
          nativeToScVal(metadataHash, { type: 'string' }),
          nativeToScVal(ownerAddress, { type: 'address' })
        ))
        .setTimeout(300)
        .build();

      transaction.sign(adminKeypair);

      const result = await this.server.sendTransaction(transaction);
      return result.status === 'SUCCESS';
    } catch (error) {
      console.error('Failed to issue certificate:', error);
      return false;
    }
  }

  /**
   * Verify a certificate
   */
  async verifyCertificate(certId: string, metadataHash: string): Promise<boolean> {
    try {
      const account = await this.server.getAccount(Keypair.random().publicKey());
      
      const transaction = new TransactionBuilder(account, {
        fee: '100000',
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(this.contract.call(
          'verify',
          nativeToScVal(certId, { type: 'string' }),
          nativeToScVal(metadataHash, { type: 'string' })
        ))
        .setTimeout(300)
        .build();

      const result = await this.server.simulateTransaction(transaction);
      
      if (result.results && result.results[0]) {
        return scValToNative(result.results[0].xdr);
      }
      
      return false;
    } catch (error) {
      console.error('Failed to verify certificate:', error);
      return false;
    }
  }

  /**
   * Get certificate details
   */
  async getCertificateDetails(certId: string): Promise<{
    owner: string;
    metadata_hash: string;
    is_valid: boolean;
  } | null> {
    try {
      const account = await this.server.getAccount(Keypair.random().publicKey());
      
      const transaction = new TransactionBuilder(account, {
        fee: '100000',
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(this.contract.call(
          'get_certificate_details',
          nativeToScVal(certId, { type: 'string' })
        ))
        .setTimeout(300)
        .build();

      const result = await this.server.simulateTransaction(transaction);
      
      if (result.results && result.results[0]) {
        return scValToNative(result.results[0].xdr);
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get certificate details:', error);
      return null;
    }
  }

  /**
   * Transfer certificate ownership
   */
  async transferCertificate(
    ownerKeypair: Keypair,
    certId: string,
    newOwnerAddress: string
  ): Promise<boolean> {
    try {
      const account = await this.server.getAccount(ownerKeypair.publicKey());
      
      const transaction = new TransactionBuilder(account, {
        fee: '100000',
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(this.contract.call(
          'transfer',
          nativeToScVal(certId, { type: 'string' }),
          nativeToScVal(newOwnerAddress, { type: 'address' })
        ))
        .setTimeout(300)
        .build();

      transaction.sign(ownerKeypair);

      const result = await this.server.sendTransaction(transaction);
      return result.status === 'SUCCESS';
    } catch (error) {
      console.error('Failed to transfer certificate:', error);
      return false;
    }
  }

  /**
   * Revoke a certificate
   */
  async revokeCertificate(adminKeypair: Keypair, certId: string): Promise<boolean> {
    try {
      const account = await this.server.getAccount(adminKeypair.publicKey());
      
      const transaction = new TransactionBuilder(account, {
        fee: '100000',
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(this.contract.call(
          'revoke',
          nativeToScVal(certId, { type: 'string' })
        ))
        .setTimeout(300)
        .build();

      transaction.sign(adminKeypair);

      const result = await this.server.sendTransaction(transaction);
      return result.status === 'SUCCESS';
    } catch (error) {
      console.error('Failed to revoke certificate:', error);
      return false;
    }
  }

  /**
   * Check if certificate exists
   */
  async certificateExists(certId: string): Promise<boolean> {
    try {
      const account = await this.server.getAccount(Keypair.random().publicKey());
      
      const transaction = new TransactionBuilder(account, {
        fee: '100000',
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(this.contract.call(
          'certificate_exists',
          nativeToScVal(certId, { type: 'string' })
        ))
        .setTimeout(300)
        .build();

      const result = await this.server.simulateTransaction(transaction);
      
      if (result.results && result.results[0]) {
        return scValToNative(result.results[0].xdr);
      }
      
      return false;
    } catch (error) {
      console.error('Failed to check certificate existence:', error);
      return false;
    }
  }

  /**
   * Get admin address
   */
  async getAdmin(): Promise<string | null> {
    try {
      const account = await this.server.getAccount(Keypair.random().publicKey());
      
      const transaction = new TransactionBuilder(account, {
        fee: '100000',
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(this.contract.call('get_admin'))
        .setTimeout(300)
        .build();

      const result = await this.server.simulateTransaction(transaction);
      
      if (result.results && result.results[0]) {
        const adminAddress = scValToNative(result.results[0].xdr);
        return adminAddress.toString();
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get admin address:', error);
      return null;
    }
  }
}