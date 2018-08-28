import React from 'react'
import { Image } from 'cloudinary-react'
import { Link } from 'react-router-dom'
import { Button, Item, Icon, Segment } from 'semantic-ui-react'
import Interested from './Interested'
import '../styles/Annonce.css'

class Annonce extends React.Component {

    render() {
        
        return (this.props.user && this.props.user.annonce &&
            <div className='ui container'>
                <div className='ui grid'>
                    <div className='ui segment'>
                        <Segment textAlign='center'><h3>Votre annonce</h3></Segment>
                        <Item.Group>
                            <Item>
                                <div className='ui large image'>
                                    <Image
                                        cloudName="dkhupnzr8" 
                                        publicId={this.props.user.annonce.image} 
                                        width={400} 
                                        crop="scale" 
                                    />
                                </div>
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header>{this.props.user.annonce.titre}</Item.Header>
                                    <Item.Description>{this.props.user.annonce.address}</Item.Description>
                                    <Item.Description>{this.props.user.annonce.period}</Item.Description>
                                    <Item.Description>{this.props.user.annonce.description}</Item.Description>
                                    <Item.Extra>
                                        <Link to="/update">
                                            <Button positive size='big'>
                                                <Icon className='edit'></Icon>
                                                Modifier l'annonce</Button>
                                        </Link>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                            
                        </Item.Group>
                        <div>
                            <Interested user={this.props.user} />
                        </div>
                        
                    </div>
                </div>
            </div>                
        );
    }
}

export default Annonce;