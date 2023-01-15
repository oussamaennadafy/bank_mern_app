import { useDispatch } from "react-redux";

function Transaction({ transaction }) {
  const dispatch = useDispatch();

  return (
    <div className="transaction">
      <div>{new Date(transaction.createdAt).toLocaleString("en-US")}</div>
      <h2>{transaction.text}</h2>
      {/* <button
        onClick={() => dispatch(deletetransaction(transaction._id))}
        className="close"
      >
        X
      </button> */}
    </div>
  );
}

export default Transaction;
