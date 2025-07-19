import React, { useState, useEffect, useCallback } from 'react';
import { deposit, withdraw, getBalance, getTransactions, getDailySummary } from '../utils/api';
import { Card, Button, Form, Table } from 'react-bootstrap';

const Wallet = () => {
  const [userId, setUserId] = useState(1);
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [dailySummary, setDailySummary] = useState([]);

  const loadBalance = useCallback(async () => {
    try {
      const res = await getBalance(userId);
      setBalance(res.data.balance);
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  }, [userId]);

  const loadTransactions = useCallback(async () => {
    try {
      const res = await getTransactions(userId);
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  }, [userId]);

  const loadDailySummary = useCallback(async () => {
    try {
      const res = await getDailySummary(userId);
      setDailySummary(res.data);
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    }
  }, [userId]);

  const handleAction = async (type) => {
    try {
      if (type === 'deposit') {
        await deposit(userId, amount);
      } else {
        await withdraw(userId, amount);
      }
      await loadBalance();
      await loadTransactions();
      await loadDailySummary();
    } catch (err) {
      console.error(`Failed to ${type}:`, err);
    }
  };

  useEffect(() => {
    loadBalance();
    loadTransactions();
    loadDailySummary();
  }, [loadBalance, loadTransactions, loadDailySummary]);

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Wallet Dashboard</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="number"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <div className="mt-3">
              <Button variant="success" onClick={() => handleAction('deposit')}>Deposit</Button>{' '}
              <Button variant="danger" onClick={() => handleAction('withdraw')}>Withdraw</Button>{' '}
              <Button variant="info" onClick={loadBalance}>Refresh Balance</Button>
            </div>
          </Form>

          <h4 className="mt-4">Current Balance: ${balance}</h4>
        </Card.Body>
      </Card>

      <div className="mt-5">
        <h5>Transaction History</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>running_balance</th>
              
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{new Date(tx.created_at).toLocaleString()}</td>
                <td>{tx.type}</td>
                <td>${tx.amount}</td>
                <td>{tx.running_balance}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="mt-5">
        <h5>Daily Summary</h5>
        <Table bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opening Balance</th>
              <th>Total Deposits</th>
              <th>Total Withdrawals</th>
              <th>Closing Balance</th>
            </tr>
          </thead>
          <tbody>
            {dailySummary.map((row, i) => (
              <tr key={i}>
                <td>{row.date}</td>
                <td>${row.opening_balance || 0}</td>
                <td>${row.total_deposit || 0}</td>
                <td>${row.total_withdraw || 0}</td>
                <td>${row.closing_balance || 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Wallet;
