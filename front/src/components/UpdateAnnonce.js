import React from 'react'
import axios from 'axios'
import { Message, Form } from 'semantic-ui-react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import classnames from '../helpers'

const preset = 's24frout'
const URL = 'https://api.cloudinary.com/v1_1/dkhupnzr8/image/upload'

class UpdateAnnonce extends React.Component {
    state = {
        address: this.props.user.annonce.address || "",
        titre: this.props.user.annonce.titre || "",
        period: this.props.user.annonce.period || "",
        image: this.props.user.annonce.image || "",
        description: this.props.user.annonce.description || "",
        file: null,
        errorMessage: '',
        latitude: null,
        longitude: null,
        isGeocoding: false,
    }

    updateInput = e => {
        this.setState({ [e.target.name]: e.target.value })
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

    editAnnonce = e => {
        e.preventDefault()
        axios
            .put('/annonce/' + this.props.user.annonce._id, this.state)
            .then(res => {
                this.setState({ annonce: res.data });
                this.props.setUser()
                    .then(() =>
                        this.props.history.push('/annonce')
                    )
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
            <div className="ui container">
                <Message
                    attached
                    header='Vous pouvez changer les informations suivants pour modifier votre annonce'
                />
                    <Form className='attached fluid segment'>
                        <Form.Input
                            icon='heading'
                            iconPosition='left'
                            name='titre'
                            label='Titre'
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
                            label='Période de disponiblité'
                            type='text'
                            onChange={
                                this.updateInput
                            }
                            value={
                                this.state.period
                            }
                            />    
                        <Form.Group widths='equal'>
                            <Form.Input fluid
                                icon='folder'
                                iconPosition='left'
                                label='Choisissez une image'
                                type='file'
                                onChange={
                                    e => { this.onChange(e.target.files[0]) }
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
                            name='description'
                            label='Description'
                            type='text'
                            onChange={
                                this.updateInput
                            }
                            value={
                                this.state.description
                            } />
                    <div className="ui huge green labeled icon button"
                        onClick={
                            this.editAnnonce
                        }>
                        <i className="edit icon"></i>
                        Modifier
                    </div>
                </Form>
                <Message attached='bottom' />
            </div>
        )
    }
}

export default UpdateAnnonce
