import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import {
  ErrorMessage,
  Header,
  MessageContainer,
  StyledButton,
  StyledInput,
  Wrapper,
} from './SignupForm.css';

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
class SignupForm extends Component {
  state = {
    message: '',
    value: '',
    error: true,
    showError: false,
    loading: false,
    errorResponse: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange = (e: any) => {
    const { value } = e.target;
    this.setState({ value, error: !this.validateEmail(value) });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/destructuring-assignment
  validateEmail = (input: string) => emailRegex.test(this.state.value);

  onBlur = () => {
    const { error, value } = this.state;

    if (error && value) {
      this.setState({ showError: true });
    }
  };

  submitEmail = () => {
    const { error, value } = this.state;

    if (error) {
      this.setState({ showError: true });
      return;
    }

    this.setState({ loading: true });

    fetch(`/.netlify/functions/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: value,
        context: process.env.GATSBY_CONTEXT,
      }),
    })
      .then(res => {
        this.setState({ errorResponse: res.status >= 400 });
        return res.json();
      })
      .then(() =>
        this.setState({
          message: 'Please check your email and click the link to confirm.',
          loading: false,
        })
      )
      .catch(() =>
        this.setState({
          message: 'Error.  Please try again later.',
          loading: false,
          errorResponse: true,
        })
      );
  };

  render() {
    const { error, errorResponse, loading, message, showError, value } =
      this.state;

    return (
      <Wrapper>
        {/* <div> */}
        <Header>Mailing List for Upcoming Shows</Header>

        <StyledInput
          value={value}
          onChange={this.onChange}
          onBlur={this.onBlur} /* placeholder="neil@neil.com" */
        />

        <StyledButton disabled={error} onClick={this.submitEmail}>
          Join the Neil Revolution
        </StyledButton>

        {loading && <LoadingSpinner />}
        <MessageContainer>
          {error && showError && (
            <ErrorMessage>Invalid Email Address</ErrorMessage>
          )}

          {!!message && (
            <Header errorResponse={errorResponse}>{message}</Header>
          )}
        </MessageContainer>
      </Wrapper>
    );
  }
}

export default SignupForm;
