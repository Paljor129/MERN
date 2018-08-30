import React from 'react';
import axios from 'axios';
import '../styles/Home.css'
import CardAnnonce from './CardAnnonce'
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
        if (this.props.auteur) {
            axios
                .get('/annonce/'+this.props.auteur+'/match')
                .then(res => {
                    this.setState({ annonce: res.data });
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios
                .get('/annonce/')
                .then(res => {
                    this.setState({ annonce: res.data });
                })
                .catch(err => {
                    console.log(err)
                })
            
        }
    }
        render() {
            return (
                <div className='ui container'>
                    {this.state.annonce.length > 0 && this.state.annonce
                        ?<Header as='h2' textAlign='center'>
                            <Header.Content>Liste des Annonces</Header.Content>
                        </Header>
                        : <Header></Header>
                    }
                    <div className='ui three doubling stackable cards'>
                        {this.state.annonce.length > 0 && this
                            .state
                            .annonce
                            .map((annonce) => (
                                <CardAnnonce annonce={annonce} auteur={this.props.auteur} history={this.props.history} />
                            ))}
                    </div>
                </div>
            )
        }
}

export default Home;