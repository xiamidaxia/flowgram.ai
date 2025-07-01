/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import styled from 'styled-components';
import { Tag, TreeSelect } from '@douyinfe/semi-ui';

export const UIRootTitle = styled.div`
  margin-right: 4px;
  min-width: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--semi-color-text-2);
`;

export const UIVarName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 50%;
`;

export const UITag = styled(Tag)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & .semi-tag-content-center {
    justify-content: flex-start;
  }

  &.semi-tag {
    margin: 0;
  }
`;

export const UITreeSelect = styled(TreeSelect)<{ $error?: boolean }>`
  outline: ${({ $error }) => ($error ? '1px solid red' : 'none')};

  height: 22px;
  min-height: 22px;
  line-height: 22px;

  & .semi-tree-select-selection {
    padding: 0 2px;
    height: 22px;
  }

  & .semi-tree-select-selection-content {
    width: 100%;
  }

  & .semi-tree-select-selection-placeholder {
    padding-left: 10px;
  }
`;
