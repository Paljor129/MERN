import React from 'react'
import { Image } from 'cloudinary-react'
import axios from 'axios'
import { List, Button, Icon, Message, Modal, Header } from 'semantic-ui-react'

class Interested extends React.Component{
    state = {
        open: false,
        annonce: null
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    componentDidMount() {
        this.dataRecharge()        
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user.annonce !== this.props.user.annonce) {
            this.dataRecharge()
        }
    }

    dataRecharge() {
        axios
            .get('/annonce/' + this.props.user.annonce._id)
            .then(res => {
                this.setState({ annonce: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDelete = userId => {
        axios
            .delete('/annonce/'+this.props.user.annonce._id+'/'+userId)
            .then(res => {
                this.dataRecharge()
            })
            .catch(err => {
                console.log('err delete interest : ',err);
            })
    }

    render() {
        const { open, dimmer } = this.state
        return (
            <div>
                    {this.state.annonce > 0 && this.state.annonce.users[0]
                        ?<Message
                        attached
                        header='Liste des utilisateurs qui sont intéressés'
                        />
                        :<div></div>
                    }
                    
                    {this.state.annonce > 0 && this.state.annonce.users.map((user) => (
                        
                        <List divided verticalAlign='middle'>
                            <List.Item>
                                <List.Content floated='right'>
                                    <Modal size='medium' className='scrolling' dimmer={dimmer} open={open} onClose={this.close}
                                        trigger={<Button color='violet' onClick={this.show('blurring')}> Annonce </Button>} closeIcon>
                                        <Modal.Header>
                                            Détail de l'annonce
                                        </Modal.Header>
                                        <div className='content'>
                                        <Modal.Content image scrolling>
                                            <Modal.Content>
                                                <div className='ui large image'>
                                                    <Image
                                                    cloudName="dkhupnzr8"
                                                    publicId={user.annonce.image}
                                                    crop="scale" />
                                                </div>
                                            </Modal.Content>
                                            <Modal.Content>
                                                <Header>{user.annonce.titre}</Header>
                                                <h4>Disponible : {user.annonce.period}</h4>
                                                <h4>L'adresse d'utilisateur : {user.address}</h4>
                                                <h4>Recherche une chambre à proximité : {user.annonce.address}</h4>
                                                <p>{user.annonce.description}</p>                                
                                            </Modal.Content>
                                            
                                        </Modal.Content>
                                        </div>
                                    </Modal>
                                    <Button negative
                                        onClick={() => this.handleDelete(user._id)}>
                                        <Icon name='trash'></Icon>
                                        Supprimer
                                    </Button>
                                </List.Content>
                                <div className='ui avatar image'>
                                    <Image
                                        cloudName="dkhupnzr8"
                                        publicId={user.image}
                                        crop="scale"
                                    />
                                </div>
                                <List.Content>
                                    <List.Header>
                                        {user.firstname} {user.lastname}
                                    </List.Header>
                                    <List.Description>
                                       {user.email} 
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                        
                    ))}
                    
            </div>
        )
    }
}

export default Interested;