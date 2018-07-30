import React from 'react'
import '../styles/Global.css'

import {
    Form,
    FormGroup,
    Col,
    ControlLabel,
    FormControl,
    Button
} from 'react-bootstrap';

// import {
//     Image,
//     Video,
//     Transformation,
//     CloudinaryContext
// } from 'cloudinary-react'

const cloudName = 'dkhupnzr8'
const preset = 's24frout'
const URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

class CreateAnnonce extends React.Component {
    state = {
        location: { cordinates: [], address: "" },
        location1: { cordinates: [], address: "" },
        period: "",
        titre: "",
        // auteur: this.props.auteur,
        file: null
    }

    updateLocation = loc => e => {

        this.setState({[loc]: {...this.state.location,[e.target.name]: e.target.value }})
    }

    updateInput = e => {
        console.log("e target name : ", e.target.name);
        console.log("e target value : ", e.target.value);
        console.log(this.state[e.target.name])
        this.setState({[e.target.name] : e.target.value})

    }

    handleCreateAnnonce = e => {
        e.preventDefault()

        const { location, location1, period, titre } = this.state
        console.log("auteur test : ", this.props.auteur);
        
        fetch('/create/createAnnonce', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ location, location1, period, titre, auteur: this.props.auteur })
            
        })
        //here res is just the reponse we got and we like to get the response in json format
        .then(res => res.json())
        .then(res => {
            console.log("res log",res)
            this.props.setAnnonce({annonce: res})
            this.props.history.push('/')
        })
        .catch(err => {
            console.log(err);
        })

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
            .then(data => data.public_id)
        )
    }

    render() {
        return (
            <div className="container">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalLocation" >
                        <Col componentClass={ControlLabel} sm={4} >
                            Lieux de la chambre
                        </Col>
                        <Col sm={4}>
                        <FormControl
                            name="address"
                            type="text"
                            placeholder="Lieux de la chambre"
                            onChange={
                                this.updateLocation('location')
                            }
                            value={
                                this.state.location.address
                            } 
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalLocation1">
                        <Col componentClass={ControlLabel} sm={4}>
                            Lieux de la chambre recherchée
                        </Col>
                        <Col sm={4}>
                        <FormControl 
                            name="address"
                            type="text"
                            placeholder= "Lieux de la chambre recherchée"
                            onChange={
                            this.updateLocation('location1')
                            }
                            value={
                                this.state.location1.address
                            } 
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail" >
                        <Col componentClass={ControlLabel} sm={4} >
                            Période de disponiblité
                        </Col>
                        <Col sm={4}>
                        <FormControl 
                            name="period"
                            type="text"
                            placeholder="Période de disponiblité"
                            onChange={
                            this.updateInput
                            }
                            value={
                            this.state.period
                            } 
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={4}>
                        Titre d'annonce
                        </Col>
                        <Col sm={4}>
                        <FormControl 
                            name="titre"
                            type="text"
                            placeholder="Titre d'annonce"
                            onChange={
                            this.updateInput
                            }
                            value={
                            this.state.titre
                            } 
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalImage">
                        <Col componentClass={ControlLabel} sm={4}>
                        Upload image
                        </Col>
                        <Col sm={4}>
                        <FormControl
                            type="file"
                            multiple={true}
                            placeholder="Selectionnez une image"
                            onChange={
                                e => {this.onChange(e.target.files[0])}
                            }
                            // onSubmit={
                            //     this.onFormSubmit
                            // }
                        />
                        </Col>
                    </FormGroup>

                    <FormGroup >
                        <Col smOffset={4} sm={4}>
                        <Button 
                            type="submit"
                            onClick={
                                this.handleCreateAnnonce
                            }>Créer l'annonce</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default CreateAnnonce