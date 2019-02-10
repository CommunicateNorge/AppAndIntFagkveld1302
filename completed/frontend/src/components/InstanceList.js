
import React from 'react';




class InstanceList extends React.Component {

  

  selectInstance (id,e) {
    this.props.selectInstance(id);
  }

/*
    render() {
          return (
            <ul>
              {this.props.items.map(item => (
                <li key={item.instanceId} >

                <button onClick={()=>this.selectInstance(item.instanceId)}>
                        {item.instanceId}
                </button>
               
                </li>
              ))}
            </ul>
        
          );
        }

        */

        render() {
          return (
            <div>
              <h3>{this.props.title}</h3>
              {this.props.items.map(item => (
                 <label key={item.instanceId} class="stack">
                 <input name="stack" type="radio" onClick={()=>this.selectInstance(item.instanceId)}/>
                 <span class="button toggle" >
                   <span class="icon-file-code"></span>  {item.instanceId}
                 </span>
                 </label>
              ))}
            </div>
        
          );
        }
      
  }

  
  export default InstanceList;





