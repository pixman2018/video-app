import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fk-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() result;
  @Input() message;
  @Input() overlay;
  @Output() decisionMessage = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  makeDecision( decision ) {
    this.decisionMessage.emit(decision);
  }

}
