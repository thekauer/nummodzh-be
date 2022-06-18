import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, Observable } from 'rxjs';

@Injectable()
export class EventService {
  constructor(private emitter: EventEmitter2) {}

  subscribeCandidate(): Observable<MessageEvent> {
    return fromEvent(this.emitter, 'candidate') as Observable<MessageEvent>;
  }

  subscribeFacilitator(): Observable<MessageEvent> {
    return fromEvent(this.emitter, 'facilitator') as Observable<MessageEvent>;
  }

  async emitCandidate(data) {
    this.emitter.emit('candidate', { data });
  }

  async emitFacilitator(data) {
    this.emitter.emit('facilitator', { data });
  }
}
