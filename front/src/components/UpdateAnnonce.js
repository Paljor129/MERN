import React from 'react'
import axios from 'axios'

import { Message, Form } from 'semantic-ui-react'

const cloudName = 'dkhupnzr8'
const preset = 's24frout'
const URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

class UpdateAnnonce extends React.Component {
    state = {
        // location: this.props.user.annonce.location || { cordinates: [], address: "" },
        // location1: this.props.user.annonce.location1 || { cordinates: [], address: "" },
        address: this.props.user.annonce.address || "",
        titre: this.props.user.annonce.titre || "",
        period: this.props.user.annonce.period || "",
        image: this.props.user.annonce.image || "",
        description: this.props.user.annonce.description || "",
        file: null
    }

    // updateLocation = loc => e => {
    //     this.setState({ [loc]: { ...this.state.location, [e.target.name]: e.target.value } })
    // }

    updateInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }    
    
    editAnnonce = e => {
        e.preventDefault()
        axios
            .put('/create/annonce/' + this.props.user.annonce._id, this.state)//this.state is to update all the details of an annonce
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
                console.log('publicId : ', publicId)
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
                        <Form.TextArea
                            icon='home'
                            iconPosition='left'
                            name='address'
                            label='Address'
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
