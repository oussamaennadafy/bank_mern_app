import axios from 'axios'

const API_URL = '/api/transactions/'

// Create new transaction
const createtransaction = async (transactionData, token) =>
{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, transactionData, config)

  return response.data
}

// Get user transactions
const gettransactions = async (token) =>
{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}



const transactionService = {
  createtransaction,
  gettransactions
}

export default transactionService
