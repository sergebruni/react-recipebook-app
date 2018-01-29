import React from 'react';

import './styles.scss';

class RecipeContent extends React.Component {
  constructor (props) {
    super(props)
    
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }
  
  handleUpdate () {
    const { id, updateRecipe } = this.props
    
    updateRecipe(id)
  }
  
  handleDelete () {
    const { id, deleteRecipe } = this.props
    
    deleteRecipe(id)
  }
  
  render () {
    const { recipe, deleteRecipe } = this.props
    
    return (
      <div className="recipe-content">
        <div className="button-bar">
          <button className="btn-info" onClick={this.handleUpdate}>
            <i className="fa fa-pencil" />
          </button>
          <button className="btn-danger" onClick={this.handleDelete}>
            <i className="fa fa-trash" />
          </button>
        </div>
        <h2>{recipe.name}</h2>
        <div className="ingredients-list">
          <ul>
            {recipe.ingredients.map((ingredient, i) => 
              <li key={i}>{ingredient} </li>
            )}
          </ul>
        </div>        
      </div>
    )
  } 
}

export default RecipeContent;