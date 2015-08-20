import React from 'react';
import { ObjectTree } from 'react-object-tree';

let value = {
  array1: [{
    name: "name1",
    value: "value1",
  }, {
    name: "name2",
    value: "value2",
  }, {
    name: "name3",
    value: "value3",
  }],
  number1: 123,
  object1: {
    prop1: "value1",
    prop2: true,
    prop3: [1, 2, 3]
  },
  bool1: false,
  null1: null,
};

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value };
  }

  evaluateValue() {
    const text = React.findDOMNode(this.refs.textarea).value;
    try {
      let value = JSON.parse(text);
      this.setState({ value });
    } catch(e) {
      alert(e.message);
    }
  }

  render() {
    const json = JSON.stringify(this.state.value, null, 4);
    return (
      <div>
        <p>
          <textarea
            ref='textarea'
            style={ { width: '100%' } }
            rows={ json.split(/\n/).length }
            defaultValue={ json }
          />
          <br />
          <button onClick={ this.evaluateValue.bind(this) }>Evaluate</button>
        </p>
        <ObjectTree value={ this.state.value } level={ 1 } />
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('root'));
