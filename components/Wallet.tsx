import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import TransactionList from "./TransactionList";
import { Form, Field } from "react-final-form";
import { initTransaction } from "../utils/initTransaction";
import { Loading } from "./Loading";
import { ethers } from "ethers";

import Button from "./Button";

export const Wallet = () => {
  const [error, setError] = useState(null);
  const [txs, setTxs] = useState([]);
  const [isPendingTx, setPendingTx] = useState([]);
  const [isClicked, setClicked] = useState(false);
  const [isSuccessStorage, setIsSuccessStorage] = useState([]);
  const [isErrorStorage, setIsErrorStorage] = useState([]);
  const localStorageKeySuccess = "transactionStorageSucces";
  const localStorageKeyError = "transactionStorageError";

  // UseEffect to fetch provider and set to localstorage to persist accross tabs
  // Store the last transaction in localStorage
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    const getSuccessFullTransaction = JSON.parse(
      window.localStorage.getItem(localStorageKeySuccess)
    );

    const getErrorFullTransaction = JSON.parse(
      window.localStorage.getItem(localStorageKeyError)
    );

    setIsSuccessStorage(getSuccessFullTransaction);
    setIsErrorStorage(getErrorFullTransaction);

    if (error) {
      localStorage.setItem(localStorageKeyError, JSON.stringify(error));
      setClicked(false);
    }

    // WaitForTransaction
    const fetchData = async () => {
      if (txs.length) {
        const data = await provider.waitForTransaction(txs[0].hash);
        setPendingTx([data]);
        localStorage.setItem(localStorageKeySuccess, JSON.stringify([data]));
        if (data) setClicked(false);
        return data;
      }
    };
    fetchData().catch(error);
  }, [txs, error]);

  const required = (value) => (value ? undefined : "Required");

  // Submit formData
  const submitFormData = async (formData: any) => {
    const { ether, address } = formData;

    if (!formData) setError(formData);

    const txData = {
      setError,
      setTxs,
      ether,
      address,
    };
    await initTransaction(txData);
    setClicked(true);
  };

  const getTxOrLocalStorage =
    isPendingTx.length > 0 ? isPendingTx : isSuccessStorage;

  // We use react-final-form to avoid re-rendering
  return (
    <>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <Form
          onSubmit={submitFormData}
          render={({ handleSubmit, submitting, invalid }) => {
            const isSubmitDisabled = submitting || invalid;

            return (
              <form onSubmit={handleSubmit}>
                <main className="mt-4 p-4">
                  <h1 className="text-xl font-semibold text-gray-700 text-center">
                    Eth Wallet{" "}
                  </h1>
                  <div className="my-3">
                    <Field
                      name="address"
                      component="input"
                      placeholder="Receiver address"
                      className="input input-bordered block w-full focus:ring focus:outline-none"
                      validate={required}
                    />
                  </div>
                  <div className="my-3">
                    <Field
                      name="ether"
                      component="input"
                      placeholder="amount"
                      type="number"
                      className="input input-bordered block w-full focus:ring focus:outline-none"
                      validate={required}
                    />
                  </div>

                  <Button
                    dataTestid="wallet-btn"
                    type="submit"
                    disabled={isClicked && !error ? true : isSubmitDisabled}
                    className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                  >
                    Send Eth
                  </Button>
                  {isClicked ? (
                    <Loading />
                  ) : (
                    <TransactionList validatedTx={getTxOrLocalStorage} />
                  )}

                  <ErrorMessage message={error || isErrorStorage} />
                </main>
              </form>
            );
          }}
        />
      </div>
    </>
  );
};
