import type { Rectangle, IPoint } from '@flowgram.ai/utils';

import { type WorkflowLineEntity } from '../entities';

export enum LineType {
  BEZIER, // 贝塞尔曲线
  LINE_CHART, // 折叠线
}

export type LineRenderType = LineType | string;

export interface LinePosition {
  from: IPoint;
  to: IPoint;
}

export interface LineColor {
  hidden: string;
  default: string;
  drawing: string;
  hovered: string;
  selected: string;
  error: string;
}

export enum LineColors {
  HIDDEN = 'var(--g-line-color-hidden,transparent)', // 隐藏线条
  DEFUALT = 'var(--g-line-color-default,#4d53e8)',
  DRAWING = 'var(--g-line-color-drawing, #5DD6E3)', // '#b5bbf8', // '#9197F1',
  HOVER = 'var(--g-line-color-hover,#37d0ff)',
  SELECTED = 'var(--g-line-color-selected,#37d0ff)',
  ERROR = 'var(--g-line-color-error,red)',
}

export interface WorkflowLineRenderContribution {
  entity: WorkflowLineEntity;
  path: string;
  bounds: Rectangle;
  update: (params: { fromPos: IPoint; toPos: IPoint }) => void;
  calcDistance: (pos: IPoint) => number;
}

export type WorkflowLineRenderContributionFactory = (new (
  entity: WorkflowLineEntity
) => WorkflowLineRenderContribution) & {
  type: LineRenderType;
};
