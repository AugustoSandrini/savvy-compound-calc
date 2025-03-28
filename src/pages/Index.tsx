
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import { Coins } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-finance-blue p-3 rounded-full">
              <Coins className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-finance-darkBlue">
            Calculadora de Juros Compostos
          </h1>
          <p className="text-gray-600 mt-2">
            Planeje seu futuro financeiro calculando o crescimento dos seus investimentos
          </p>
        </header>
        
        <main>
          <CompoundInterestCalculator />
        </main>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Ferramenta para simulação de investimentos com juros compostos</p>
          <p className="mt-1">© {new Date().getFullYear()} Calculadora de Juros Compostos</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
