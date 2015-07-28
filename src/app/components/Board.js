import React from 'react/addons';
import BaseComponent from './BaseComponent';
import Note from './Note';


/*
 * @class Note
 * @extends React.Component
 */
class Board extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }

    this._bind(
      'update', 
      'add', 
      'remove', 
      'nextId', 
      'eachNote'
    );

  }

  nextId () {
      this.uniqueId = this.uniqueId || 0;
      return this.uniqueId++;
  }
componentWillMount () {
        var self = this;
        if(this.props.count) {
            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
                this.props.count + "&start-with-lorem=1&callback=?", function(results){
                    results[0].split('. ').forEach(function(sentence){
                        self.add(sentence.substring(0,40));
                    });
                });
        }
    }
add (text) {
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({notes: arr});
    }
update (newText, i) {
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({notes:arr});
    }
remove (i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({notes: arr});
    }
eachNote (note, i) {
        return (
                <Note key={note.id}
                    index={i}
                    onChange={this.update}
                    onRemove={this.remove}
                >{note.note}</Note>
            );
    }
render () {

        return (<div className="board">
                    {this.state.notes.map(this.eachNote)}
                    <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                            onClick={this.add.bind(null, "New Note")}></button>
            </div>

        );
    }  
  
}

// Prop types validation
Board.propTypes = {
  //cart: React.PropTypes.object.isRequired,
  count: function(props, propName) {
      if (typeof props[propName] !== "number"){
          return new Error('The count property must be a number');
      }
      if (props[propName] > 100) {
          return new Error("Creating " + props[propName] + " notes is ridiculous");
      }
  }
};

export default Board;
