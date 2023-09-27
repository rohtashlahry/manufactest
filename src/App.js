import './App.css';
import GammaCalc from './gammaCalc.tsx';
import WineCalculation from './wineCalculation.tsx';
import WineData from './wineData.json'

function App() {
  const wineData = WineData;
  return (
    <div className="App">
      <h1>Hello Manufac</h1>
      <WineCalculation wineData={wineData} />
      <GammaCalc wineData={wineData} />
    </div>
  );
}

export default App;
