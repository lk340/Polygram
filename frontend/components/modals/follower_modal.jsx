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
    return (
      <div>
        <Modal>

        </Modal>
      </div>
    )
  }
}