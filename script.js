const balance = document.getElementById('balance')
const money_plus = document.getElementById('money_plus')
const money_minus = document.getElementById('money_minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')


const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];


let transactions = dummyTransactions

// Add transaction to DOM list
const addTransactionDOM = (transactions) => {
  // Get sign
  const sign = transactions.amount < 0 ? '-' : '+'

  const item = document.createElement('li')

  // Add class based on value
  item.classList.add(transactions.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `
    ${transactions.text} <span>${sign}${Math.abs(transactions.amount)}</span> <button class="delete-btn">x</button>
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

  console.log(expense)
}

// Init app
const init = () => {
  list.innerHTML = ''

  transactions.forEach(addTransactionDOM)
  updateValues()
}

init()


