import TopSection from './components/TopSection';
import DashboardNavbar from './components/DashboardNavbar';
import Header from './components/Header';

function App() {
  return (
    <>
      <div className="main-content">
        <DashboardNavbar/>
        <Header/>
        <TopSection/>
            
      </div>
    </>
  );
}

export default App;
