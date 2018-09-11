import React from 'react'
import { Message, Form, Button } from 'semantic-ui-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import classnames from '../helpers'

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
        disableBtn: true,
        errorMessage: '',
        latitude: null,
        longitude: null,
        isGeocoding: false,
    }

    updateInput = async e => {
        const newState = {};
        newState[e.target.name] = e.target.value;
        await this.setState(newState);
        this.canSendForm();
    }

    handleChange = address => {
        this.setState({
            address,
            latitude: null,
            longitude: null,
            errorMessage: '',
        });
    };

    handleSelect = selected => {
        this.setState({ isGeocoding: true, address: selected });
        geocodeByAddress(selected)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                this.setState({
                    latitude: lat,
                    longitude: lng,
                    isGeocoding: false,
                });
            })
            .catch(error => {
                this.setState({ isGeocoding: false });
            });
    };

    handleCloseClick = () => {
        this.setState({
            address: '',
            latitude: null,
            longitude: null,
        });
    };

    handleError = (status, clearSuggestions) => {
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };

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
        const { period, titre, description } = this.state;
        if (
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
        fetch('/annonce/', {
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

                    <Form.Input
                        icon='calendar alternate'
                        iconPosition='left'
                        name='period'
                        label='Période recherchée (Uniquement pour information)'
                        placeholder='Par exemple De 1-jan-2019 à 20-mars-2019'
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
                