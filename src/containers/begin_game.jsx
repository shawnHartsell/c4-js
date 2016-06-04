import React from 'react';//jscs:ignore parseError
import { Modal, Form, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createGame } from '../actions';

class BeginGame extends React.Component {
  constructor(props) {
    super(props);
    this._handleRows = this._handleRows.bind(this);
    this._handleColumns = this._handleColumns.bind(this);
    this._validateRows = this._validateRows.bind(this);
    this._validateColumns = this._validateColumns.bind(this);
    this._onClose = this._onClose.bind(this);
    this._sanitizeInput = this._sanitizeInput.bind(this);

    this.state = {
      showModal: true,
      rows: 6,
      columns: 7
    };
  }

  render() {
    return (
      <Modal show={this.state.showModal} hide={this._onClose}>
        <Modal.Header>
          <Modal.Title>
              Welcome To Connect 4!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Choose Game Size</h4>
          <br />
          <Form horizontal>
              <FormGroup controlId="rows" validationState={this._validateRows()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Rows
                </Col>
                <Col sm={2}>
                  <FormControl
                    type="text"
                    value={this.state.rows}
                    onChange={this._handleRows}
                    />
                </Col>
                <Col sm={4}>
                    <HelpBlock>Min: 6, Max: 15</HelpBlock>
                </Col>
              </FormGroup>
            <FormGroup controlId="columns" validationState={this._validateColumns()}>
              <Col componentClass={ControlLabel} sm={2}>
                Columns
              </Col>
              <Col sm={2}>
                <FormControl
                  type="text"
                  value={this.state.columns}
                  onChange={this._handleColumns}
                />
              </Col>
              <Col sm={4}>
                <HelpBlock>Min: 7, Max: 15</HelpBlock>
              </Col>
            </FormGroup>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this._onClose}
          disabled={ this._validateColumns() === "success" && this._validateRows() === "success" ? false : true} >
          Start!
        </Button>
      </Modal.Footer>
      </Modal>
    );
  };

  _onClose(e) {
    const rows = this.state.rows;
    const columns = this.state.columns;

    this.props.dispatch(createGame(rows, columns));
    this.setState({showModal: false});
  };

  _validateRows() {
    const rows = this.state.rows;
    return (rows && (rows >= 6 && rows <= 15)) ? 'success' : 'error';
  };

  _validateColumns() {
    const columns = this.state.columns;
    return (columns && (columns >= 7 && columns <= 15)) ? 'success' : 'error';
  }

  _handleRows(e) {
    this._sanitizeInput('rows', e.target.value);
  };

  _handleColumns(e) {
    this._sanitizeInput('columns', e.target.value);
  };

  _sanitizeInput(key, val) {
    let state = {};

    if(val === ''){
      state[key] = ''
      this.setState(state);
      return;
    }

    if(!val) {
      return;
    }

    const trimmedVal = val.trim();
    const newVal = Number(trimmedVal)

    if(newVal) {
      state[key] = trimmedVal;
      this.setState(state);
    }
  };
};

export default connect()(BeginGame)
