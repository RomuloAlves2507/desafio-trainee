import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactSpeedometer from "react-d3-speedometer";
import React from "react";
// Adicione a importação do Chart se necessário
// import { Chart } from 'react-google-charts';

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const Home = () => {
  const [temperatureHistory, setTemperatureHistory] = useState<number[]>([]);
  const [voltageHistory, setVoltageHistory] = useState<number[]>([]);
  const [potPositionHistory, setPotPositionHistory] = useState<number[]>([]);
  const [temperature, setTemperature] = useState<number>(0);
  const [voltage, setVoltage] = useState<number>(0);
  const [potPosition, setPotPosition] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemperature = Math.random() * 50; // Simulando temperatura entre 0 e 50
      const newVoltage = Math.random() * 24; // Simulando tensão entre 0 e 24
      const newPotPosition = Math.random() * 10; // Simulando posição do potenciômetro entre 0 e 10

      // Atualizando os estados com os últimos 10 valores
      setTemperatureHistory(prev => [...prev.slice(-9), newTemperature]);
      setVoltageHistory(prev => [...prev.slice(-9), newVoltage]);
      setPotPositionHistory(prev => [...prev.slice(-9), newPotPosition]);

      // Atualizando o estado com o último valor
      setTemperature(newTemperature);
      setVoltage(newVoltage);
      setPotPosition(newPotPosition);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="items-center min-h-screen flex flex-col bg-gradient-to-b from-blue-200 to-blue-500">
      {/* -------------------------------------------Título e a imagem------------------------------------------- */}
      <div className='flex'>
        <h1 className="text-8xl font-extrabold text-yellow-500 mb-8 font-serif tracking-wide">Solares</h1>
        <Image src="https://i.pinimg.com/originals/c6/0f/1e/c60f1edd6f1f5be77202a39b1f541a71.png" alt="Logo" width={100} height={100} />
      </div>

      {/* ---------------------------------------Escrever os novos valores--------------------------------------- */}
      <div className='text-center'>
        <h2 className="text-2xl font-semibold">ÚLTIMOS VALORES RECEBIDOS</h2>
      </div>

      <div>
        {/* Temperatura */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4 w-80 text-center">
          <h2 className="text-2xl font-semibold">Temperatura: {temperature.toFixed(2)} °C</h2>
        </div>

        {/* Tensão */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4 w-80 text-center">
          <h2 className="text-2xl font-semibold">Tensão: {voltage.toFixed(2)} V</h2>
        </div>

        {/* Posição do Potenciômetro */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-2xl font-semibold">Posição do Potenciômetro: {potPosition.toFixed(2)} / 10</h2>
        </div>
      </div>

      {/* ------------------------------------------Inserir os gráficos------------------------------------------ */}
      <div className='text-center'>
        <h2 className="text-2xl font-semibold">GRÁFICOS</h2>
      </div>

      <div className='flex'>
        {/* Temperatura */}
        <div>
          <ReactSpeedometer
            width={450}
            height={600}
            maxValue={145}
            value={temperature}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="red"
          />
        </div>

        {/* Gráficos Comentados */}
        {/*
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={data}
          options={options}
        />
        */}
      </div>
    </div>
  );
};

export default Home;
