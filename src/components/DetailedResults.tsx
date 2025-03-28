
import React from "react";
import ResultCard from "./ResultCard";

interface DetailedResultsProps {
  finalAmount: number;
  totalInvested: number;
  interestEarned: number;
}

const DetailedResults: React.FC<DetailedResultsProps> = ({
  finalAmount,
  totalInvested,
  interestEarned,
}) => {
  const interestPercentage = (interestEarned / totalInvested) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ResultCard
        title="Montante Final"
        value={finalAmount}
        description="Valor total acumulado no período"
        className="border-finance-green"
      />
      <ResultCard
        title="Total Investido"
        value={totalInvested}
        description="Capital investido + aportes mensais"
      />
      <ResultCard
        title="Juros Ganhos"
        value={interestEarned}
        description={`Rendimento de ${interestPercentage.toFixed(2)}% sobre o investido`}
        className="border-finance-blue"
      />
    </div>
  );
};

export default DetailedResults;
