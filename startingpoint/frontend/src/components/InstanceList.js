
import React from 'react';




class InstanceList extends React.Component {



  selectInstance(id, e) {
    this.props.selectInstance(id);
  }


  render() {
    return (
      <article class="card">
        <header>
          <h3>{this.props.title}</h3>
        </header>
        <footer>
          {this.props.items.map(item => (
            <label key={item.instanceId} class="stack">
              <input name="stack" type="radio" onClick={() => this.selectInstance(item.instanceId)} />
              <span class="button toggle" >
                <span class="icon-file-code"></span>  {item.instanceId}
              </span>
            </label>
          ))}
        </footer>
      </article>

    );
  }

}



export default InstanceList;





