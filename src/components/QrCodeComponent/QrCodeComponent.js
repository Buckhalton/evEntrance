import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class QrCodeComponent extends Component {
    state = {
        showQr: false,
    }
    componentDidMount() {
    }

    toggleQr = () => {
        this.setState({
            showQr: !this.state.showQr,
        })
    }

    render() {
        let qrCodeContent;
        if(this.state.showQr) {
            qrCodeContent =  (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.toggleQr()
                        }
                    >
                        Hide
                </Button >
                    <img alt="user qr code" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://10.100.100.45:5000/api/user/attend/${this.props.user.code}/${this.props.eventId}`} />
                </div>
            )
        } else {
            qrCodeContent = <Button variant="contained"
                                    color="primary"
                                    onClick={() => this.toggleQr()
                            }>
                                Show
                            </Button>
        }
        return (
            <div>
                {qrCodeContent}
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps)(QrCodeComponent);