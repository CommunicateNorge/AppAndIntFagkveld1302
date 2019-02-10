(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(47)},23:function(e,t,n){},44:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),s=n(16),r=n.n(s),i=(n(23),n(3)),c=n(4),o=n(6),u=n(5),d=n(7),m=n(1),h=n(9),p=n.n(h),E=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"selectInstance",value:function(e,t){this.props.selectInstance(e)}},{key:"render",value:function(){var e=this;return l.a.createElement("article",{class:"card"},l.a.createElement("header",null,l.a.createElement("h3",null,this.props.title)),l.a.createElement("footer",null,this.props.items.map(function(t){return l.a.createElement("label",{key:t.instanceId,class:"stack"},l.a.createElement("input",{name:"stack",type:"radio",onClick:function(){return e.selectInstance(t.instanceId)}}),l.a.createElement("span",{class:"button toggle"},l.a.createElement("span",{class:"icon-file-code"}),"  ",t.instanceId))})))}}]),t}(l.a.Component),v=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).raiseExernalEventApproved=n.raiseExernalEventApproved.bind(Object(m.a)(Object(m.a)(n))),n.raiseExernalEventNotApproved=n.raiseExernalEventNotApproved.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"raiseExernalEventApproved",value:function(){this.props.eventRaisedHandler(2)}},{key:"raiseExernalEventNotApproved",value:function(){this.props.eventRaisedHandler(3)}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("article",{class:"card instance-deatils"},l.a.createElement("header",null,l.a.createElement("h3",null,this.props.item.instanceId)),"WaitingForManualReviewCompleted"===this.props.item.customStatus&&l.a.createElement("form",null,l.a.createElement("button",{onClick:this.raiseExernalEventApproved},"Approve message"),l.a.createElement("button",{onClick:this.raiseExernalEventNotApproved},"Reject message")),l.a.createElement("fieldset",{class:"flex one"},l.a.createElement("label",null,l.a.createElement("h4",null,"InstanceId")," ",l.a.createElement("input",{id:"InstanceId",disabled:"true",value:this.props.item.instanceId}),"  "),l.a.createElement("label",null,l.a.createElement("h4",null,"Created time"),l.a.createElement("input",{id:"createdTime",disabled:"true",value:this.props.item.createdTime}),"  "),l.a.createElement("label",null,l.a.createElement("h4",null,"Last updated time")," ",l.a.createElement("input",{id:"lastUpdatedTime",disabled:"true",value:this.props.item.lastUpdatedTime}),"  "),l.a.createElement("label",null,l.a.createElement("h4",null,"Run time status")," ",l.a.createElement("input",{id:"runtimestatus",disabled:"true",value:this.props.item.runtimeStatus}),"  "),l.a.createElement("label",null,l.a.createElement("h4",null,"Custom status"),l.a.createElement("input",{id:"runtimestatus",disabled:"true",value:this.props.item.customStatus}),"  "),l.a.createElement("label",null,l.a.createElement("h4",null,"Workflow input"),l.a.createElement("textarea",{id:"worflowInput",disabled:"true",value:JSON.stringify(this.props.item.input)}),"  "),l.a.createElement("label",null,l.a.createElement("h4",null,"Event history"),"  ",l.a.createElement("textarea",{id:"eventHistroy",disabled:"true",value:JSON.stringify(this.props.item.historyEvents)}),"  "))))}}]),t}(l.a.Component),b=(n(44),"https://tweetcheckerworkflow.azurewebsites.net"),f="wqxSZcmLwgaUzXnlZCNwgNN87hH2Syb8H3KFvHev0lDQ9bnYhrb4aw==",g=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={items:[],poster:"",text:"",error:null,isLoaded:!1,selected:null},n.handlePosterChange=n.handlePosterChange.bind(Object(m.a)(Object(m.a)(n))),n.handleTextChange=n.handleTextChange.bind(Object(m.a)(Object(m.a)(n))),n.handleSubmit=n.handleSubmit.bind(Object(m.a)(Object(m.a)(n))),n.handleSelectInstance=n.handleSelectInstance.bind(Object(m.a)(Object(m.a)(n))),n.handleEventRasied=n.handleEventRasied.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state,t=e.error,n=e.isLoaded,a=e.items,s=e.selected;e.handleSelectInstance,e.handleRaiseExernalEvent;return t?l.a.createElement("div",null,"Error: ",t.message):n?l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"flex four"},l.a.createElement("div",null,l.a.createElement("article",{class:"card"},l.a.createElement("header",null,l.a.createElement("h3",null,"Start new workflow")),l.a.createElement("footer",null,l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("label",{htmlFor:"poster"},"Created by"),l.a.createElement("input",{id:"poster",onChange:this.handlePosterChange,value:this.state.poster}),l.a.createElement("label",{htmlFor:"message"},"Message"),l.a.createElement("input",{id:"message",onChange:this.handleTextChange,value:this.state.text}),l.a.createElement("button",null,"Create new instance")))),l.a.createElement(E,{items:a.filter(function(e){return"Running"===e.runtimeStatus}),title:"Running workflows",selectInstance:this.handleSelectInstance}),l.a.createElement(E,{items:a.filter(function(e){return"Running"!==e.runtimeStatus}),title:"Completed workflows",selectInstance:this.handleSelectInstance})),l.a.createElement("div",{class:"two-third"},null!=s&&l.a.createElement(v,{item:s,eventRaisedHandler:this.handleEventRasied})))):l.a.createElement("div",null,"Loading...")}},{key:"handleEventRasied",value:function(e){var t=this.state.selected.instanceId+"/raiseEvent/ManualReviewCompleted",n=this.state.selected;n.customStatus="",p.a.post(b+"/runtime/webhooks/durabletask/instances/"+t+"?code="+f,{status:e}).then(function(e){this.setState({selected:n}),console.log(e)}).catch(function(e){console.log(e)})}},{key:"handleSelectInstance",value:function(e,t){var n=this;fetch(b+"/runtime/webhooks/durabletask/instances/"+e+"?showHistory=true&customStatus&code="+f).then(function(e){return e.json()}).then(function(e){n.setState({selected:e})},function(e){n.setState({isLoaded:!0,error:e})})}},{key:"handleTextChange",value:function(e){this.setState({text:e.target.value})}},{key:"handlePosterChange",value:function(e){this.setState({poster:e.target.value})}},{key:"handleSubmit",value:function(e){if(e.preventDefault(),this.state.text.length){var t={text:this.state.text,poster:this.state.poster,runtimeStatus:"Running"},n=this;p.a.post(b+"/api/function_HttpStart",t).then(function(e){t.instanceId=e.data.id,n.setState(function(e){return{items:e.items.concat(t),text:"",poster:""}}),console.log(e)}).catch(function(e){console.log(e)})}}},{key:"componentDidMount",value:function(){var e=this;console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_API_URL:"http://localhost:7071"})),fetch(b+"/runtime/webhooks/durabletask/instances?code="+f).then(function(e){return e.json()}).then(function(t){e.setState({isLoaded:!0,items:t})},function(t){e.setState({isLoaded:!0,error:t})})}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,2,1]]]);
//# sourceMappingURL=main.56cc749e.chunk.js.map