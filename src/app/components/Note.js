import React from 'react/addons';
import BaseComponent from './BaseComponent';


/*
 * @class Note
 * @extends React.Component
 */
class Note extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };

    this._bind(
      'edit', 
      'save', 
      'remove', 
      'renderDisplay', 
      'renderForm'
    );

  }

  componentWillMount () {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150) + 'px',
      top: this.randomBetween(0, window.innerHeight - 150) + 'px',
      transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
    }
  }
  
  componentDidMount () {

    $(React.findDOMNode(this)).draggable();
  }

  randomBetween (min, max) {
      return (min + Math.ceil(Math.random() * max));
  }

  edit () {
    this.setState({editing: true});
  }

  save () {
    this.props.onChange(React.findDOMNode(this.refs.newText).value, this.props.index);
    this.setState({editing: false});
  }

  remove () {
    this.props.onRemove(this.props.index);
  }

  renderDisplay () {
    return (
      <div className="note"
          style={this.style}>
          <p>{this.props.children}</p>
          <span>
              <button onClick={this.edit}
                      className="btn btn-primary glyphicon glyphicon-pencil"/>
              <button onClick={this.remove}
                      className="btn btn-danger glyphicon glyphicon-trash"/>
          </span>
      </div>
    );
  }

  renderForm () {
    return (
      <div className="note" style={this.style}>
      <textarea ref="newText" defaultValue={this.props.children} 
      className="form-control"></textarea>
      <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
      </div>
    );
  }

  render () {
    if (this.state.editing) {
          return this.renderForm();
      }
      else {
          return this.renderDisplay();
      }
  }

}

// Prop types validation
// Item.propTypes = {
//   item: React.PropTypes.object.isRequired,
// };

export default Note;

