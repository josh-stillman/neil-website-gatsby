import React, { Component } from 'react';
import { StyledP, StyledLink, Wrapper } from './Banner.css';
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  message?: string;
  subscriberId?: string;
  type: 'subscribe' | 'unsubscribe';
}

const baseClass = 'banner';
class Banner extends Component<Props> {
  state = {
    loading: true,
    message: '',
  };

  componentDidMount() {
    this.handleAction();
  }

  handleAction = () => {
    const { subscriberId, type } = this.props;

    if (!subscriberId) {
      return;
    }

    fetch(
      `/.netlify/functions/${
        type === 'unsubscribe' ? 'unsubscribe' : 'confirm'
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: subscriberId,
          context: process.env.GATSBY_CONTEXT,
        }),
      }
    )
      .then(res => {
        if (res.status >= 400) {
          // eslint-disable-next-line react/no-unused-state
          this.setState({ errorResponse: true });
        }
        return res.json();
      })
      .then(({ message }) =>
        // eslint-disable-next-line react/no-unused-state
        this.setState({ message, loading: false, errorResponse: false })
      )
      .catch(() =>
        this.setState({
          message: 'Error.  Please try again.',
          // eslint-disable-next-line react/no-unused-state
          errorResponse: true,
        })
      );
  };

  render() {
    const { message, loading } = this.state;
    const { subscriberId } = this.props;

    if (!subscriberId) {
      return null;
    }

    return (
      <Wrapper className={baseClass}>
        {loading && <LoadingSpinner />}
        {message && <StyledP>{message}</StyledP>}
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <StyledLink to="/">❌</StyledLink>
      </Wrapper>
    );
  }
}

export default Banner;
