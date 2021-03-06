import React from 'react'
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import { Image } from 'cloudinary-react'
import moment from 'moment'

class Cards extends React.Component {
    state = {
        open: false,
        interested: false,
        annonce: []
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    componentDidMount() {
        this.setState({ interested: this.props.annonce.users.indexOf(this.props.auteur) > -1 })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.auteur !== this.props.auteur && this.props.auteur == null) {
            this.setState({ interested: false })
        }
    }

    render() {
        const { open, dimmer } = this.state
        return (
            <div className='ui card'>
                <div className="content">
                    <div className="right floated meta">
                        <div className='description'>Publié le {moment(this.props.annonce.date).format('DD-MMM-YYYY')}</div>
                    </div>
                    <div className='ui avatar image' >
                        <Image
                            cloudName="dkhupnzr8"
                            publicId={this.props.annonce.auteur.image}
                            crop="scale"
                        />
                    </div>
                </div>
                <div className='ui huge image' >
                    <Image
                        cloudName="dkhupnzr8"
                        publicId={this.props.annonce.image}
                        crop="scale"
                    />
                </div>

                <div className='content'>
                    <div className='header'>{this.props.annonce.titre}</div>
                    <div className='description'>{this.props.annonce.period}</div>
                </div>
                <Modal className='scrolling' dimmer={dimmer} open={open} onClose={this.close}
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
                                        publicId={this.props.annonce.image}
                                        crop="scale" />
                                </div>
                            </Modal.Content>
                            <Modal.Content>
                                <Header>{this.props.annonce.titre}</Header>
                                <h4>Disponible : {this.props.annonce.period}</h4>
                                <h4>L'adresse d'annonce : {this.props.annonce.auteur.address}</h4>
                                <h4>Recherche une chambre à proximité : {this.props.annonce.address}</h4>
                                <p>{this.props.annonce.description}</p>
                                <Button positive
                                    content='Interessé'
                                    icon='exchange'
                                    labelPosition='right'
                                    size='large'
                                    disabled={this.state.interested}
                                    onClick={
                                        this.props.auteur
                                            ? this.handleInterest
                                            : () => this.props.history.push('/register')}
                                />
                                <Form reply>
                                    <Form.TextArea />
                                    <Button content='+ Commentaire' size='large' primary />
                                </Form>
                            </Modal.Content>

                        </Modal.Content>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Cards;