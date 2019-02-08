import React from 'react';
import Modal from 'react-modal';

export default class FollowerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  onModalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const modalStyle = {
      overlay: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 99999,
      },
      content: {
        // width: "400px",
        // height: "336px",
        // margin: "auto",
        // borderRadius: "14px",
        // overflow: "hidden",
        // animation: "gearModal 0.05s linear",
      }
    };
    
    return (
      <Modal isOpen={ this.state.modalOpen } onRequestClose={ this.onModalClose } style={ modalStyle }>

      </Modal>
    )
  }
}
