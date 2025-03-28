
import React, { useState } from "react";
import CompoundInterestForm from "./CompoundInterestForm";
import ResultChart from "./ResultChart";
import DetailedResults from "./DetailedResults";
import { useCompoundInterest } from "@/hooks/useCompoundInterest";

const CompoundInterestCalculator: React.FC = () => {
  const { calculate } = useCompoundInterest();
  const [results, setResults] = useState<{
    finalAmount: number;
    totalInvested: number;
    interestEarned: number;
    monthlyData: Array<{
      month: number;
      investedAmount: number;
      totalAmount: number;
    }>;
  } | null>(null);

  const handleCalculate = (values: {
    initialAmount: number;
    monthlyContribution: number;
    interestRate: number;
    period: number;
  }) => {
    const calculationResult = calculate(values);
    setResults(calculationResult);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <CompoundInterestForm onCalculate={handleCalculate} />

      {results && (
        <>
          <DetailedResults
            finalAmount={results.finalAmount}
            totalInvested={results.totalInvested}
            interestEarned={results.interestEarned}
          />
          <ResultChart data={results.monthlyData} />
        </>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
