import TopSection from './components/TopSection';
import DashboardNavbar from './components/DashboardNavbar';
import Header from './components/Header';
import OutputContainer from './components/OutputContainer';

function App() {
  return (
    <>
      <div className="main-content">
        <DashboardNavbar/>
        <Header/>
        <TopSection/>
        <OutputContainer/>
      </div>
    </>
  );
}

export default App;
