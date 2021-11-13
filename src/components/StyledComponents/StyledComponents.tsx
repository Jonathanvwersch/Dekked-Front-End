import styled from "styled-components";

export const FileContainer = styled.div<{ width?: string }>`
  flex-shrink: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: ${({ width }) =>
    `repeat(auto-fill, minmax(${width || "340px"}, 0.5fr))`};
  grid-row-gap: ${({ theme }) => theme.spacers.size32};
  gap: ${({ theme }) => theme.spacers.size48};
`;
