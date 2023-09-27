import React, { useState, useEffect } from 'react';
import './App.css'

const WineCalculation = ({ wineData }: { wineData: any[] }) => {

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

  // Calculate statistics for each class when wineData changes
    
  const [calculatedValues, setCalculatedValues] = useState<
    { class: number; mean: string; median: string; mode: number | null }[]
  >([]);

  useEffect(() => {
    const uniqueClasses = [...new Set(wineData.map((wine) => wine.Alcohol))];

    const classStatistics = uniqueClasses && uniqueClasses.map((wineClass) => {
      const classData = wineData.filter((wine) => wine.Alcohol === wineClass);
      const flavanoidsData = classData.map((wine) => wine.Flavanoids);
      const mean = calculateMean(flavanoidsData);
      const median = calculateMedian(flavanoidsData);
      const mode = calculateMode(flavanoidsData);

      return {
        class: wineClass,
        mean: mean.toFixed(3),
        median: median.toFixed(3),
        mode: mode,
      };
    });

    setCalculatedValues(classStatistics);
  }, [wineData]);
  console.log("statistics", calculatedValues)

  return (
    <div>
      <table>
        <tbody>
        <th>
          <tr>Measure</tr> 
          <tr>Flavanoids Mean</tr> 
          <tr>Flavanoids Median</tr> 
          <tr>Flavanoids Mode</tr> 
        </th>
          {calculatedValues.map((z: any) => (
            <th key={z.class}>
              <tr>{z.class}</tr>
              <tr>{z.mean}</tr>
              <tr>{z.median}</tr>
              <tr>{z.mode !== null ? z.mode.toFixed(3) : 'Null'}</tr>
            </th>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WineCalculation;
