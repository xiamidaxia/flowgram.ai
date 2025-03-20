import styled from 'styled-components';
import { IconInfoCircle } from '@douyinfe/semi-icons';

export const BaseNodeStyle = styled.div`
  align-items: flex-start;
  background-color: #fff;
  border: 1px solid rgba(6, 7, 9, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  min-width: 360px;
  width: 100%;
  height: 100%;

  &.selected {
    border: 1px solid var(--coz-stroke-hglt, #4e40e5);
  }
`;

export const ErrorIcon = () => (
  <IconInfoCircle
    style={{
      position: 'absolute',
      color: 'red',
      left: -6,
      top: -6,
      zIndex: 1,
      background: 'white',
      borderRadius: 8,
    }}
  />
);
