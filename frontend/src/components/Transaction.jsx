function Transaction({ transaction, index, arrayLength, formatter }) {
  return (
    <div className="movements__row">
      <div
        className={`movements__type movements__type--${
          transaction.type === "send" ? "withdrawal" : "deposit"
        }`}
      >
        {`${arrayLength - index} ${
          transaction.type === "send" ? "withdrawal" : "deposit"
        }`}
      </div>
      <div className="movements__date">
        {new Date(transaction.createdAt).toLocaleString()}
      </div>
      <div className="movements__value">{formatter(transaction.amount)}</div>
    </div>
  );
}

export default Transaction;
