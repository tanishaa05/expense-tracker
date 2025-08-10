const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const toggleTheme = document.getElementById('toggle-theme');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const incomeTotal = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const expenseTotal = (
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = `₹${total}`;
  income.innerText = `₹${incomeTotal}`;
  expense.innerText = `₹${expenseTotal}`;
}
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'expense' : 'income');
  item.innerHTML = `
    ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <button onclick="removeTransaction(${transaction.id})">✖</button>
  `;
  list.appendChild(item);
}
form.addEventListener('submit', e => {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') return;

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  init();
  text.value = '';
  amount.value = '';
});

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

init();
