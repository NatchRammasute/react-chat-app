import './App.css';
import Header from './components/Header';
import Chat from './components/Chat'
import SideBar from './components/SideBar'

//import context 
import {MessageProvider} from './context/MessageContext'

//connect to graphql via apollo clinet 
import { ApolloClient, InMemoryCache,ApolloProvider ,HttpLink, from} from "@apollo/client";
import {onError} from "@apollo/client/link/error"

// check error 
const errorlink = onError(({grahqlErrors,networkError}) =>{
  if(grahqlErrors){
    grahqlErrors.map(({message,location,path}) =>{
      alert(`GraphQL Error ${message}`)
    })
  }
})
const link = from([
  errorlink,
  new HttpLink({uri:"https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql"})

])
//Create Client to see if we have correct server 
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <div className="App container">
      <Header/>
      <MessageProvider>
        <div className= "grid-container">
          <SideBar/>
          <ApolloProvider client={client}>
            <Chat />
          </ApolloProvider>
        </div>
      </MessageProvider>
      
      
      </div>

  
  );
}

export default App;
