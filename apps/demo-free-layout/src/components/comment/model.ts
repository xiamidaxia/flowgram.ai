import { Emitter } from '@flowgram.ai/free-layout-editor';

import { CommentEditorEventParams } from './type';
import { CommentEditorDefaultValue, CommentEditorEvent } from './constant';

export class CommentEditorModel {
  private innerValue: string = CommentEditorDefaultValue;

  private emitter: Emitter<CommentEditorEventParams> = new Emitter();

  private editor: HTMLTextAreaElement | null = null;

  /** 注册事件 */
  public on = this.emitter.event;

  /** 获取当前值 */
  public get value(): string {
    return this.innerValue;
  }

  /** 外部设置模型值 */
  public setValue(value: string = CommentEditorDefaultValue): void {
    if (value === this.innerValue) {
      return;
    }
    this.innerValue = value;
    this.emitter.fire({
      type: CommentEditorEvent.Change,
      value: this.innerValue,
    });
  }

  public set element(el: HTMLTextAreaElement) {
    if (Boolean(this.editor)) {
      return;
    }
    this.editor = el;
  }

  /** 获取编辑器 DOM 节点 */
  public get element(): HTMLTextAreaElement | null {
    return this.editor;
  }

  /** 编辑器聚焦/失焦 */
  public setFocus(focused: boolean): void {
    if (focused && !this.focused) {
      this.editor?.focus();
    } else if (!focused && this.focused) {
      this.editor?.blur();
      this.deselect();
      this.emitter.fire({
        type: CommentEditorEvent.Blur,
      });
    }
  }

  /** 选择末尾 */
  public selectEnd(): void {
    if (!this.editor) {
      return;
    }
    // 获取文本长度
    const length = this.editor.value.length;
    // 将选择范围设置为文本末尾(开始位置和结束位置都是文本长度)
    this.editor.setSelectionRange(length, length);
  }

  /** 获取聚焦状态 */
  public get focused(): boolean {
    return document.activeElement === this.editor;
  }

  /** 取消选择文本 */
  private deselect(): void {
    const selection: Selection | null = window.getSelection();

    // 清除所有选择区域
    if (selection) {
      selection.removeAllRanges();
    }
  }
}
