import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Joi from 'joi-browser';
import { withStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, Button, TextField, DialogActions } from '@material-ui/core';
import { addUser } from '../../actions/users'
import { closeModal } from '../../actions/modal'
import parseError from '../../helpers/parseError';

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

const styles = theme => ({
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    margin: '0 auto'
  },
  errorHelperText: {
    color: 'red'
  }
});


class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      surname: null,
      email: null,

      nameError: null,
      surnameError: null,
      emailError: null
    };
  }

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label('email'),
    name: Joi.string()
      .optional()
      .required()
      .label('name'),
    surname: Joi.string()
      .optional()
      .required()
      .label('surname')
  }

  validate = () => {
    const { name, surname, email } = this.state;
    const { error } = Joi.validate({ name, surname, email }, this.schema, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  onChangeHandler = ({ currentTarget: input }) => {
    const errorMessage = this.validateProperty(input);

    this.setState({
      [input.name]: input.value,
      [`${input.name}Error`]: errorMessage,
      [input.name + 'Validation']: errorMessage ? false : true
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();

    if (errors) return;
    else {
      try {
        const { name, surname, email } = this.state;
        await this.props.addUser({
          name, surname, email
        });

        await this.props.closeModal();

        swal({
          title: 'Пользователь добавлен!',
          icon: 'success',
          button: false,
          timer: 2000
        });
      }
      catch (error) {
        const parsedError = parseError(error);
        swal({
          title: parsedError.error,
          text: parsedError.message,
          icon: 'error',
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { nameError, surnameError, emailError } = this.state;

    return (
      <>
        <DialogTitle id="form-dialog-title">Создание пользователя</DialogTitle>
        <DialogContent>
          <div>
            <ValidationTextField
              name="name"
              className={classes.textField}
              label="Имя"
              variant="outlined"
              id="validation-outlined-input"
              onChange={(e) => this.onChangeHandler(e)}
              error={!!nameError}
              // helperText="sdg"
              required
            />
            <div className={classes.errorHelperText}>{nameError}</div>
          </div>
          <div>
            <ValidationTextField
              name="surname"
              className={classes.textField}
              label="Фамилия"
              variant="outlined"
              id="validation-outlined-input"
              onChange={(e) => this.onChangeHandler(e)}
              error={!!surnameError}
              required
            />
            <div className={classes.errorHelperText}>{surnameError}</div>
          </div>
          <div>
            <ValidationTextField
              name="email"
              className={classes.textField}
              label="E-mail"
              variant="outlined"
              id="validation-outlined-input"
              onChange={(e) => this.onChangeHandler(e)}
              error={!!emailError}
              required
            />
            <div className={classes.errorHelperText}>{emailError}</div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit} className={classes.button} variant="contained" color="primary" disableElevation>
            Создать
          </Button>
        </DialogActions>
      </>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  error: users.error
});

CreateUser.propTypes = {
  addUser: PropTypes.func,
  closeModal: PropTypes.func
};

export default connect(mapStateToProps, {
  addUser, closeModal
})(withStyles(styles)(CreateUser));
