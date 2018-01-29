import React from 'react';

import { TransitionGroup } from 'react-transition-group'

import RecipeList from '../RecipeList/RecipeList'
import RecipeContent from '../RecipeContent/RecipeContent'
import RecipeModal from '../RecipeModal/RecipeModal'

import { Fade } from '../RecipeTransitions/RecipeTransitions'

import './styles.scss';

class ReactContainer extends React.Component {
  constructor (props) {
    super(props)
    
    this.title = 'React Recipe Book App'
    
    this.state = {
      recipes: [],
      activeRecipe: null,
      updating: false,
      modalOpen: false
    }
    
    this.viewRecipe = this.viewRecipe.bind(this)
    this.saveRecipe = this.saveRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.updateRecipe = this.updateRecipe.bind(this)
    this.markAsUpdate = this.markAsUpdate.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
  
  componentDidMount () {
    const cachedRecipes = localStorage.getItem('recipes')
    const defaultRecipes = [
      {
        name: 'Arepas', 
        ingredients: ['white corn flour', 'salt', 'water']
      },
      {
        name: 'Arroz con leche', 
        ingredients: ['milk', 'white rice', 'sugar', 'cinamon']
      },
      {
        name: 'Ensalada pico de gallo', 
        ingredients: ['2 tomatoes', '1/2 onion', 'garlic clove', 'lemon', 'coriander', 'salt', 'pepper']
      }
    ]
    
    let recipes = []
    if (cachedRecipes) {
      try {
        recipes = JSON.parse(cachedRecipes)
      } catch (e) {
        console.warn('Invalid JSON document')
        recipes = defaultRecipes
      }
    } else {
      recipes = defaultRecipes
    }
    
    this.setState({ recipes })
  }
  
  viewRecipe (i) {
    this.setState({ activeRecipe: i })
  }
  
  saveRecipe (data) {
    this.setState({
      modalOpen: false,
      updating: null,
      recipes: [
        ...this.state.recipes,
        data
      ]
    }, () => {
      localStorage.setItem(
        'recipes', 
        JSON.stringify(this.state.recipes)
      )
    })
  }
  
  updateRecipe (data, id) {
    const { recipes } = this.state
    
    this.setState({
      modalOpen: false,
      updating: null,
      recipes: [
        ...recipes.slice(0, id),
        data,
        ...recipes.slice(id + 1),
      ]
    }, () => {
      localStorage.setItem(
        'recipes', 
        JSON.stringify(this.state.recipes)
      )
    })
  }
  
  deleteRecipe (i) {
    const { recipes } = this.state
    
    this.setState({
      activeRecipe: null,
      recipes: [
        ...recipes.slice(0, i),
        ...recipes.slice(i + 1),
      ]
    }, () => {
      localStorage.setItem(
        'recipes', 
        JSON.stringify(this.state.recipes)
      )
    })
  }
  
  toggleModal () {
    this.setState({ modalOpen: !this.state.modalOpen })
  }
  
  markAsUpdate (id) {
    this.setState({
      updating: id,
      modalOpen: true
    })
  }
  
  render () {
    const { recipes, activeRecipe, modalOpen, updating } = this.state
    
    return (
      <div className="container">
        <h1>{this.title}</h1>
        
        <div className="row">
          <div className="col-md">
            <RecipeList
              recipes={recipes}
              activeRecipe={activeRecipe}
              openModal={this.toggleModal}
              viewRecipe={this.viewRecipe} />  
          </div>
          
          <div className="col-md">
            <TransitionGroup>
              {activeRecipe !== null &&
                <Fade>
                  <RecipeContent
                    id={activeRecipe}
                    recipe={recipes[activeRecipe]}
                    updateRecipe={this.markAsUpdate}
                    deleteRecipe={this.deleteRecipe} /> 
                </Fade>
              }
            </TransitionGroup>
          </div>         
        </div>
        
        <RecipeModal
          isOpen={modalOpen}
          toggleModal={this.toggleModal}
          updating={updating}
          recipes={recipes}
          saveRecipe={this.saveRecipe}
          updateRecipe={this.updateRecipe}/>
      </div>
    )
  }
}

export default ReactContainer;