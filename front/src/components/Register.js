import React from "react";
import { Form, Message, Icon, Button } from 'semantic-ui-react' 
import { Link } from 'react-router-dom'

const preset = 's24frout'
const URL = 'https://api.cloudinary.com/v1_1/dkhupnzr8/image/upload'

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
    disableBtn: true
  };

  //whenever we change input, it will recreate the state
  updateInput = async e => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    //setState is await (to wait for the reply)
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
    
    //button will be enable only after all the input will be filled
    if (nonEmptyFields && passwords) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
    
  };
  
  checkNonEmptyFields = () => {
    const { firstname, lastname, email, password, passwordCheck, address } = this.state;
    if (
      this.nonEmptyString(firstname) &&
      this.nonEmptyString(lastname) &&
      this.nonEmptyString(email) &&
      this.nonEmptyString(password) &&
      this.nonEmptyString(passwordCheck) &&
      this.nonEmptyString(address)
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

    onChange = file => this.setState({ file })

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
          header='Bienvenue dans notre site!'
          content='Remplir les champs ci-dessous pour créer un compte'
        />
          <Form className='attached fluid segment'>
            <Form.Group widths='equal'>
              <Form.Input fluid
                icon='user'
                iconPosition='left'
                name='firstname'
                label='Nom'
                placeholder='Nom' 
                type='text' 
                onChange={
                  this.updateInput
                }
                value={
                  this.state.firstname
                }  />
              <Form.Input fluid
                icon='user'
                iconPosition='left' 
                name='lastname'
                label='Prénom'
                placeholder='Prénom' 
                type='text' 
                onChange={
                  this.updateInput
                }
                value={
                  this.state.lastname
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
            <Form.TextArea
                icon='home'
                iconPosition='left'
                name='address'
                label='Address'
                placeholder='Votre address' 
                type='text' 
                onChange={
                  this.updateInput
                }
                value={
                  this.state.address
                }  />
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