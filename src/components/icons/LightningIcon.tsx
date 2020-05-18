import React from 'react';
import styled, { keyframes } from 'styled-components';

const shake = keyframes`
 {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}`;

const Wrapper = styled.div`
  width: 96px;
  &:hover {
    animation: ${shake} 0.25s;
  }
`;

export const LightningIcon = () => (
  <Wrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M397.241 176.552H276.303L388.414 0H247.172L114.759 264.828h104.166L114.759 512l282.482-335.448z"
        fill="#ecba16"
      />
    </svg>
  </Wrapper>
);
