import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'

import { TimeTableSlot } from '../shared/time-table-slot.model'

export class TimeTableSlotService {
    timeTableChanged = new Subject<TimeTableSlot[]>()
    private timeTableSlots: TimeTableSlot[] = []

    getSlots() {
        return this.timeTableSlots.slice()
    }
    add(e: TimeTableSlot[] | TimeTableSlot) {
        if(Array.isArray(e)) {
            this.timeTableSlots.push(...e)
        } else {
            // replace
            if(this.exists(e, this.timeTableSlots, 1) != -1) {
                this.timeTableSlots.splice(
                    this.exists(e, this.timeTableSlots), 1, e
                )
            }
            // or just push
            else {
                this.timeTableSlots.push(e)
            }
        }
        this.timeTableChanged.next(this.timeTableSlots.slice())
    } 
    deleteSlot(e: TimeTableSlot) {
        this.timeTableSlots.splice(this.exists(e, this.timeTableSlots, 2), 1)
        this.timeTableChanged.next(this.timeTableSlots.slice())
    }
    reset() {
        for(let i = 0; i < this.timeTableSlots.length; i++) {
            this.timeTableSlots.forEach((e) => {
                if(e.col !== 0) {
                    this.deleteSlot(e)
                }
             })
        }
    }
    exists(e, arr, b=0) {
        switch(b) {
            case 0: 
                return this.timeTableSlots.indexOf(
                    this.timeTableSlots.find(
                        slot => 
                            slot.col === e.col
                    )
                ) 
            case 1:
                return this.timeTableSlots.indexOf(
                    this.timeTableSlots.find(
                        slot => 
                            slot.col === e.col &&
                            slot.row === e.row
                    )
                ) 
            case 2:
                return this.timeTableSlots.indexOf(
                    this.timeTableSlots.find(
                        slot => 
                            slot.name === e.name
                    )
                ) 
        }
    }
}