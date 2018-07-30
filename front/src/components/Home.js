import React from 'react';
import axios from 'axios';
import { Card, Button, Header, Modal } from 'semantic-ui-react';
import {Image} from 'cloudinary-react'
import '../styles/Home.css'

class Home extends React.Component {
    state = {
        annonce: [],
        publicId: 'sample',
        open: false
    }
    componentDidMount() {
        axios.get('/create/getannonce')
        .then(res => {
            this.setState({ annonce: res.data });
        })
        .catch(err => {
            console.log(err);
        })
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open } = this.state
        return(
            <div className='ui grid'>
                <div className='ui container'>
                    <Header as='h2' textAlign='center'>
                            <Header.Content>Liste des Annonces</Header.Content>
                    </Header>
                    <Card.Group centered itemsPerRow={3} stackable>
                        {this.state.annonce.map((card) => (
                        <Card>
                            <Image 
                                cloudName="dkhupnzr8" 
                                publicId={this.state.publicId}
                                height={280}
                                crop="scale" 
                            />
                                <Card.Content>
                                    <Card.Header>{card._id}</Card.Header>
                                    <Card.Meta>{card.villename}</Card.Meta>
                                    <Card.Description>{card.villename2}</Card.Description>
                                {/* </Card.Content>
                                <Card.Content>                                 */}
                                    <Modal
                                        className="scrolling"
                                        open={open}
                                        onOpen={this.open}
                                        onClose={this.close}
                                        // size='small'
                                        trigger={<Button>Détail</Button>}>
                                        <Modal.Header>Select a Photo</Modal.Header>
                                        <Modal.Content image>
                                            <Image
                                                cloudName="dkhupnzr8"
                                                publicId={this.state.publicId}
                                                width={300}
                                                crop="scale"
                                            />
                                            <Modal.Description>
                                                <Header>{card._id}</Header>
                                                <p>jxhfduizehfiji izuehfu ji hzuh ho zhruh  ouru b uhuhzerh .</p>
                                                <p>Is it okay to use this photo?</p>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                </Card.Content>
                        </Card>
                            
                        ))}
                    </Card.Group>
                </div>
            
            </div>
        )
    }
}
    


export default Home