import React, { Component } from "react";

class ModalDisplay extends Component{
    constructor(props) {
        super(props);
    }

    handleDeleteList = () => {
      this.props.deleteListCallback();
    }

    handleDeleteModal = () => {
      this.props.handleDeleteListCallback();
    }

    render() {
      if (this.props.deletingList) {
        return (
          <div id="modal-overlay" class="modal-overlay">
            <div id="modal" class="modal">
              <div class="modal-header header">
                <h3>Delete List?</h3>
                <div id = "modal-close" onClick={this.handleDeleteModal} class="modal-close ripple">×</div>
              </div>
              <div class="modal-header">
                  <div id="modal-confirm" onClick={this.handleDeleteList} class="modal-button ripple">Confirm</div>
                  <div id="modal-cancel"  onClick={this.handleDeleteModal} class="modal-button ripple">Cancel</div>
              </div>
          </div>
      </div>
        )
      }
      else {
        return null;
      }
    }
}
export default ModalDisplay