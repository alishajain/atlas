import './App.css';
import AddYarnStockDetails from './Components/AddYarnStockDetails';
import AddYarnDetails from './Components/AddYarnDetails';
import YarnDetails from './Components/YarnDetails';
import YarnStockDetails from './Components/YarnStockDetails';

const App = () => {
  return (
    <div>
      <AddYarnDetails />
      <AddYarnStockDetails />
      <YarnDetails />
      <YarnStockDetails />
    </div>
  );
}

export default App;
