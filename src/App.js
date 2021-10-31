
import Header from './components/Header';
import Chat from './components/Chat'
import SideBar from './components/SideBar'
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
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
    <Container>
      <Header/>
      <MessageProvider>
        <div className="container">
        <Row>
          <Col><SideBar/></Col>
          <Col>
          <ApolloProvider client={client}>
            <Chat />
          </ApolloProvider>
          </Col>
          
        </Row>
        </div>

      </MessageProvider>
      
      
      </Container>

  
  );
}

export default App;
