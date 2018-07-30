import React from 'react'
import { Image } from 'cloudinary-react'

//const cloudName = 'dkhupnzr8'
// const preset = 's24frout'
// const URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

class Annonce extends React.Component {

    state = {
        publicId: 'sample'
    }

    render() {
        return (
            <div>
                <Image 
                    cloudName="dkhupnzr8" 
                    publicId={this.state.publicId} 
                    width={400} 
                    crop="scale" 
                />
            </div>
                
                
        );
    }
}

export default Annonce;