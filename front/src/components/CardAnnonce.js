import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react';
import { Image } from 'cloudinary-react'
import axios from 'axios'
import '../styles/CardAnnonce.css'
import moment from 'moment'

class CardAnnonce extends React.Component {
    state = {
        open: false,
        interested: false,
        annonce: []
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    handleInterest = e => {
        e.preventDefault()
        axios
            .put('/annonce/'+this.props.user.annonce._id+'/interested', {user_id: this.props.auteur})
            .then(res => {
                this.setState({ annonce: res.data, interested: true })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { open, dimmer } = this.state
        return(
            <div className='ui card'>
                <div class="content">
                    <div class="right floated meta">
                        <div className='description'>Publié le {moment(this.props.user.annonce.date).format('DD-MMM-YYYY')}</div>
                    </div>
                    <div className='ui avatar image' >
                        <Image
                            cloudName="dkhupnzr8"
                            publicId={this.props.user.image}
                            crop="scale"
                        />
                    </div>
                </div>
                <div className='ui huge image' >
                  <Image
                    cloudName="dkhupnzr8"
                    publicId={this.props.user.annonce.image}
                    crop="scale"
                    />  
                </div>
                
                <div className='content'>
                    <div className='header'>{this.props.user.annonce.titre}</div>
                    <div className='description'>{this.props.user.address}</div>
                    <div className='description'>{this.props.user.annonce.address}</div>
                </div>
                    <Modal size='medium' className='scrolling' dimmer={dimmer} open={open} onClose={this.close}
                        trigger={<Button color='violet' onClick={this.show('blurring')}> Détail </Button>} closeIcon>
                        <Modal.Header>
                            Détail de l'annonce
                        </Modal.Header>
                        <div className='content'>
                        <Modal.Content image scrolling>
                            <Modal.Content>
                                <div className='ui large image'>
                                    <Image
                                    cloudName="dkhupnzr8"
                                    publicId={this.props.user.annonce.image}
                                    crop="scale" />
                                </div>
                            </Modal.Content>
                            <Modal.Content>
                                <Header>{this.props.user.annonce.titre}</Header>
                                <h4>Disponible : {this.props.user.annonce.period}</h4>
                                <h4>L'adresse d'annonce : {this.props.user.address}</h4>
                                <h4>Recherche une chambre à proximité : {this.props.user.annonce.address}</h4>
                                <p>{this.props.user.annonce.description}</p>
                                <Button positive
                                    content='Interessé'
                                    icon='exchange'
                                    labelPosition='right'
                                    size='big'
                                    disabled={this.state.interested}
                                    onClick={
                                        this.props.auteur 
                                        ? this.handleInterest 
                                        : () => this.props.history.push('/register')}
                                    />
                            </Modal.Content>
                            
                        </Modal.Content>
                        </div>
                    </Modal>
            </div>
        )
    }
}

export default CardAnnonce;