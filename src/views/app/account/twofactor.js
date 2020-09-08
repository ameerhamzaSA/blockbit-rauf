import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import QRCode from 'qrcode.react';

export default class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authCode: '',
      codeError: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open != this.props.open) {
      if (this.props.open) {
        this.props.getTwoFactorAction(this.props.history);
      }
      else{
          this.setState({
              authCode:'',
              codeError: ''
          })
      }
    }
    
  }

  handleSubmit = () => {
    const { history } = this.props;
    const { authCode } = this.state;
    if (authCode.length == 6) {
      this.setState({ codeError: '' });
      this.props.changeTwoFactorAction({ authCode, history });
    } else {
      this.setState({ codeError: 'Code is invalid' });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.open} toggle={this.props.toggle}>
          <ModalHeader>
            {this.props.status ? 'Enable' : 'Disable'} Two Factor Authentication
          </ModalHeader>
          <ModalBody>
            {this.props.loading2F && (
              <div className="text-center py-5">
                <Spinner size="sm" color="primary" />
              </div>
            )}
            <div className="text-center py-2">
              {this.props.code && <QRCode value={this.props.code} />}
            </div>
            <small>
              Scan this QR code through google authenticator mobile or web
              application and enter the code.
            </small>
            <Form>
              <FormGroup className="form-group has-top-label">
                <Label>Enter Code</Label>
                <Input
                  type="text"
                  value={this.state.authCode}
                  onChange={(e) =>
                    /^[0-9]*$/.test(e.target.value) &&
                    this.setState({ authCode: e.target.value })
                  }
                />
                {this.state.codeError.length > 0 && (
                  <div className="invalid-feedback d-block">
                    {this.state.codeError}
                  </div>
                )}
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSubmit()}>
              Save
            </Button>{' '}
            <Button color="secondary" onClick={() => this.props.toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
