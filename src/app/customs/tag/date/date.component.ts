import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export class CustomDate {
  day: string = '01';
  mouth: string = '01';
  year: string = '2022';
}

@Component({
  selector: 'form-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, OnChanges {
  @Input() inputBirthDay?: Date;
  @Output() dateEvent = new EventEmitter<Date | null>();

  public currentBirthDay: Date = new Date();

  isFormat = true;

  date: CustomDate = {
    day: '01',
    mouth: '01',
    year: '2022'
  }

  days: number[] = [];
  mouths: number[] = [];
  years: number[] = [];

  dateForm = this.formBuilder.group({
    date: ['', Validators.required],
    mouth: ['', Validators.required],
    year: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }

    for (let i = 1; i <= 12; i++) {
      this.mouths.push(i);
    }
    let currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      this.years.push(i);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputBirthDay) {
      this.currentBirthDay = new Date(this.inputBirthDay);
    }
  }

  handlerSelectChange(date: any) {
    this.date = {
      ...this.date,
      ...date
    }
    let dateFormat = this.getDate();
    if (dateFormat.getDate() == parseInt(this.date.day)
      && dateFormat.getMonth() == parseInt(this.date.mouth) - 1
      && dateFormat.getFullYear() == parseInt(this.date.year)) {
      this.isFormat = true;
      this.dateEvent.emit(dateFormat);
    } else {
      this.isFormat = false;
      this.dateEvent.emit(null);
    }
  }

  getDate(): Date {
    return new Date(this.date.year + '-' + this.date.mouth + '-' + this.date.day);
  }

}
