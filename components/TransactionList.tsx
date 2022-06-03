import { FunctionComponent } from "react";
import { v4 as uuidv4 } from "uuid";

interface ListProps {
  validatedTx: [
    {
      blockHash: string;
      blockNumber: number;
    }
  ];
}

const TransactionList: FunctionComponent<ListProps | any> = ({
  validatedTx,
}) => {
  return (
    <>
      {validatedTx?.map((tx) => (
        <div key={uuidv4()} className="alert alert-success shadow-lg mt-5">
          <div className="flex-auto flex-wrap break-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <label className="font-bold">Confirmed BlockNumber:</label>
            <span>{tx.blockNumber}</span>
            <br />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <label className="font-bold">Block Hash:</label>
            <span>{tx.blockHash}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default TransactionList;
