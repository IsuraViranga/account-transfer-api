const chai = require('chai');
const request = require('supertest');;
const transferRoutes = require('../routes/transferRoutes');
const expect = chai.expect;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
  
// Setup express app
const app = express();
    
// Middleware setup
dotenv.config();
app.use(express.json());
app.use(cors());
  
// Import routes
app.use('/api', transferRoutes);
  
// Test cases
    describe('money transfer API test cases', () => {
      it('should happen successful transfer', async () => {
        const response = await request(app)
          .post('/api/transfer')
          .send({
            sourceAccount: 3000,
            destinationAccount: 2000,
            amount: 1500
          });
  
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'Transfer successful');
      });
  
      it('should return error message as Source account not found', async () => {
        const response = await request(app)
          .post('/api/transfer')
          .send({
            sourceAccount: 3500,
            destinationAccount: 2000,
            amount: 1500
          });
  
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Source account not found');
      });
  
      it('should return error message as Destination account not found', async () => {
        const response = await request(app)
          .post('/api/transfer')
          .send({
            sourceAccount: 3000,
            destinationAccount: 2500,
            amount: 1500
          });
  
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Destination account not found');
      });
  
      it('should return error message as Insufficient balance', async () => {
        const response = await request(app)
          .post('/api/transfer')
          .send({
            sourceAccount: 3000,
            destinationAccount: 2000,
            amount: 7000
          });
  
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Insufficient balance');
      });
    });
  
    describe('get balance API test cases', () => {
      it('should return balance successfully', async () => {
        const accountNumber = 3000;
        const response = await request(app)
          .get(`/api/account/${accountNumber}`);
  
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('balance');
      });
  
      it('should return error message as Account not found', async () => {
        const accountNumber = 3500;
        const response = await request(app)
          .get(`/api/account/${accountNumber}`);
  
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('error', 'Account not found');
      });
    });
  
    describe('get all transactions API test case', () => {
      it('should return transactions successfully', async () => {
        const response = await request(app)
          .get('/api/transactions');
  
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('transactions');
      });
    });
  