// js/transactions.js — mock transactions data + rendering into transactions.html
const mockHistory = [
  // Added per user request: 02/01/2026 debit check transfer for -$300,000.00
  { date: "2026-02-01", desc: "Check Transfer", type: "Debit", amount: -300000.00, balance: -292489.74 },
  { date: "2019-04-27", desc: "Zelle from Michael Adams", type: "Credit", amount: 850.00, balance: 7510.26 },
  { date: "2019-02-25", desc: "Starbucks Coffee", type: "Debit", amount: -7.85, balance: 6660.26 },
  { date: "2018-11-24", desc: "Transfer to Savings", type: "Debit", amount: -500.00, balance: 6668.11 },
  { date: "2018-09-20", desc: "Walmart Supercenter", type: "Debit", amount: -89.20, balance: 7168.11 },
  { date: "2018-07-18", desc: "Paycheck Deposit", type: "Credit", amount: 2100.00, balance: 7257.31 },
  { date: "2018-07-15", desc: "Amazon Marketplace", type: "Debit", amount: -39.99, balance: 5157.31 },
  { date: "2018-06-10", desc: "Apple Subscription", type: "Debit", amount: -14.99, balance: 5197.30 },
  { date: "2018-06-09", desc: "ATM Deposit", type: "Credit", amount: 300.00, balance: 5212.29 },
  { date: "2018-04-05", desc: "Target Store", type: "Debit", amount: -120.49, balance: 4912.29 },
  { date: "2018-04-02", desc: "Zelle to Sarah W.", type: "Debit", amount: -150.00, balance: 5032.78 }
];

// Render into table
// Render into table
function renderTransactions() {
  const tbody = document.getElementById("txBody");
  if (!tbody) return;

  mockHistory.forEach(tx => {
    const tr = document.createElement("tr");
    const amt = tx.amount;
    // Format amounts like normal bank statements: commas + two decimals, negative shown with '-'
    const sign = amt < 0 ? '-' : (amt > 0 ? '+' : '');
    const formatted = Math.abs(amt).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const amountHtml = `${sign}$${formatted}`;
    const amtClass = amt > 0 ? 'tx-credit' : 'tx-debit';

    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.desc}</td>
      <td>${tx.type}</td>
      <td class="${amtClass}">${amountHtml}</td>
    `;
    

    tbody.appendChild(tr);
  });

  hideLoader();
}

renderTransactions();
