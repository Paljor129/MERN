import React from 'react'
import axios from 'axios'
import { Form, Button, Message, Icon } from 'semantic-ui-react'

const preset = 's24frout'
const URL = 'https://api.cloudinary.com/v1_1/dkhupnzr8/image/upload'

class UpdateProfile extends React.Component {
    state = {
        firstname: this.props.user.firstname || '',
        lastname: this.props.user.lastname || '',
        image: this.props.user.image || '',
        address: this.props.user.address || '',
        file: null
    }

    updateInput = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    editProfile = e => {
        e.preventDefault()
        axios
            .put('/auth/user/'+this.props.user._id, this.state)
            .then(res => {
                this.setState({ user: res.data });
                this.props.setUser()
                    .then(() =>
                        this.props.history.push('/profile')
                    )
            })
            .catch(err => {
                console.log(err)
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
                    header='Modifier les données du champ ci-dessous pour changer votre profil'
                />
                <Form className='attached fluid segment'>
                    <Form.Group widths='equal'>
                        <Form.Input fluid
                            icon='user'
                            iconPosition='left'
                            name='firstname'
                            label='Nom'
                            type='text'
                            onChange={
                                this.updateInput
                            }
                            value={
                                this.state.firstname
                            } />
                        <Form.Input fluid
                            icon='user'
                            iconPosition='left'
                            name='lastname'
                            label='Prénom'
                            type='text'
                            onChange={
                                this.updateInput
                            }
                            value={
                                this.state.lastname
                            } />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid
                            icon='folder'
                            iconPosition='left'
                            label='Choisissez une nouvelle image pour votre profil'
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
                    <Button
                        size='big'
                        color='green'
                        onClick={
                            this.editProfile
                        }>
                        <Icon className='signup'></Icon>
                        Modifier
                    </Button>
                </Form>
                

            </div>
        )
    }
}

export default UpdateProfile