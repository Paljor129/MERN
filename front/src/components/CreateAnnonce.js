import React from 'react'
import { Message, Form, Button } from 'semantic-ui-react'

const preset = 's24frout'
const URL = 'https://api.cloudinary.com/v1_1/dkhupnzr8/image/upload'

class CreateAnnonce extends React.Component {
    state = {
        address: "",
        period: "",
        titre: "",
        image: "",
        description: "",
        file: null,
        disableBtn: true
    }

    // updateLocation = loc => e => {
    //     this.setState({[loc]: {...this.state.location,[e.target.name]: e.target.value }})
    // }
    updateInput = async e => {
        console.log(this.state[e.target.name])
        const newState = {};
        newState[e.target.name] = e.target.value;
        await this.setState(newState);
        this.canSendForm();
    }

    nonEmptyString = field => {
        if (typeof field === "string" && field !== "") return true;
        else return false;
    };

    canSendForm = () => {
        const nonEmptyFields = this.checkNonEmptyFields();
        if (nonEmptyFields) {
            this.setState({ disableBtn: false });
        } else {
            this.setState({ disableBtn: true });
        }

    };

    checkNonEmptyFields = () => {
        const { address, period, titre, description } = this.state;
        if (
            this.nonEmptyString(address) &&
            this.nonEmptyString(period) &&
            this.nonEmptyString(titre) &&
            this.nonEmptyString(description)
        ) {
            return true;
        } else {
            return false;
        }
    };

    createAnnonce = e => {
        e.preventDefault()
        const { address, period, titre, image, description } = this.state
        fetch('/create/annonce', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ address, period, titre, image, description, auteur: this.props.auteur })  
        })
        .then(res => res.json())
        .then(res => {
            this.props.setAnnonce({annonce: res})
            this.props.history.push('/')
        })
        .catch(err => {
            console.log(err);
        })
    }

    imageUpload = e => {
        this.state.file
            ? this.fileUpload(this.state.file).then(publicId => {
                console.log('publicId : ', publicId)
                publicId && this.setState({ publicId, error: null })
            })
            : this.setState({ error: 'Vous n\'avez  pas selectionné le fichier' })
    }

    onChange = file => this.setState({ file })

    handleErrors = response => {
        if(!response.ok) {
            this.setState({ url: null, error: response.statusText })
        }
        return response
    }

    fileUpload(file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset)

        return(
            fetch(URL, { method: 'POST', body: formData })
            .then(this.handleErrors)
            .then(r => r.json())
            .then(data => this.state.image = data.public_id)
        )
    }

    render() {
        return (
            <div className="ui container">
                <Message
                    attached
                    header='Formulaire pour créer votre annonce'
                />
                <Form className='attached fluid segment'>
                    <Form.TextArea
                        icon='location arrow'
                        iconPosition='left'
                        name='address'
                        label='Address'
                        placeholder='Votre address de travail'
                        type='text'
                        onChange={
                            this.updateInput
                        }
                        value={
                            this.state.address
                        } />
                    <Form.Input
                        icon='heading'
                        iconPosition='left'
                        name='titre'
                        label='Titre'
                        placeholder='Titre pour votre annonce'
                        type='text'
                        onChange={
                            this.updateInput
                        }
                        value={
                            this.state.titre
                        } />
                    <Form.Input
                        icon='calendar alternate'
                        iconPosition='left'
                        name='period'
                        label='Période de disponiblité'
                        placeholder='Par example le mois de janvier'
                        type='text'
                        onChange={
                            this.updateInput
                        }
                        value={
                            this.state.period
                        } />
                    <Form.Group widths='equal'>
                        <Form.Input fluid
                            icon='folder'
                            iconPosition='left'
                            label='Choisissez une image de votre chambre'
                            type='file'
                            onChange={
                                e => { this.onChange(e.target.files[0]) }
                            }
                            onSubmit={
                                this.onFormSubmit
                            } />
                        <Form.Input fluid
                            label='Faire upload'>
                            <div className="ui big green labeled icon button"
                                onClick={
                                    this.imageUpload
                                }>
                                <i className="upload icon"></i>
                                Upload l'image
                                </div>
                        </Form.Input>
                    </Form.Group>
                    <Form.TextArea
                        name='description'
                        label='Description'
                        placeholder='Description de votre chambre'
                        type='text'
                        onChange={
                            this.updateInput
                        }
                        value={
                            this.state.description
                        } />
                    <Button
                        size='big'
                        color='blue'
                        disabled={this.state.disableBtn}
                        onClick={
                            this.createAnnonce
                        }>
                        Créer l'annonce
                    </Button>
                </Form>
                <Message attached='bottom' />
            </div>
        )
    }
}

export default CreateAnnonce
                