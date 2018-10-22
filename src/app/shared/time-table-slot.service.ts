import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'

import { TimeTableSlot } from '../shared/time-table-slot.model'

export class TimeTableSlotService {
    private timeTableSlots: TimeTableSlot[] = []
    timeTableChanged = new Subject<TimeTableSlot[]>()

    getSlots() {
        return this.timeTableSlots.slice()
    }
    add(e: TimeTableSlot | TimeTableSlot[]) {
        if(Array.isArray(e)) {
            this.timeTableSlots.push(...e)
        } else {
            // replace
            if(this.exists(e, this.timeTableSlots, 1) !== -1) {
                this.timeTableSlots.splice(
                    this.exists(e, this.timeTableSlots), 1, e
                )
            } else {
                this.timeTableSlots.push(e)
            }
        }
        this.timeTableChanged.next(this.getSlots())
    } 
    delete(e: TimeTableSlot | TimeTableSlot[]) {
        if(Array.isArray(e)) {
            e.map(e => { if(e.col !== 0) this.delete(e)})
        } else {
            this.timeTableSlots.splice(
                this.exists(e, this.timeTableSlots, 2), 1
            )
        }
        this.timeTableChanged.next(this.getSlots())
    }
    exists(e, arr, b=0) {
        return arr.indexOf(
            arr.find(
                (slot) => {
                    switch(b) {
                        case 0: 
                            return slot.col === e.col
                        case 1: 
                            return slot.col === e.col &&
                                    slot.row === e.row
                        case 2:
                            return slot.name === e.name
                    }
                }
            )
        )
    }
}