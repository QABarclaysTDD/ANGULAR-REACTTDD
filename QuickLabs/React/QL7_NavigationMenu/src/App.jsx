import { BrowserRouter } from 'react-router-dom';
import NavigationMenu from './components/NavigationMenu';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationMenu />
      </div>
    </BrowserRouter>
  );
}

export default App;