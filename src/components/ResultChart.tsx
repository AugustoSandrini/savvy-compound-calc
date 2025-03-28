
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataPoint {
  month: number;
  investedAmount: number;
  totalAmount: number;
}

interface ResultChartProps {
  data: DataPoint[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const ResultChart: React.FC<ResultChartProps> = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Evolução do Investimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis 
                dataKey="month" 
                name="Mês" 
                tickFormatter={(value) => `${value}`}
              />
              <YAxis 
                tickFormatter={(value) => 
                  new Intl.NumberFormat("pt-BR", {
                    notation: "compact",
                    compactDisplay: "short",
                    currency: "BRL",
                  }).format(value)
                }
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)} 
                labelFormatter={(label) => `Mês ${label}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="investedAmount"
                name="Valor Investido"
                stackId="1"
                stroke="#0066CC"
                fill="#0066CC"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="totalAmount"
                name="Montante Total"
                stackId="2"
                stroke="#00B894"
                fill="#00B894"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultChart;
