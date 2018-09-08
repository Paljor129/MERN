import React from 'react';
import axios from 'axios';
import '../styles/Home.css'
import Cards from './Cards'
import { Header } from 'semantic-ui-react';

class Home extends React.Component {
    state = {
        annonce: []
    }

    componentDidMount() {
        this.dataRecharge()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.auteur !== this.props.auteur) {
            this.dataRecharge()
        }
        
    }

    dataRecharge() {
            axios
                .get('/annonce/')
                .then(res => {
                    this.setState({ annonce: res.data });
                })
                .catch(err => {
                    console.log(err)
                })
    }
        render() {
            
            return (
                <div className='ui container'>
                    <Header as='h2' textAlign='center'>
                            <Header.Content>Liste des Annonces publiques</Header.Content>
                    </Header>
                    <div className='ui three doubling stackable cards'>
                        {this.state.annonce.length > 0 && this
                            .state
                            .annonce
                            .map((annonce) => (
                                <Cards annonce={annonce} auteur={this.props.auteur} history={this.props.history} />
                            ))}
                    </div>
                </div>
            )
        }
}

export default Home;