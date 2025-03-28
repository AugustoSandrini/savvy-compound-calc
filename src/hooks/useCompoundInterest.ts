
interface CalculationParams {
  initialAmount: number;
  monthlyContribution: number;
  interestRate: number;
  period: number;
}

interface CalculationResult {
  finalAmount: number;
  totalInvested: number;
  interestEarned: number;
  monthlyData: Array<{
    month: number;
    investedAmount: number;
    totalAmount: number;
  }>;
}

export const useCompoundInterest = () => {
  const calculate = ({
    initialAmount,
    monthlyContribution,
    interestRate,
    period,
  }: CalculationParams): CalculationResult => {
    // Convertendo a taxa de porcentagem para decimal
    const rate = interestRate / 100;
    
    let totalAmount = initialAmount;
    let totalInvested = initialAmount;
    const monthlyData = [];
    
    // Adiciona o mês 0 (valor inicial)
    monthlyData.push({
      month: 0,
      investedAmount: initialAmount,
      totalAmount: initialAmount,
    });
    
    // Calcula mês a mês
    for (let month = 1; month <= period; month++) {
      // Adiciona o aporte mensal
      totalInvested += monthlyContribution;
      
      // Calcula os juros e adiciona ao total
      totalAmount = totalAmount * (1 + rate) + monthlyContribution;
      
      // Adiciona os dados do mês atual ao array
      monthlyData.push({
        month,
        investedAmount: totalInvested,
        totalAmount,
      });
    }
    
    // Calcula quanto foi ganho apenas com juros
    const interestEarned = totalAmount - totalInvested;
    
    return {
      finalAmount: totalAmount,
      totalInvested,
      interestEarned,
      monthlyData,
    };
  };
  
  return { calculate };
};
