import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup } from 'react-transition-group'

import Fade from './CSSTransition'

class RecipeList extends React.Component {  
  render () {
    const { recipes, activeRecipe, viewRecipe, openModal } = this.props
    
    return (
      <div className="recipe-list">
        <button className="btn-success" onClick={openModal}>
          <i className="fa fa-plus" />
        </button>
        <ul>
          <TransitionGroup>
          {recipes.map((recipe, i) => {
		    const classActive = activeRecipe === i ? 'active' : '';
		    return (
	            <Fade>                       
	              <li key={i}>
	                <a href="#" className={classActive} key={i} onClick={() => viewRecipe(i)}>{recipe.name}</a>
	              </li>
	            </Fade>
		    )}
          )}
          </TransitionGroup>
        </ul>
      </div>
    )
  }
}

export default RecipeList;