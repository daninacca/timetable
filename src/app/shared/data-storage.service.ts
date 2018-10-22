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
                    const newArr = timeTable.map((e) => {
                        return new TimeTableSlot(e.name, e.col, e.row)
                    })
                    // on page reload
                    if(this.isReload(newArr)) {
                        this.ttsService.timeTableChanged.next(
                            this.ttsService.getSlots()
                        )
                    } 
                    // on page init
                    this.ttsService.add(newArr)
                } 
            )
    }
    isReload([head, ...rest]) {
        if(!head) {
            return false
        }
        return this.ttsService.exists(head, this.ttsService.getSlots() ||           this.isReload(rest))
    }
}