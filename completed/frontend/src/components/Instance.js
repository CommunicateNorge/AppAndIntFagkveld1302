
import React from 'react';




class Instance extends React.Component {


    constructor(props) {
        super(props);
        this.raiseExernalEventApproved = this.raiseExernalEventApproved.bind(this);
        this.raiseExernalEventNotApproved = this.raiseExernalEventNotApproved.bind(this);
        this.rewindInstance = this.rewindInstance.bind(this);

    }

    raiseExernalEventApproved() {
        this.props.eventRaisedHandler(2);
    }

    rewindInstance() {
        this.props.rewindInstanceHandler();
    }

    raiseExernalEventNotApproved() {
        this.props.eventRaisedHandler(3);
    }

    render() {

        return (
            <div>
                <article class="card instance-deatils">
                    <header>
                        <h3>{this.props.item.instanceId}</h3>
                    </header>
                    <fieldset class="flex one">
                      { this.props.item.customStatus === 'WaitingForManualReviewCompleted' &&
                        <button onClick={this.raiseExernalEventApproved}>Approve message</button>
                      }
                      { this.props.item.customStatus === 'WaitingForManualReviewCompleted' &&
                         <button onClick={this.raiseExernalEventNotApproved}>Reject message</button> 
                      }
                        <button onClick={this.rewindInstance}>
                                    Rewind instance
                        </button>
                        <label><h4>InstanceId</h4> <input
                            id="InstanceId"
                            disabled="true"
                            value={this.props.item.instanceId}
                        />  </label>

                        <label><h4>Created time</h4><input
                            id="createdTime"
                            disabled="true"
                            value={this.props.item.createdTime}
                        />  </label>

                        <label><h4>Last updated time</h4> <input
                            id="lastUpdatedTime"
                            disabled="true"
                            value={this.props.item.lastUpdatedTime}
                        />  </label>

                        <label><h4>Run time status</h4> <input
                            id="runtimestatus"
                            disabled="true"
                            value={this.props.item.runtimeStatus}
                        />  </label>


                        <label><h4>Custom status</h4><input
                            id="runtimestatus"
                            disabled="true"
                            value={this.props.item.customStatus}
                        />  </label>


                        <label><h4>Workflow input</h4><textarea
                            id="worflowInput"
                            disabled="true"
                            value={JSON.stringify(this.props.item.input)}
                        />  </label>

                        <label><h4>Event history</h4>  <textarea
                            id="eventHistroy"
                            disabled="true"
                            value={JSON.stringify(this.props.item.historyEvents)}
                        />  </label>

                    </fieldset>

                </article>
            </div>
        );
    }
}



export default Instance;