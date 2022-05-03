import './App.css';
import CasesGraph from './screens/Line Graph/CasesGraph'; // Imported Graph component.
import CasesMap from './screens/Leaflet Map/CasesMap'; // Imported Map Component.

function App() {
  return (
    <div className="text-center">
      <h1 className='mb-4'>Covid Cases</h1>

      <p className='text-danger fs-4 fw-bold'>Below graph shows fluctuations of covid cases</p>
      <CasesGraph />

      <hr />

      <p className='text-danger fs-4 fw-bold'>Country wise map of covid cases</p>
      <div className='text-center pb-5 d-flex justify-content-center'>
        <CasesMap />
      </div>
    </div>
  );
}

export default App;
