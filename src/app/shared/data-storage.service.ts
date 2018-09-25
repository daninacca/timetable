import { Injectable } from '@angular/core'
import { Response, Http } from '@angular/http'
import { Subject } from 'rxjs';

import { TimeTableSlotService } from './time-table-slot.service'
import { TimeTableSlot } from './time-table-slot.model'
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    private alreadyExists: boolean = false
    constructor(private http: Http,
                private ttsService: TimeTableSlotService,
                private authService: AuthService) {}

    storeTimeTable(timeTable) {
        return this.http.put('https://blackboard-53316.firebaseio.com/roosters.json',
        timeTable)
            .subscribe()
    }
    getTimeTable() {
        return this.http.get('https://blackboard-53316.firebaseio.com/roosters.json')
            .subscribe(
                (response: Response) => {
                    const timeTable = response.json()
                    const newArr = []
                    timeTable.map((e) => {
                        newArr.push(
                            new TimeTableSlot(e.name, e.col, e.row)
                        )
                    })
                    // Check if page is being reloaded or init'ed
                    newArr.map((e) => {
                        if(!this.ttsService.exists(e, this.ttsService.getSlots())) {
                            this.alreadyExists = true
                        }
                    })
                        // if it's init: init
                    if(this.alreadyExists == false) {
                        this.ttsService.add(newArr)
                        // if it's a reload: reload
                    } else {
                        this.ttsService.timeTableChanged.next(this.ttsService.getSlots())
                    }
                } 
            )
    }
}