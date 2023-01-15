import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transactionService from './transactionService'

const initialState = {
  transactions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new transaction
export const createtransaction = createAsyncThunk(
  'transactions/create',
  async (transactionData, thunkAPI) =>
  {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.createtransaction(transactionData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user transactions
export const gettransactions = createAsyncThunk(
  'transactions/getAll',
  async (_, thunkAPI) =>
  {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.gettransactions(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// // Delete user transaction
// export const deletetransaction = createAsyncThunk(
//   'transactions/delete',
//   async (id, thunkAPI) =>
//   {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await transactionService.deletetransaction(id, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(createtransaction.pending, (state) =>
      {
        state.isLoading = true
      })
      .addCase(createtransaction.fulfilled, (state, action) =>
      {
        state.isLoading = false
        state.isSuccess = true
        state.transactions.push(action.payload)
      })
      .addCase(createtransaction.rejected, (state, action) =>
      {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(gettransactions.pending, (state) =>
      {
        state.isLoading = true
      })
      .addCase(gettransactions.fulfilled, (state, action) =>
      {
        state.isLoading = false
        state.isSuccess = true
        state.transactions = action.payload
      })
      .addCase(gettransactions.rejected, (state, action) =>
      {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
    // .addCase(deletetransaction.pending, (state) =>
    // {
    //   state.isLoading = true
    // })
    // .addCase(deletetransaction.fulfilled, (state, action) =>
    // {
    //   state.isLoading = false
    //   state.isSuccess = true
    //   state.transactions = state.transactions.filter(
    //     (transaction) => transaction._id !== action.payload.id
    //   )
    // })
    // .addCase(deletetransaction.rejected, (state, action) =>
    // {
    //   state.isLoading = false
    //   state.isError = true
    //   state.message = action.payload
    // })
  },
})

export const { reset } = transactionSlice.actions
export default transactionSlice.reducer
