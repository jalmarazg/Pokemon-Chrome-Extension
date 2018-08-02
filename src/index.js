/* global chrome */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider as Provider } from "react-apollo";
import registerServiceWorker from './registerServiceWorker';

/*
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/

console.log('Inicio');
const uri = 'http://localhost:4000';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri,
});

const app = document.createElement('div');
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(
    <Provider client={client}><App /></Provider>, app);

app.style.display = "none";
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);
function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}