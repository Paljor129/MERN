import React from "react";
import { Form, Message, Icon, Button } from 'semantic-ui-react' 
import { Link } from 'react-router-dom'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import classnames from '../helpers'
import Popup from 'react-popup';

const preset = 's24frout'
const URL = 'https://api.cloudinary.com/v1_1/dkhupnzr8/image/upload'

const options = [
  {
    key: 'm',
    text: 'Monsieur',
    value: 'male'
  }, {
    key: 'f',
    text: 'Madame',
    value: 'female'
  }
]

class Register extends React.PureComponent {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordCheck: "",
    address: "",
    image: "",
    file: null,
    age: "",
    disableBtn: true,
    errorMessage: "",
  };

  updateInput = async e => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    await this.setState(newState);
    this.canSendForm();
  };

  nonEmptyString = field => {
    if (typeof field === "string" && field !== "") return true;
    else return false;
  };

  canSendForm = () => {
    const nonEmptyFields = this.checkNonEmptyFields();
    const passwords = this.checkPassword(
      this.state.password,
      this.state.passwordCheck
    );
    if (nonEmptyFields && passwords) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
    
  };
  checkNonEmptyFields = () => {
    const { firstname, lastname, email, password, passwordCheck, age } = this.state;
    if (
      this.nonEmptyString(firstname) &&
      this.nonEmptyString(lastname) &&
      this.nonEmptyString(email) &&
      this.nonEmptyString(password) &&
      this.nonEmptyString(passwordCheck) &&
      this.nonEmptyString(age)
    ) {
      return true;
    } else {
      return false;
    }
  };

  checkPassword = (password, passwordCheck) => {
    if (password === passwordCheck) return true;
    else return false;
  };
  
  handleChange = address => {
    this.setState({
      address,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: ''
    });
  };

  handleError = (status, clearSuggestions) => {
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };
  
  handleRegister = e => {
    e.preventDefault();
    const { firstname, lastname, email, password, address, image } = this.state;
    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ firstname, lastname, email, password, address, image })
    })
    .then(res => res.json())
    .then(res => {
      this.props.connect(res)
      this.props.history.push('/createAnnonce')
      Popup.alert('Vous venez de créer un compte')
    })
    .catch(error => {
      console.log(error);
    })
  }

    imageUpload = e => {
      this.state.file
        ? this.fileUpload(this.state.file).then(publicId => {
          publicId && this.setState({ publicId, error: null })
        })
        : this.setState({ error: 'Vous n\'avez  pas selectionné le fichier' })
    }

    onChange = file => { this.setState({ file }) }

    handleErrors = response => {
      if (!response.ok) {
        this.setState({ url: null, error: response.statusText })
      }
      return response
    }

    fileUpload(file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', preset)

      return (
        fetch(URL, { method: 'POST', body: formData })
          .then(this.handleErrors)
          .then(r => r.json())
          .then(data => this.state.image = data.public_id)
      )
    }

  render() {
    return (
      <div className='ui container'>
        <Message
          attached
          header='Bienvenue dans notre site !'
          content='Remplir les champs ci-dessous pour créer un compte (Tous les champs sont obligatoires)'
        />
          <Form className='attached fluid segment'>
            <Form.Group widths='equal'>
              <Form.Input fluid
                icon='user'
                iconPosition='left'
                name='lastname'
                label='Nom'
                placeholder='Nom' 
                type='text' 
                onChange={
                  this.updateInput
                }
                value={
                  this.state.lastname
                }  />
              <Form.Input fluid
                icon='user'
                iconPosition='left' 
                name='firstname'
                label='Prénom'
                placeholder='Prénom' 
                type='text' 
                onChange={
                  this.updateInput
                }
                value={
                  this.state.firstname
                }  />
            </Form.Group>
            <Form.Input 
                icon='envelope'
                iconPosition='left'
                name='email'
                label='Email'
                placeholder='joe@cool.com' 
                type='email' 
                onChange={
                  this.updateInput
                }
                value={
                  this.state.email
                }  />
            <Form.Group widths='equal'>
              <Form.Input fluid
                icon='lock'
                iconPosition='left'
                name='password'
                label='Mot de passe'
                placeholder='Mot de passe' 
                type='password' 
                onChange={
                  this.updateInput
                }
                value={
                  this.state.password
                }  />
              <Form.Input fluid
                icon='lock'
                iconPosition='left'
                name='passwordCheck'
                label='Confirmez votre mot de passe'
                placeholder='Confirmez votre mot de passe' 
                type='password' 
                onChange={
                  this.updateInput
                }
                value={
                  this.state.passwordCheck
                }  />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input fluid
                  icon='folder'
                  iconPosition='left'
                  label='Choisissez une image pour votre profil'
                  type='file'
                  onChange={
                    e => { this.onChange(e.target.files[0]) }
                  }
                  onSubmit={
                    this.onFormSubmit
                  } />
                <Form.Input fluid
                  label='Faire upload'>
                  <div className="ui big blue labeled icon button"
                    onClick={
                      this.imageUpload
                    }>
                    <i className="upload icon"></i>
                    Upload l'image
                  </div>
                </Form.Input>
              </Form.Group>

            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
              onError={this.handleError}
              shouldFetchSuggestions={this.state.address.length > 2}
            >

              {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                return (
                  <div className="search-bar-container">
                    <div className="search-input-container">
                      <label>Adresse</label>
                      <input
                        {...getInputProps({
                          name: 'address',
                          placeholder: 'Votre adresse de travail...',
                          className: 'search-input',
                        })}
                      />
                    </div>
                    {suggestions.length > 0 && (
                      <div className="autocomplete-container">
                        {suggestions.map(suggestion => {
                          const className = classnames('suggestion-item', {
                            'suggestion-item--active': suggestion.active,
                          });

                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, { className })}
                            >
                              <strong>
                                {suggestion.formattedSuggestion.mainText}
                              </strong>{' '}
                              <small>
                                {suggestion.formattedSuggestion.secondaryText}
                              </small>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }}
            </PlacesAutocomplete>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
              <Form.Input fluid 
                label='Age' 
                placeholder='Votre age' 
                name='age'
                onChange={
                  this.updateInput
                }
                value={
                  this.state.age
                } />
            </Form.Group>
            <Button
              size='big'
              color='green'
              disabled={this.state.disableBtn}
              onClick={
                this.handleRegister
              }>
              <Icon className='signup'></Icon>
              S'inscrire
            </Button> 
          </Form>
          <Message attached='bottom' warning>
            <Icon name='help' />
            Deja crée un compte?&nbsp;<Link to='/login'>Se connecter</Link>&nbsp;ici.
          </Message>

        
      </div>
    );
  }
}


export default Register;