import React from 'react'
import { Image } from 'cloudinary-react'
import axios from 'axios'
import { List, Button, Icon, Message } from 'semantic-ui-react'

class Interested extends React.Component{
    state = {
        annonce: null
    }

    componentDidMount() {
        console.log('annonce interested ', this.props.user.annonce._id)
        axios
            .get('/create/annonce/'+this.props.user.annonce._id)
            .then(res => {
                console.log('res data ', res.data)
                this.setState({ annonce: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDelete = e => {
        axios
            .delete('/create/annonce/'+this.props.user.annonce._id, { user_id: this.props.user._id})
            .then(res => {
                res.data
            })
            .catch(err => {
                console.log('err delete interest : ',err);
                
                // res.json(err);
            })
    }

    render() {
        return (
            <div>
                    {this.state.annonce && this.state.annonce.users[0]
                        ?<Message
                        attached
                        header='Listes des utilisataires qui ont été interessé'
                        />
                        :<div></div>
                    }
                    
                    {this.state.annonce && this.state.annonce.users.map((user) => (
                        
                        <List animated divided verticalAlign='middle'>
                            <List.Item>
                                <List.Content floated='right'>
                                    <Button positive>                                        
                                        <Icon name='envelope'></Icon>  
                                        Contacter                                    
                                    </Button>
                                    <Button negative
                                        onClick={this.handleDelete}>
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