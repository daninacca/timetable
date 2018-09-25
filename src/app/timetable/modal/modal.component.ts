import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { TimeTableSlot } from '../../shared/time-table-slot.model'
import { TimeTableSlotService } from '../../shared/time-table-slot.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  constructor(private ttsService: TimeTableSlotService) { }

  ngOnInit() {
  }
  onSubmit(form: FormGroup) {
    const value = form.value
    const col = +value.col
    const slot = new TimeTableSlot(value.name, col, value.row)
    this.ttsService.add(slot)
    form.reset()
  }
}