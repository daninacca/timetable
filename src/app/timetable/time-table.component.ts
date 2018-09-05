import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { TimeTableSlot } from '../shared/time-table-slot.model'
import { TimeTableSlotService } from '../shared/time-table-slot.service'
import { DataStorageService } from '../shared/data-storage.service'

@Component({
  selector: 'app-timetable',
  templateUrl: './time-table.component.html'
})
export class TimeTableComponent implements OnInit { 
  private timeTableSlots = []

  constructor(
    private ttsService: TimeTableSlotService,
    private dbService: DataStorageService
  ) {}
  ngOnInit() {
    this.dbService.getTimeTable()
    this.ttsService.timeTableChanged
      .subscribe((slots) => {
        this.construct(slots)
      })
  }
  onSubmit(form: FormGroup) {
    const value = form.value
    const col = +value.col
    const slot = new TimeTableSlot(value.name, col, value.row)
    this.ttsService.add(slot)
    form.reset()
  }
  onSave() {
    this.dbService.storeTimeTable(this.ttsService.getSlots())
  }
  onDelete(e) {
    this.ttsService.deleteSlot(e)
  }
  onReset() {
    this.ttsService.reset()
  }
  construct(slots) {
    this.timeTableSlots = []
    // loop rows
    for(let i = 0; i < 9; i++) {
      const newArr = []
      slots.map((e) => {
        if(e.row === i + 1) {
              newArr.push(e)
        }
      })
      // loop cols & create dummies
      for(let l = 0; l < 6; l++) {
        if(!newArr.find((slot) => slot.col === l)) {
          newArr.splice(l, 0, new TimeTableSlot("", l, i))
        }
      }
      // sort & push
      newArr.sort((a, b) => a.col - b.col)
      this.timeTableSlots.push(newArr)
    }
  }
} 