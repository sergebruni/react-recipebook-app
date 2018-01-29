import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalBody } from 'reactstrap';

class RecipeModal extends React.Component {

  constructor (props) {
    super(props)
    
    this.state = {}
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.cancel = this.cancel.bind(this)
  }
  
  componentDidUpdate(prevProps) {
    const { updating, recipes } = this.props

    if (this.props.updating === prevProps.updating) { return }
    
    const edit = recipes[updating] || {}
  
    this.setState({
      name: edit.name,
      ingredients: (edit.ingredients || []).join(',')
    })
  }
  
  handleChange (name) {
    return e => {
      this.setState({
        [name]: e.target.value
      })    
    }
  }
  
  handleSave () {
    const { updating, saveRecipe, updateRecipe } = this.props
    const { name, ingredients = '' } = this.state
    
    const data = {
      name,
      ingredients: ingredients.split(',').filter(i => i).map(t => t.trim())
    }
    
    if (updating) {
      updateRecipe(data, updating)
    } else {
     saveRecipe(data) 
    }
  }
  
  cancel () {
    this.props.toggleModal()
  }
  
  render () {
    const { isOpen, toggleModal } = this.props
   
    return (
      <Modal isOpen={isOpen}>
        <ModalBody>
          <form onSubmit={this.handleSave}>
            <div className="form-group">
              <input
                className="form-control"
                value={this.state.name}
                onChange={this.handleChange('name')}
                type="text" id="name" 
                placeholder="Name"/>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                value={this.state.ingredients}
                onChange={this.handleChange('ingredients')}
                id="ingredients" 
                placeholder="Ingredients separate with coma ','" />   
            </div>    
            <div className="button-bar">
              <button className="btn-success">Save</button>
              <button type="button" className="btn-secondary" onClick={this.cancel}>Cancel</button>
            </div> 
          </form>
        </ModalBody>
      </Modal>
    )
  }
}

export default RecipeModal;