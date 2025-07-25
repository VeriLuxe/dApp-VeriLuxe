"use client";

import { useState, useEffect, useCallback } from "react";
import { Keypair } from '@stellar/stellar-sdk';
import { FashionAuthContract } from '@/lib/fashion-auth-contract';
import { defaultConfig } from '@/lib/contract-config';
import { useWalletStore } from '@/stores/walletStore';

interface Certificate {
  id: string;
  owner: string;
  metadataHash: string;
  isValid: boolean;
  issueDate: string;
  productType: string;
}

export function useFashionAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAddress, setAdminAddress] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [contract, setContract] = useState<FashionAuthContract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get wallet info from zustand store
  const { address: publicKey, loggedIn: isConnected } = useWalletStore();

  // Initialize contract on mount
  useEffect(() => {
    try {
      const contractInstance = new FashionAuthContract(defaultConfig);
      setContract(contractInstance);
      
      // Check if user is admin when wallet is connected
      if (isConnected && publicKey) {
        checkAdminStatus(contractInstance, publicKey);
      }
    } catch (err) {
      setError('Failed to initialize contract connection');
      console.error('Contract initialization error:', err);
    }
  }, [isConnected, publicKey]);

  const checkAdminStatus = async (contractInstance: FashionAuthContract, userPublicKey: string) => {
    try {
      const adminAddr = await contractInstance.getAdmin();
      if (adminAddr && adminAddr === userPublicKey) {
        setIsAdmin(true);
        setAdminAddress(adminAddr);
      } else {
        setIsAdmin(false);
        setAdminAddress(adminAddr || '');
      }
    } catch (error) {
      console.log('Contract not initialized or admin check failed:', error);
      setIsAdmin(false);
    }
  };

  const handleInitContract = async (adminAddr: string) => {
    if (!contract || !publicKey || !isConnected) {
      setError('Wallet not connected');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create a keypair from the connected wallet's public key for contract interaction
      // Note: This is a simplified approach. In production, you'd use the wallet's signing capability
      const keypair = Keypair.fromPublicKey(publicKey);
      
      const success = await contract.initContract(keypair);
      if (success) {
        setAdminAddress(adminAddr);
        setIsAdmin(true);
        console.log("Contract initialized with admin:", adminAddr);
      } else {
        setError('Failed to initialize contract');
      }
    } catch (err) {
      setError('Error initializing contract');
      console.error('Init contract error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIssueCertificate = async (
    certId: string,
    metadataHash: string,
    owner: string,
    productType: string
  ) => {
    if (!contract || !publicKey || !isConnected || !isAdmin) {
      setError('Admin wallet connection required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const keypair = Keypair.fromPublicKey(publicKey);
      
      const success = await contract.issueCertificate(
        keypair,
        certId,
        metadataHash,
        owner
      );

      if (success) {
        const newCert: Certificate = {
          id: certId,
          owner,
          metadataHash,
          isValid: true,
          issueDate: new Date().toISOString().split("T")[0],
          productType,
        };
        setCertificates((prev) => [...prev, newCert]);
        console.log("Certificate issued:", newCert);
      } else {
        setError('Failed to issue certificate');
      }
    } catch (err) {
      setError('Error issuing certificate');
      console.error('Issue certificate error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCertificate = async (certId: string, metadataHash: string) => {
    if (!contract) {
      setError('Contract not initialized');
      return { valid: false, certificate: null };
    }

    setIsLoading(true);
    setError(null);

    try {
      const isValid = await contract.verifyCertificate(certId, metadataHash);
      
      if (isValid) {
        // Get certificate details if valid
        const details = await contract.getCertificateDetails(certId);
        if (details) {
          const certificate: Certificate = {
            id: certId,
            owner: details.owner,
            metadataHash: details.metadata_hash,
            isValid: details.is_valid,
            issueDate: new Date().toISOString().split("T")[0], // Mock date
            productType: "Fashion Item", // Mock type
          };
          return { valid: true, certificate };
        }
      }
      
      return { valid: false, certificate: null };
    } catch (err) {
      setError('Error verifying certificate');
      console.error('Verify certificate error:', err);
      return { valid: false, certificate: null };
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferCertificate = async (certId: string, newOwner: string) => {
    if (!contract || !publicKey || !isConnected) {
      setError('Wallet not connected');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const keypair = Keypair.fromPublicKey(publicKey);
      
      const success = await contract.transferCertificate(keypair, certId, newOwner);
      
      if (success) {
        setCertificates((prev) =>
          prev.map((cert) =>
            cert.id === certId ? { ...cert, owner: newOwner } : cert
          )
        );
        console.log("Certificate transferred:", certId, "to:", newOwner);
      } else {
        setError('Failed to transfer certificate');
      }
    } catch (err) {
      setError('Error transferring certificate');
      console.error('Transfer certificate error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeCertificate = async (certId: string) => {
    if (!contract || !publicKey || !isConnected || !isAdmin) {
      setError('Admin wallet connection required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const keypair = Keypair.fromPublicKey(publicKey);
      
      const success = await contract.revokeCertificate(keypair, certId);
      
      if (success) {
        setCertificates((prev) =>
          prev.map((cert) =>
            cert.id === certId ? { ...cert, isValid: false } : cert
          )
        );
        console.log("Certificate revoked:", certId);
      } else {
        setError('Failed to revoke certificate');
      }
    } catch (err) {
      setError('Error revoking certificate');
      console.error('Revoke certificate error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAdmin,
    adminAddress,
    certificates,
    isLoading,
    error,
    isWalletConnected: isConnected,
    userPublicKey: publicKey,
    contractAddress: defaultConfig.contractAddress,
    handleInitContract,
    handleIssueCertificate,
    handleVerifyCertificate,
    handleTransferCertificate,
    handleRevokeCertificate,
    clearError,
  };
}
