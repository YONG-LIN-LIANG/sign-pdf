export interface SyntheticEvent {
  bubbles?: boolean;
  cancelable?: boolean;
  currentTarget?: EventTarget;
  defaultPrevented?: boolean;
  eventPhase?: number;
  isTrusted?: boolean;
  nativeEvent?: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target?: EventTarget;
  timeStamp?: Date;
  type?: string;
  keyCode?: number;
}

export interface KeyboardEvent {
  keyCode: number;
}