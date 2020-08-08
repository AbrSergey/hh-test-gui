export default (error) => {
  console.log(error);
  try {
    return {
      error: error.response.data.error,
      message: error.response.data.description
    }
  } catch (err) {
    return {
      error: 'Unexpected error',
      message: 'please try again later'
    }
  }
}