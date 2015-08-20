import React from 'react';
import classnames from 'classnames';
import typeName from 'type-name';

class ObjectNode extends React.Component {

  constructor(props) {
    super(props);
    this.state = { opened: false };
  }

  toggleNode(e) {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    const { value } = this.props;
    const type = typeName(value);
    return (
      /^(Array|Object)$/.test(type) ? this.renderObject(value, type) :
      /^(number|string|boolean|null)$/.test(type) ? this.renderValue(value, type) :
      this.renderOther(value, type)
    );
  }

  renderObject(obj, type) {
    const { path } = this.props;
    const { opened } = this.state;
    let iter =
      type === 'Array' ?
      obj.map((v, i) => ({ prop: i, value: v })) :
      Object.keys(obj).map((prop) => ({ prop, value: obj[prop] }));
    return (
      <div className='object-node'>
        <div className='object-label' onClick={ this.toggleNode.bind(this) }>
          <i className={ classnames('toggle-icon', { opened }) } />
          <span className='object-type'>{ '(' + type + ')' }</span>
        </div>
        {
          opened ?
          <table>
            { iter.map(({ prop, value }) => {
                const cpath =
                  type === 'Array' ? `${path}[${prop}]` :
                  path ? `${path}.${prop}` :
                  prop;
                return (
                  <tr>
                    <th className='prop-name'>{ prop }</th>
                    <td className='prop-value'>
                      <ObjectNode value={ value } path={ cpath } />
                    </td>
                  </tr>
                );
            })}
          </table> :
          null
        }
      </div>
    );
  }

  renderValue(value, type) {
    return (
      <div className='object-node'>
        <span className={ classnames('object-value', type) }>{ JSON.stringify(value) }</span>
      </div>
    );
  }

  renderOther(value, type) {
    return (
      <div className='object-node'>
        <div className='object-label' onClick={ this.toggleNode.bind(this) }>
          <span className='object-type'>{ '(' + type + ')' }</span>
        </div>
      </div>
    );
  }
}


export default class ObjectTree extends React.Component {

  render() {
    const { className, value } = this.props;
    return (
      <div className={ classnames('object-tree', className) }>
        <ObjectNode value={ value } path='' />
      </div>
    );
  }

}
