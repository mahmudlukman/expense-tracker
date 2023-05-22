const balance = document.getElementById('balance')
const money_plus = document.getElementById('money_plus')
const money_minus = document.getElementById('money_minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
const generateID = () => {
  return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM list
const addTransactionDOM = (transactions) => {
  // Get sign
  const sign = transactions.amount < 0 ? '-' : '+'

  const item = document.createElement('li')

  // Add class based on value
  item.classList.add(transactions.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `
    ${transactions.text} <span>${sign}${Math.abs(transactions.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transactions.id})">x</button>
  `

  list.appendChild(item)
}

// Update the balance, income and expense
const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount)

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)

  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)

  balance.innerHTML = `$${total}`
  money_plus.innerHTML = `$${income}`
  money_minus.innerHTML = `$${expense}`

}

// Remove transaction by ID
const removeTransaction = (id) => {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}


// Init app
const init = () => {
  list.innerHTML = ''

  transactions.forEach(addTransactionDOM)
  updateValues()
}

init()

form.addEventListener('submit', addTransaction);


