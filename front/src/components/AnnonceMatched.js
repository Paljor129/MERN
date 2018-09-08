import React from 'react';
import axios from 'axios';
import '../styles/Home.css'
import CardAnnonce from './CardAnnonce'
import { Header } from 'semantic-ui-react';

class ResultAnnonce extends React.Component {
    state = {
        user: []
    }

    componentDidMount() {
        this.dataRecharge()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userHasAnnonce !== this.props.userHasAnnonce) {
            this.dataRecharge()
        }

    }

    dataRecharge() {
            axios
                .get('/annonce/'+this.props.auteur+'/match')
                .then(res => {
                    this.setState({ user: res.data });
                })
                .catch(err => {
                    console.log(err);
                })
    }
    render() {
        return (
            <div className='ui container'>
                {this.state.user.length > 0
                    ?<div>
                        <Header as='h2' textAlign='center'>
                            <Header.Content>Liste des Annonces corréspondant à votre recherche</Header.Content>
                        </Header>
                        <div className='ui three doubling stackable cards'>
                            {this.state.user.length > 0 && this
                                .state
                                .user
                                .map((user) => (
                                    <CardAnnonce user={user} auteur={this.props.auteur} history={this.props.history} />
                                ))}
                        </div>
                    </div>
                    :<Header as='h2' textAlign='center'>
                        <Header.Content>Aucune annonce corréspondant à votre recherche</Header.Content>
                    </Header>
                }
            </div>
        )
    }
}

export default ResultAnnonce;