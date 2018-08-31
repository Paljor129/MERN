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
                                    {/* {JSON.stringify(user)} */}
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