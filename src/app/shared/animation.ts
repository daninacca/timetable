import { 
    trigger,
    state, 
    style, 
    transition, 
    animate, 
    keyframes 
} from "@angular/animations"

export const load = trigger('load', [
    state('in', style({
      opacity: 1,
      transform: 'translateY(0)'
    })),
    transition('void => *', [
      animate(1000, keyframes([
        style({
          opacity: 0,
          transform: 'translateY(100px)',
          offset: 0
        }),
        style({
          opacity: 0.5,
          transform: 'translateY(50px)',
          offset: 0.3
        }),
        style({
          opacity: 1,
          transform: 'translateY(10px)',
          offset: 0.7
        }),
        style({
          opacity: 1,
          transform: 'translateY(0px)',
          offset: 1
        }),
      ]))
    ]),
])