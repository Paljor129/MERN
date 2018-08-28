import React from 'react'
import { Item, Segment, Button, Icon } from 'semantic-ui-react'
import { Image } from 'cloudinary-react'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
    render() {
        return(
            <div className='center align ui container'>
                <Segment textAlign='center'><h3>Votre Profil</h3></Segment>
                <div className='ui segment'>
                    <div className='ui centered grid'>
                        <Item.Group relaxed>
                            <Item>
                                <div className='ui medium circular image'>
                                    <Image
                                        cloudName="dkhupnzr8"
                                        publicId={this.props.user.image}
                                        crop="scale"
                                    />
                                </div>
                                <Item.Content verticalAlign='middle'>
                                    <Item>
                                        <h2>{this.props.user.firstname} {this.props.user.lastname}</h2>
                                    </Item>
                                    <Item.Description>
                                        <h3>{this.props.user.email}</h3>
                                    </Item.Description>
                                    <Item.Description>
                                        <h3>{this.props.user.address}</h3>
                                    </Item.Description>
                                    <Link to='/updateProfile'>
                                        <Button positive size='big'>
                                            <Icon className='edit'></Icon>
                                            Modifier
                                        </Button>
                                    </Link>
                                    
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </div>
                </div>                
            </div>
        )
    }
}

export default Profile