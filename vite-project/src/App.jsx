import { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, sender: 'Alice', receiver: 'Bob', amount: 150, status: 'Completed' },
    { id: 2, sender: 'Charlie', receiver: 'Dave', amount: 200, status: 'Pending' },
    { id: 3, sender: 'Eva', receiver: 'Frank', amount: 300, status: 'Failed' },
    { id: 4, sender: 'Grace', receiver: 'Heidi', amount: 100, status: 'Completed' },
    { id: 5, sender: 'Ivan', receiver: 'Judy', amount: 250, status: 'Pending' },
    { id: 6, sender: 'Kevin', receiver: 'Linda', amount: 400, status: 'Completed' },
    { id: 7, sender: 'Mike', receiver: 'Nancy', amount: 500, status: 'Failed' }
  ]);

  const [filterStatus, setFilterStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    id: '',
    sender: '',
    receiver: '',
    amount: '',
    status: 'Pending'
  });

  const handleAddTransaction = () => {
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({ id: '', sender: '', receiver: '', amount: '', status: 'Pending' });
    setShowForm(false);
  };

  const filteredTransactions = filterStatus
    ? transactions.filter((t) => t.status === filterStatus)
    : transactions;

  return (
    <div className="container">
      <div className="header-row">
        <h1>P2P Transaction</h1>
        <button className="create-btn" onClick={() => setShowForm(true)}>
          Create Transaction
        </button>
      </div>

      <p className="subtitle">
        Track and manage all your <span className="highlight">P2P transactions in one place</span>
        <br />
        Filter by status, view detailed information, and stay organized with this intuitive dashboard.
      </p>

      <div className="filter-bar">
        <label>Filter:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>SENDER NAME</th>
            <th>RECEIVER NAME</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t, index) => (
            <tr key={index}>
              <td>{t.id}</td>
              <td>{t.sender}</td>
              <td>{t.receiver}</td>
              <td>{t.amount}</td>
              <td>
                <span className={`status ${t.status.toLowerCase()}`}>{t.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Transaction</h2>

            <label>Sender Name</label>
            <input
              type="text"
              placeholder="Sender Name"
              value={newTransaction.sender}
              onChange={(e) => setNewTransaction({ ...newTransaction, sender: e.target.value })}
            />
             <label>Receiver Name</label>
            <input
              type="text"
              placeholder="Receiver Name"
              value={newTransaction.receiver}
              onChange={(e) => setNewTransaction({ ...newTransaction, receiver: e.target.value })}
            />
             <label>Amount</label>
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            />
             <label>Status</label>
            <select
              value={newTransaction.status}
              onChange={(e) => setNewTransaction({ ...newTransaction, status: e.target.value })}
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
            <div className="form-buttons">
              <button onClick={handleAddTransaction}>Add Transaction</button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
