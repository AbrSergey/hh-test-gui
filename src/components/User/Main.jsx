import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import parseError from '../../helpers/parseError';
import CreateUser from './Creator';
import { getAllUsers } from '../../actions/users'
import { openModal, closeModal } from '../../actions/modal'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Button, CardHeader, Card, Typography, Dialog } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const generateColor = (number) => {
  return colorArray[number];
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
    height: theme.spacing(12),
    textAlign: 'left',
    boxShadow: '0px 3px 3px #DCDCDC',
    marginTop: theme.spacing(7)
  },
  addCard: {
    height: theme.spacing(12),
    marginTop: theme.spacing(7),
    boxShadow: 'none',
    backgroundColor: 'transparent',
    border: 'dashed',
    borderWidth: '3px',
    borderColor: '#D3D3D3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plus: {
    fontSize: '350%',
    color: '#D3D3D3',
    '&:hover': {
      color: '#6B8E23',
      backgroundColor: 'transparent'
    }
  },
  text: {
    display: 'inline-block',
  },
  number: {
    backgroundColor: '#F8F8F8',
    height: '100vh',
    fontSize: 'xx-large',
    padding: '15%',
    opacity: '70%',
    fontWeight: 'bold',
    color: '#D3D3D3',
  },
  spinner: {
    marginTop: "10%"
  }
});

class User extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      await this.props.getAllUsers();
    } catch (error) {
      const parsedError = parseError(error);
      swal({
        title: parsedError.error,
        text: parsedError.message,
        icon: 'error'
      })
    }
  }

  render() {
    const { classes, modalState, users, openModal, closeModal, isLoading } = this.props;

    const userCards = users.length ? users.map(({ name, surname, email }, index) => (
      <Grid item xs={4}>
        <Card className={classes.card}>
          <Grid container>
            <Grid item xs={3}>
              <Typography component="div" className={classes.number}>
                #{index + 1}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: generateColor(index) }}>
                    {name[0].toUpperCase() + surname[0].toUpperCase()}
                  </Avatar>
                }
                title={name + " " + surname}
                subheader={email}
              />
            </Grid>
          </Grid>

        </Card>
      </Grid>
    )) : null;

    return (
      <div className={classes.root}>
        {isLoading ? <LinearProgress className={classes.spinner} /> :
          <>
            <Grid container spacing={3}>
              {userCards}
              <Grid item xs={4}>
                <Card className={classes.addCard}>
                  <Button className={classes.plus} onClick={openModal}>
                    +
                </Button>
                </Card>
              </Grid>
            </Grid>
            <Dialog open={modalState} onClose={closeModal}>
              <CreateUser />
            </Dialog>
          </>}
      </div>
    );
  }
}

const mapStateToProps = ({ users, modal }) => ({
  users: users.data,
  isLoading: users.loading,
  error: users.error,
  modalState: modal.modalState
});

User.propTypes = {
  getAllUsers: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  classes: PropTypes.object.isRequired,
  users: PropTypes.array,
};

export default connect(mapStateToProps, {
  getAllUsers, openModal, closeModal
})(withStyles(styles)(User));
