
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FormValues {
  initialAmount: number | "";
  monthlyContribution: number | "";
  interestRate: number | "";
  period: number | "";
}

interface CompoundInterestFormProps {
  onCalculate: (values: { 
    initialAmount: number; 
    monthlyContribution: number; 
    interestRate: number; 
    period: number; 
  }) => void;
}

const CompoundInterestForm: React.FC<CompoundInterestFormProps> = ({ onCalculate }) => {
  const [values, setValues] = useState<FormValues>({
    initialAmount: 1000,
    monthlyContribution: 100,
    interestRate: 0.5,
    period: 12,
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value === "" ? "" : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert empty values to 0 for calculation
    const valuesToCalculate = {
      initialAmount: values.initialAmount === "" ? 0 : values.initialAmount,
      monthlyContribution: values.monthlyContribution === "" ? 0 : values.monthlyContribution,
      interestRate: values.interestRate === "" ? 0 : values.interestRate,
      period: values.period === "" ? 0 : values.period,
    };
    
    // Validação básica
    if (valuesToCalculate.period <= 0) {
      toast({
        title: "Erro de validação",
        description: "O período deve ser maior que zero.",
        variant: "destructive",
      });
      return;
    }
    
    onCalculate(valuesToCalculate);
    
    toast({
      title: "Cálculo realizado",
      description: "Os resultados foram atualizados com sucesso.",
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialAmount">Valor inicial (R$)</Label>
              <Input
                id="initialAmount"
                name="initialAmount"
                type="number"
                placeholder="Ex: 1000"
                value={values.initialAmount === "" ? "" : values.initialAmount}
                onChange={handleChange}
                min="0"
                step="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Aporte mensal (R$)</Label>
              <Input
                id="monthlyContribution"
                name="monthlyContribution"
                type="number"
                placeholder="Ex: 100"
                value={values.monthlyContribution === "" ? "" : values.monthlyContribution}
                onChange={handleChange}
                min="0"
                step="50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">
                Taxa mensal (%)
              </Label>
              <Input
                id="interestRate"
                name="interestRate"
                type="number"
                placeholder="Ex: 0.5"
                value={values.interestRate === "" ? "" : values.interestRate}
                onChange={handleChange}
                min="0"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground">
                Ex: 0.5 = 0.5% ao mês, equivalente a {(Math.pow(1 + (values.interestRate === "" ? 0 : values.interestRate) / 100, 12) - 1) * 100}% ao ano
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Período (meses)</Label>
              <Input
                id="period"
                name="period"
                type="number"
                placeholder="Ex: 12"
                value={values.period === "" ? "" : values.period}
                onChange={handleChange}
                min="1"
                max="600"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-finance-blue hover:bg-finance-darkBlue"
          >
            <Calculator className="mr-2 h-4 w-4" /> Calcular
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompoundInterestForm;
