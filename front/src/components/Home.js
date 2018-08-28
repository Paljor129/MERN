import React from 'react';
import axios from 'axios';
import '../styles/Home.css'
import CardAnnonce from './CardAnnonce'
import { Header, Image } from 'semantic-ui-react';
import image from '../image/rex.jpg'

class Home extends React.Component {
    state = {
        annonce: []
    }

    componentDidMount() {
        this.dataRecharge()
    }

    //it will update only when auteur will change
    componentDidUpdate(prevProps) {
        console.log(prevProps);
        
        if(prevProps.auteur !== this.props.auteur) {
            this.dataRecharge()
        }
        
    }

    dataRecharge() {
        if (this.props.auteur) {
            axios
                .get('/create/user/'+this.props.auteur+'/match')
                .then(res => {
                    this.setState({ annonce: res.data });
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios
                .get('/create/annonces')
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
                        :<Header></Header>
                    }
                    {/* <Image src={image} fluid></Image> */}
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