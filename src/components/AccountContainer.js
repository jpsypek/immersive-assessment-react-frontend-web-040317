import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'


class AccountContainer extends Component {

  constructor() {
    super()
    this.state = {
      transactions: [],
      filteredTransactions: []
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    const searchValue = event.target.value.toLowerCase()
    const filteredTransactions = [...this.state.transactions].filter((transaction) => {
      return transaction.description.toLowerCase().includes(searchValue) ||
      transaction.category.toLowerCase().includes(searchValue)
    })
    this.setState({filteredTransactions})
  }

  componentDidMount () {
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
      .then(response => response.json())
      .then(transactions => this.setState({
        transactions: transactions,
        filteredTransactions: transactions}))
  }

  render() {

    return (
      <div>
        <Search handleChange={this.handleChange}/>
        <TransactionsList filteredTransactions={this.state.filteredTransactions}/>
      </div>
    )
  }
}

export default AccountContainer
