import styled from 'styled-components';

export const ContainerNodeContainerStyle = styled.div`
  display: flex;
  align-items: flex-start;

  box-sizing: border-box;
  min-width: 400px;
  min-height: 300px;

  background-color: #f2f3f5;
  border-radius: 8px;
  outline: 1px solid var(--coz-stroke-plus, rgba(6, 7, 9, 15%));

  .container-node-container-selected {
    outline: 1px solid var(--coz-stroke-hglt, #4e40e5);
  }
`;
