import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { _fetchGetBalances } from "../services/balances";
import moment from "moment";
import Loader from "./Loader";
import { questionMark, upTrend, downTrend } from "../../svgs";

export interface IMiniTransactionTypeCard {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  type?: "amount" | "debit" | "credit";
  label?: string;
  endDate: Date;
  startDate: Date;
  group: string;
  includePrevious: boolean;
  includeToday: boolean;
  transactionType?: string;
  amountType?: "amount" | "virtual";
  showPrevious?: boolean;
  previousTitle?: string;
  questionMessage?: string;
  volume?: "total" | "group";
  isTransaction?: boolean;
}

const MiniCard = (props: IMiniTransactionTypeCard) => {
  const [amount, setAmount] = useState(0);
  const [preAmount, setPreAmount] = useState(0);
  const [transaction, setTransaction] = useState(0);
  const [previousTransaction, setPreviousTransaction] = useState(0);
  const [loading, setLoading] = useState(false);
  const transactionType = props.transactionType || "AMOUNT";
  const group = props.group || "monthly";
  const volume = props.volume || "group";
  const includeToday = props.includeToday || false;
  const type = props.type ?? "amount";
  const label = props.label ?? "amount";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const balances = await _fetchGetBalances(
        props.credentials,
        props.userId,
        props.currency,
        moment(props.startDate).format("YYYY-MM-DD"),
        moment(props.endDate).format("YYYY-MM-DD"),
        group,
        props.includePrevious,
        includeToday
      );
      if (balances.length === 2) {
        balances.forEach((balance: any) => {
          if (balance.date === moment(props.endDate).format("YYYY-MM-DD")) {
            setTransaction(
              balance[
                volume === "group" ? "groupedTransactions" : "totalTransactions"
              ]?.[transactionType] ?? 0
            );
            if (type === "amount") {
              props.amountType === "virtual"
                ? setAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedVirtualValues"
                          : "totalVirtualValues"
                      ]?.[transactionType]
                    ) || 0
                  )
                : setAmount(
                    Math.abs(
                      balance[
                        volume === "group" ? "groupedAmounts" : "totalAmounts"
                      ]?.[transactionType]
                    ) || 0
                  );
            } else if (type === "credit") {
              props.amountType === "virtual"
                ? setAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedCrediVirtualValues"
                          : "totalCrediVirtualValues"
                      ]?.[transactionType]
                    ) || 0
                  )
                : setAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedCreditAmounts"
                          : "totalCreditAmounts"
                      ]?.[transactionType]
                    ) || 0
                  );
            } else if (type === "debit") {
              props.amountType === "virtual"
                ? setAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedDebitVirtualValues"
                          : "totalDebitVirtualValues"
                      ]?.[transactionType]
                    ) || 0
                  )
                : setAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedDebitAmounts"
                          : "totalDebitAmounts"
                      ]?.[transactionType]
                    ) || 0
                  );
            }
          } else {
            setPreviousTransaction(
              balance[
                volume === "group" ? "groupedTransactions" : "totalTransactions"
              ]?.[transactionType] ?? 0
            );
            if (type === "amount") {
              props.amountType === "virtual"
                ? setPreAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedVirtualValues"
                          : "totalVirtualValues"
                      ]?.[transactionType]
                    ) || 0
                  )
                : setPreAmount(
                    Math.abs(
                      balance[
                        volume === "group" ? "groupedAmounts" : "totalAmounts"
                      ]?.[transactionType]
                    ) || 0
                  );
            } else if (type === "credit") {
              props.amountType === "virtual"
                ? setPreAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedCrediVirtualValues"
                          : "totalCrediVirtualValues"
                      ]?.[transactionType]
                    ) || 0
                  )
                : setPreAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedCreditAmounts"
                          : "totalCreditAmounts"
                      ]?.[transactionType]
                    ) || 0
                  );
            } else if (type === "debit") {
              props.amountType === "virtual"
                ? setPreAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedDebitVirtualValues"
                          : "totalDebitVirtualValues"
                      ]?.[transactionType]
                    ) || 0
                  )
                : setPreAmount(
                    Math.abs(
                      balance[
                        volume === "group"
                          ? "groupedDebitAmounts"
                          : "totalDebitAmounts"
                      ][transactionType]
                    ) || 0
                  );
            }
          }
        });
      } else if (balances.length === 1) {
        setTransaction(0);
        setPreviousTransaction(
          balances[0][
            volume === "group" ? "groupedTransactions" : "totalTransactions"
          ]?.[transactionType] ?? 0
        );
        setAmount(0);
        if (type === "amount") {
          props.amountType === "virtual"
            ? setPreAmount(
                Math.abs(
                  balances[0][
                    volume === "group"
                      ? "groupedVirtualValues"
                      : "totalVirtualValues"
                  ]?.[transactionType]
                ) || 0
              )
            : setPreAmount(
                Math.abs(
                  balances[0][
                    volume === "group" ? "groupedAmounts" : "totalAmounts"
                  ]?.[transactionType]
                ) || 0
              );
        } else if (type === "credit") {
          props.amountType === "virtual"
            ? setPreAmount(
                Math.abs(
                  balances[0][
                    volume === "group"
                      ? "groupedCrediVirtualValues"
                      : "totalCrediVirtualValues"
                  ]?.[transactionType]
                ) || 0
              )
            : setPreAmount(
                Math.abs(
                  balances[0][
                    volume === "group"
                      ? "groupedCreditAmounts"
                      : "totalCreditAmounts"
                  ]?.[transactionType]
                ) || 0
              );
        } else if (type === "debit") {
          props.amountType === "virtual"
            ? setPreAmount(
                Math.abs(
                  balances[0][
                    volume === "group"
                      ? "groupedDebitVirtualValues"
                      : "totalDebitVirtualValues"
                  ]?.[transactionType]
                ) || 0
              )
            : setPreAmount(
                Math.abs(
                  balances[0][
                    volume === "group"
                      ? "groupedDebitAmounts"
                      : "totalDebitAmounts"
                  ]?.[transactionType]
                ) || 0
              );
        }
      } else {
        setTransaction(0);
        setPreviousTransaction(0);
        setAmount(0);
        setPreAmount(0);
      }
      setLoading(false);
    };

    fetchData();
  }, [
    props.userId,
    props.currency,
    props.startDate,
    props.endDate,
    props.group,
    props.type,
    props.includePrevious,
    props.amountType,
  ]);

  const amountPercentChange =
    ((amount - preAmount) / (preAmount === 0 ? 1 : preAmount)) * 100 ?? 0;

  const transactionPercentChange =
    ((transaction - previousTransaction) /
      (previousTransaction === 0 ? 1 : previousTransaction)) *
      100 ?? 0;

  return (
    <Wrapper>
      <div className="transaction-type-card">
        <div className="heading">
          <div>{label}</div>
        </div>
        <div className="card-amount-container">
          <div className="amount">
            {loading ? (
              <Loader />
            ) : props.isTransaction ? (
              transaction
            ) : (
              Number(amount).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "INR",
              })
            )}
          </div>

          <div className="percent">
            {loading ? (
              <Loader />
            ) : (
              <>
                {!props.isTransaction &&
                  (amountPercentChange < 0 ? downTrend : upTrend)}
                {props.isTransaction &&
                  (transactionPercentChange < 0 ? downTrend : upTrend)}
                <p>
                  {props.isTransaction
                    ? transactionPercentChange.toFixed(2)
                    : amountPercentChange.toFixed(2)}
                  %
                </p>
              </>
            )}
          </div>
        </div>
        {props.showPrevious ? (
          <>
            <hr />
            <div className="previous">
              <div className="previous__amount">
                {loading ? (
                  <Loader />
                ) : props.isTransaction ? (
                  previousTransaction
                ) : (
                  Number(preAmount).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: props.currency ?? "INR",
                  }) ?? 0
                )}
              </div>
              <div className="previous__title">
                <span className="previous__title__text">
                  {props.previousTitle ?? group}
                </span>
                <span
                  className="previous__title__question"
                  title={props.questionMessage ?? group}
                >
                  {questionMark}
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .transaction-type-card {
    padding: 0 12px;
    h2 {
      margin: 0;
      margin-bottom: 6px;
    }
  }
  .card-amount-container {
    display: flex;
    justify-content: space-between;
    h3 {
      margin: 0;
    }
    .percent {
      display: flex;
      gap: 4px;
      p {
        margin: 0;
      }
    }
  }
  .amount {
    font-weight: 600;
  }
  .heading {
    display: flex;
    justify-content: center;
    font-weight: 600;
    text-transform: capitalize;
  }
  .previous {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    &__title {
      &__text {
        text-transform: capitalize;
      }
      &__question {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

export default MiniCard;
