
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import App from 'src/App';
export class Scheduler extends React.Component {
    constructor() {
        super(...arguments);
        this.data = [{
                Id: 1,
                Subject: 'Scrum Meeting',
                StartTime: new Date(2018, 0, 28, 10, 0),
                EndTime: new Date(2018, 0, 28, 12, 30),
                IsAllDay: false,
                RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20180129T043000Z;',
            },
            {
                Id: 2,
                Subject: 'Scrum Meeting - Following Edited',
                StartTime: new Date(2018, 0, 30, 10, 0),
                EndTime: new Date(2018, 0, 30, 12, 30),
                RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20180204T043000Z;',
                FollowingID: 1
            }];
        this.eventSettings = { dataSource: this.data, editFollowingEvents: true };
    }
    render() {
        return <ScheduleComponent height='550px' selectedDate={new Date(2018, 0, 28)} eventSettings={this.eventSettings}>
<Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
</ScheduleComponent>;
    }
}
;
const someElement = document.getElementById("schedule")
if(someElement) {
ReactDOM.render(<Scheduler />, someElement);
}
