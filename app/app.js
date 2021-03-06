var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var jquery = require('Jquery');

var browserHistory = ReactRouter.browserHistory;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;

/* Composant externalisé sous './components/message' */  
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var PureRenderMixins = require('react-addons-pure-render-mixin');
var browserHistory = ReactRouter.browserHistory;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var Link = ReactRouter.Link; 

// Composants Externes 
import ConversationPane from './components/conversationPane';
import InboxPane from './components/inboxPane';
import StorePan from './components/storePan';
/**/

// Model
var sample = require('./sample-data');

var App = React.createClass({
  getInitialState: function(){
      return {
        "humans": {},
        "stores": {}
        /* Utilisé sans Router */
        /* "selectedConversation": [] */
      };
  },
  loadData: function() {
      this.setState(sample);
      /* Utilisé sans Router */
      /* this.setState({selectedConversation: sample.humans["Noureddine Charaabi"].conversations}); */
  },
  /* Even when we reach link '/conversation/:human' without loadingData by the button 'loadData' */
  componentWillMount: function() {
      if ('human' in this.props.params) {
        this.loadData();
      }
  },
  fetchData: function(){
    jquery.get('/api/humans', function (result) {
      for (var key in result) {
        for(var conv in result[key].conversations){
          result[key].conversations[conv].time = new Date(result[key].conversations[conv].time)
        }
      }
      this.setState({'humans': result});
      db = this.state;
    }.bind(this));
  },
 /*  Utilisé sans Router
  setSelectedConversation: function(humanIndex) {
      this.setState(
        {
            selectedConversation: this.state.humans[humanIndex].conversations
        }
      )
  }, */
  render: function() {
      return (
        <div>
          <div id="header"></div>
          <button onClick={this.loadData}>Load Data</button>
          <button onClick={this.fetchData}>Fetch Data</button>
          <div className="container">
            <div className="column">
              {/* Première lettre forcément en Majuscule */}
              <InboxPane humans={this.state.humans} 
                /* Utilisé sans Router */
                /*setSelectedConversation={this.setSelectedConversation}*/
              />
            </div>
            
            <div className="column">
              {/* Première lettre forcément en Majuscule */}
              {/* Utilisé dans l'alternative sans Router */}
              {/* <ConversationPane conversation={this.state.selectedConversation} /> */}
              {this.props.children || "Select conversation from the Inbox ! "}
            </div>
            
            <div className="column">
              {/* Première lettre forcément en Majuscule */}
              <StorePan stores={this.state.stores} />
            </div>

          </div>
        </div>
      )
  }
});

/* Composant externalisé sous './components/message' */  
/* var InboxPane = React.createClass({
  renderConvoSum: function(human){
    return <InboxItem key={human} index={human} details={this.props.humans[human]} />;
  },
  render : function() {
    return (
      <div id="inbox-pane" className="column">
        <h1>Inbox</h1>
        {Object.keys(this.props.humans).map(this.renderConvoSum)}
      </div>
    )
  }
});

var InboxItem = React.createClass({
  mixins: [PureRenderMixin],

  sortByDate: function(a, b) {
    return a.time>b.time ? -1 : a.time<b.time ? 1 : 0;
  },
  messageSummary: function(conversations){
    var lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  },
  render: function(){
    return (
      <div className="inbox-item">
        <Link to={'/conversation/' + encodeURIComponent(this.props.index)}>Conversation with {this.props.index}</Link> ({this.props.details.orders.sort(this.sortByDate)[0].status})
      </div>
    )
  }
}); */

/* var ConversationPane = React.createClass({
  loadSampleData: function(human){
    this.setState({conversation: sample.humans[human].conversations});
  },
  // Handle when User navigates from / to /conversation/:human
  componentWillMount: function() {
    this.loadSampleData(this.props.params.human);
  },
  // Handle when User navigates between conversations
  componentWillReceiveProps: function(nextProps) {
    this.loadSampleData(nextProps.params.human);
  },

  sortByDateDesc: function(a, b) {
    return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
  },

  renderMessage: function(val){
    return <Message who={val.who} text={val.text} key={val.time.getTime()} />;
  },
  render: function() {
    return (
      <div id="conversation-pane" className="column">
        <h1>Conversation</h1>
        <h3>{this.props.params.human}</h3>
        <div id="messages">
         {this.state.conversation.sort(this.sortByDateDesc).map(this.renderMessage)}
        </div>
      </div>
    )
  }
});

var Message = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return (
      <p className={this.props.who}><img src={require('./assets/' + this.props.who + '.png')} /> "{this.props.text}"</p>
    )
  }
}); */

/* var StorePan = React.createClass({
  renderStore: function(store){
    return <Store key={store} index={store} details={this.props.stores[store]} />;
  },
  render: function() {
    return (
      <div id="stores-pane" className="column">
        <h1>Stores & Ovens</h1>
        <ul>
          {Object.keys(this.props.stores).map(this.renderStore)}
        </ul>
      </div>
    )
  }
});

var Store = React.createClass({
  mixins: [PureRenderMixin],

  getCount: function(status){
    return this.props.details.orders.filter(function(n){ return n.status === status}).length;
  },
  render: function(){
    return (
      <div className="store">
        <div className="name">{this.props.index}</div>
        <div className="orders">
          <div><img src={require('./assets/order-confirmed.png')}/> {this.getCount("Confirmed")}</div>
          <div><img src={require('./assets/order-oven.png')}/> {this.getCount("In The Oven")}</div>
          <div><img src={require('./assets/order-delivered.png')}/> {this.getCount("Delivered")}</div>
        </div>
      </div>
    )
  }
}); */

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/conversation/:human" component={ConversationPane}></Route>
    </Route>
  </Router>
), document.getElementById('main'))