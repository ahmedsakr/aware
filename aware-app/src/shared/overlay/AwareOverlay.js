import React, {Component} from 'react'
import 'bootstrap'
import './AwareOverlay.css'

class AwareOverlay extends Component {

    render() {
        const {name, title, content, footer} = this.props;
    
        return(
            <div class="overlay-container">
                <div class="modal fade" id={name} tabindex="-1" role="dialog" aria-labelledby={name + "Label"} aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="modal-title">{title}</div>
                                <button type="button" class="close" id="custom-overlay-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {content}
                            </div>
                            <div class="modal-footer">
                                <div class="overlay-footer">
                                    {footer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AwareOverlay;