import './App.css';
import Header from './components/Header';
import Chat from './components/Chat'
import SideBar from './components/SideBar'

//import context 
import {MessageProvider} from './context/MessageContext'

function App() {
  return (
    <div className="App container">
      <Header/>
      <MessageProvider>
        <div className= "grid-container">
          <SideBar/>
          <Chat />
        </div>
     
      </MessageProvider>
      
      
      </div>

  
  );
}

export default App;
