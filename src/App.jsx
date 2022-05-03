import './App.css';
import CasesMap from './screens/Leaflet Map/CasesMap';
import CasesGraph from './screens/Line Graph/CasesGraph';

function App() {
  return (
    <div className="text-center">
      <h2 className='mb-4'>Covid Cases</h2>

      <p className='text-danger fs-5'>Line graph showing the covid cases</p>
      <CasesGraph />

      <hr />

      <p className='text-danger fs-5'>Map of covid cases</p>
      <div className='text-center pb-5 d-flex justify-content-center'>
        <CasesMap />
      </div>
    </div>
  );
}

export default App;
