import { Vec2 } from "./vector2";

/**
 * The BoundingBox class represents a rectangular area defined by a position and size.
 */
export class BoundingBox {
    position: Vec2;  // The position of the top-left corner of the bounding box
    size: Vec2;  // The size of the bounding box

    /**
     * Constructs a new BoundingBox object.
     * @param position - The position of the top-left corner of the bounding box
     * @param size - The size of the bounding box
     */
    constructor(position: Vec2, size: Vec2) {
        this.position = position;
        this.size = size;
    }

    /**
     * Checks if this bounding box collides with another bounding box.
     * @param other - The other bounding box to check for collision with
     * @returns true if the bounding boxes collide, false otherwise
     */
    collidesWithBox(other: BoundingBox): boolean {
        return this.position.x < other.position.x + other.size.x &&
               this.position.x + this.size.x > other.position.x &&
               this.position.y < other.position.y + other.size.y &&
               this.position.y + this.size.y > other.position.y;
    }

    /**
     * Checks if this bounding box contains a given vector.
     * @param vector - The vector to check
     * @returns true if the bounding box contains the vector, false otherwise
     */
    containsVector(vector: Vec2): boolean {
        return vector.x >= this.position.x &&
               vector.x <= this.position.x + this.size.x &&
               vector.y >= this.position.y &&
               vector.y <= this.position.y + this.size.y;
    }
    expand(amount: Vec2): void {
        this.size.x += amount.x;
        this.size.y += amount.y;
    }

    shrink(amount: Vec2): void {
        this.size.x -= amount.x;
        this.size.y -= amount.y;
    }

    move(newPosition: Vec2): void {
        this.position = newPosition;
    }

    resize(newSize: Vec2): void {
        this.size = newSize;
    }

    intersectsLine(start: Vec2, end: Vec2): boolean {
        let t0 = 0;
        let t1 = 1;
        const dx = end.x - start.x;
        const dy = end.y - start.y;
    
        const p = [-dx, dx, -dy, dy];
        const q = [start.x - this.position.x, this.position.x + this.size.x - start.x, start.y - this.position.y, this.position.y + this.size.y - start.y];
    
        for (let i = 0; i < 4; i++) {
            if (p[i] === 0) {
                if (q[i] < 0) {
                    return false;
                }
            } else {
                const t = q[i] / p[i];
                if (p[i] < 0) {
                    t0 = Math.max(t0, t);
                } else {
                    t1 = Math.min(t1, t);
                }
                if (t0 > t1) {
                    return false;
                }
            }
        }
    
        return true;
    }

    getCenter(): Vec2 {
        return new Vec2(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
    }
}