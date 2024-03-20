import { BoundingBox } from "@balatrots/bounding-box";
import { UIElement } from "./ui-element";

export enum Alignment {
    Start,
    Center,
    End
}

export enum Direction {
    Column,
    Row
}

export class UIPanel extends UIElement {
    bounds?: BoundingBox;
    zIndex: number = 0;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    depth?: number;
    hAlignment?: Alignment;
    vAlignment?: Alignment;
    childrenDirection?: Direction;

    onPress?: () => void;
    onPressDown?: () => void;
    onPressUp?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onDragUpdate?: () => void;
    onUpdate?: () => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    onHoverUpdate?: () => void;
}