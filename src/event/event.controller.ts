import { Controller, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';

@ApiTags('Events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Sse('/candidate')
  candidate() {
    // return this.eventService.subscribeCandidate();
  }

  @Sse('/facilitator')
  facilitator() {
    // return this.eventService.subscribeFacilitator();
  }
}
