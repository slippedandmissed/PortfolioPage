import { transition, style, query, group, animate, AnimationTransitionMetadata } from "@angular/animations";

export const leftRightSlider =
    [
        transition(":decrement", slideTo("left")),
        transition(":increment", slideTo("right")),
    ];

    export function slideTo(direction: "left" | "right" | "top" | "bottom") {
    const optional = { optional: false };
    const isHorizontal = direction === "left" || direction === "right";
    return [
        query(":enter, :leave", [
            style({
                position: "absolute",
                [isHorizontal ? 'top' : 'left']: 0,
                [direction]: 0,
                width: "100%",
                height: "100%"
            })
        ], optional),
        query(":enter", [
            style({
                [direction]: "-100%"
            })
        ]),
        group([
            query(":leave", [
                animate("600ms ease", style({
                    [direction]: "100%"
                }))
            ], optional),
            query(":enter", [
                animate("600ms ease", style({
                    [direction]: "0%"
                }))
            ])
        ])
    ];
}
