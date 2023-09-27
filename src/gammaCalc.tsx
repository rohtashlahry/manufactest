import React, { useState, useEffect } from 'react';

const GammaCalc = ({ wineData }: { wineData: any[] }) => {
  // Calculate the "Gamma" property for each data point
  const calculateGamma = (data: any) => {
    return (data.Ash * data.Hue) / data.Magnesium;
  };

  // Utility function to calculate mean
  const calculateMean = (data: number[]) => {
    const sum = data.reduce((acc, item) => acc + item, 0);
    return sum / data.length;
  };

  // Utility function to calculate median
  const calculateMedian = (data: number[]) => {
    const sortedData = data.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);
    if (sortedData.length % 2 === 0) {
      return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
      return sortedData[middle];
    }
  };

  // Utility function to calculate mode
  const calculateMode = (data: number[]) => {
    const frequency: Record<number, number> = {};
    data.forEach((item) => {
      frequency[item] = (frequency[item] || 0) + 1;
    });

    let mode: number | null = null;
    let maxFrequency = 0;

    for (const key in frequency) {
      if (frequency[key] > maxFrequency) {
        maxFrequency = frequency[key];
        mode = parseInt(key, 10);
      }
    }

    return mode;
  };

  // Calculate Gamma and statistics for each class when wineData changes
  const [gammaData, setGammaData] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<
    { class: number; mean: string; median: string; mode: number | null }[]
  >([]);

  useEffect(() => {
    const calculatedGammaData = wineData.map((x) => {
      const gamma = calculateGamma(x);
      return { ...x, Gamma: gamma };
    });

    setGammaData(calculatedGammaData);

    const uniqueClasses = [...new Set(calculatedGammaData.map((x) => x.Alcohol))];
    const classStatistics = uniqueClasses.map((wineClass) => {
      const classData = calculatedGammaData.filter((x) => x.Alcohol === wineClass);
      const gammaData = classData.map((x) => x.Gamma);
      const mean = calculateMean(gammaData);
      const median = calculateMedian(gammaData);
      const mode = calculateMode(gammaData);

      return {
        class: wineClass,
        mean: mean.toFixed(3),
        median: median.toFixed(3),
        mode: mode,
      };
    });

    setStatistics(classStatistics);
  }, [wineData]);

  return (
    <div>
      <table>
        <tbody>
        <th>
            <tr>Class</tr>
            <tr>Gamma Mean</tr>
            <tr>Gamma Median</tr>
            <tr>Gamma Mode</tr>
          </th>
          {statistics.map((stat) => (
            <th key={stat.class}>
              <tr>{stat.class}</tr>
              <tr>{stat.mean}</tr>
              <tr>{stat.median}</tr>
              <tr>{stat.mode !== null ? stat.mode.toFixed(3) : 'N/A'}</tr>
            </th>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GammaCalc;
