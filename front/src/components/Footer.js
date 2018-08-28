import React from 'react'
import '../styles/Footer.css'

class Footer extends React.Component {
    render() {
        return (
            <div className="ui inverted vertical footer segment form-page">
                <div className="ui container">
                    <div className='ui grid'>
                        <div className='ui stackable doubling five column grid'>
                            <div className='twelve wide column'>
                                <i className="copyright outline icon"></i> Simplon.co 2018.
                            </div>
                            <div className='four wide column'>
                                <button className="large ui circular facebook icon button">
                                    <i className="facebook icon"></i>
                                </button>
                                <button className="large ui circular twitter icon button">
                                    <i className="twitter icon"></i>
                                </button>
                                <button className="large ui circular linkedin icon button">
                                    <i className="linkedin icon"></i>
                                </button>
                                <button className="large ui circular google plus icon button">
                                    <i className="google plus icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer