# **Sentique: Decentralized Supply Chain Integrity & Compliance Platform**

A blockchain-based system for ensuring product authenticity, regulatory compliance, and transparent traceability across global supply chains.

---

## **Overview**

Sentique leverages smart contracts to tokenize and track every stage of a product's journey — from raw material sourcing to consumer purchase — enabling tamper-proof certification, shipment tracking, and decentralized auditing.

This system consists of nine core smart contracts that manage the end-to-end lifecycle of supply chain integrity:

1. **Manufacturer Registry Contract** – Verifies and registers authorized manufacturers  
2. **Product Token Contract** – Tokenizes physical goods with immutable metadata  
3. **Shipment Tracking Contract** – Records transportation and environmental data  
4. **Compliance Certification Contract** – Issues and verifies quality/compliance certs  
5. **Ownership Escrow Contract** – Manages payments and product handover conditions  
6. **Inspection Audit Contract** – Logs third-party inspection results  
7. **Recall Management Contract** – Enables transparent product recalls  
8. **Consumer Feedback Contract** – Captures end-user ratings and experiences  
9. **Dispute Resolution Contract** – Mediates conflicts between supply chain parties  

---

## **Features**

- End-to-end product traceability  
- Decentralized manufacturer and certifier verification  
- Automated escrow for safer trade settlements  
- Tamper-proof shipment history logging  
- Compliance certificate tokenization  
- Auditable third-party inspections  
- Transparent recall mechanisms  
- Consumer rating and validation system  
- On-chain dispute mediation  

---

## **Smart Contracts**

### **Manufacturer Registry Contract**

- Registers vetted manufacturers  
- Stores certification and reputation score  
- Permissioned access control  

### **Product Token Contract**

- Represents physical goods with ERC-721 or ERC-1155 tokens  
- Includes metadata for origin, batch ID, and specs  
- Lifecycle tracking and burnable for recalls  

### **Shipment Tracking Contract**

- Logs GPS, timestamp, and condition data  
- Integrated with IoT or oracle feeds  
- Tamper-proof checkpoints  

### **Compliance Certification Contract**

- Stores ISO, CE, FDA, and other regulatory approvals  
- Verifiable digital signatures from certifying bodies  
- Linked to product tokens  

### **Ownership Escrow Contract**

- Escrows payment until delivery and compliance checks pass  
- Customizable handover rules  
- Supports milestone-based releases  

### **Inspection Audit Contract**

- Records third-party audits  
- Tracks inspector credibility  
- Immutable scoring and review system  

### **Recall Management Contract**

- Enables manufacturers or regulators to issue recalls  
- Notifies affected product owners  
- Disables transfer or usage of recalled products  

### **Consumer Feedback Contract**

- Lets verified product owners leave feedback  
- Uses quadratic rating weight  
- Affects manufacturer trust score  

### **Dispute Resolution Contract**

- Arbitration logic for multi-party conflicts  
- Community or DAO-based voting  
- Refund or resolution enforcement  

---

## **Installation**

1. Install Clarinet CLI  
2. Clone this repository  
3. Run tests: `npm test`  
4. Deploy contracts: `clarinet deploy`  

---

## **Usage**

Each contract is modular and can be deployed independently depending on supply chain needs. Use combinations of contracts to implement full lifecycle management for your industry (e.g., pharmaceuticals, electronics, agri-food).

Refer to individual contract documentation in the `/contracts` directory for deployment parameters and interaction details.

---

## **Testing**

Tests are written using Vitest. To run tests:

```bash
npm test
```

## **License**

MIT License