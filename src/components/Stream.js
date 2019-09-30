import React from 'react';
import flv from 'flv.js';

class Stream extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();

    }

    componentDidMount() {
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/ifsctest.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%',height:'500px' }} controls={true} />
            </div>
        );
    }
}


export default Stream