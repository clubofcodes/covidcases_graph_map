import './App.css';
import CasesGraph from './screens/Line Graph/CasesGraph';

function App() {
  return (
    <div className="text-center">
      <h2 className='mb-4'>Dashboard</h2>
      <p className='text-danger fs-5'>Line graph showing the covid cases</p>
      <CasesGraph />
    </div>
  );
}

export default App;
