import React, { Component } from 'react';
import axios from 'axios';
import InstanceList from './components/InstanceList'
import Instance from './components/Instance'
import './App.css';

const REACT_APP_API_URL="http://localhost:7071";
const FUNCTION_APP_KEY = "<insert key here>"


class InstanceManagerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], poster: '', text: '', error: null,
      isLoaded: false, selected: null
    };
    this.handlePosterChange = this.handlePosterChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectInstance = this.handleSelectInstance.bind(this);
    this.handleEventRasied = this.handleEventRasied.bind(this);
   
  }

  render() {

    const { error, isLoaded, items, selected, handleSelectInstance, handleRaiseExernalEvent,handleRewindInstance } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div className="flex four">
         
            <div>
              <article class="card">
                <header>
                  <h3>Start new workflow</h3>
                </header>
                <footer>

                  <form onSubmit={this.handleSubmit}>
                    <label htmlFor="poster">
                      Created by
                </label>

                    <input
                      id="poster"
                      onChange={this.handlePosterChange}
                      value={this.state.poster}
                    />
                    <label htmlFor="message">
                      Message
                </label>

                    <input
                      id="message"
                      onChange={this.handleTextChange}
                      value={this.state.text}
                    />
                    <button>
                      Create new instance
                   </button>
                  </form>
                </footer>
              </article>
              <InstanceList items={items.filter(item => item.runtimeStatus === "Running")} title="Running workflows" selectInstance={this.handleSelectInstance}></InstanceList>
              <InstanceList items={items.filter(item => item.runtimeStatus === "Completed")} title="Completed workflows" selectInstance={this.handleSelectInstance}></InstanceList>
              <InstanceList items={items.filter(item => item.runtimeStatus === "Failed")} title="Failed workflows" selectInstance={this.handleSelectInstance}></InstanceList>
            </div>
            <div class="two-third">
              {selected != null &&
                <Instance item={selected} eventRaisedHandler={this.handleEventRasied} rewindInstanceHandler={this.handleRewindInstance}></Instance>
              }
            </div>
          </div>






        </div>
      );

    }
  }


  handleEventRasied(status) {

    var instance = this.state.selected.instanceId + "/raiseEvent/ManualReviewCompleted";
    var updatedSelected = this.state.selected;
    var self = this;
    updatedSelected.customStatus = "";
    axios.post(REACT_APP_API_URL+'/runtime/webhooks/durabletask/instances/' + instance + "?code=" + FUNCTION_APP_KEY, { 'status': status, 'approvedBy' : "admin" })
      .then(function (response) {

        self.setState({
          selected: updatedSelected
        });

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSelectInstance(param, e) {
    
    fetch(REACT_APP_API_URL+"/runtime/webhooks/durabletask/instances/" + param + "?showHistory=true&code=" + FUNCTION_APP_KEY)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            selected: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  handleTextChange(e) {


    this.setState({ text: e.target.value });
  }


  handlePosterChange(e) {


    this.setState({ poster: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newInstnace = {
      text: this.state.text,
      poster: this.state.poster,
      runtimeStatus : "Running"
    };

    var self = this;
    axios.post(REACT_APP_API_URL+'/api/function_HttpStart', newInstnace)
      .then(function (response) {
        newInstnace.instanceId = response.data.id
        self.setState(state => ({
          items: state.items.concat(newInstnace),
          text: '',
          poster: ''
        }));
        
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });



  }




  componentDidMount() {

    console.log(process.env);
    fetch(REACT_APP_API_URL+"/runtime/webhooks/durabletask/instances?code=" + FUNCTION_APP_KEY)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }



}

export default InstanceManagerApp;
