import { onBeforeUnmount } from 'vue';
import mitt from 'mitt';
import type { EventType, EventPayload, EventCallback } from '~/constants/event-bus-constants';
import { EVENTS } from '~/constants/event-bus-constants';

type Events = {
  [key in EventType]: EventPayload;
};

export const BUS = mitt<Events>();

export function useEventBus() {
  const setBusListener = (event: EventType, callback: EventCallback) => {
    BUS.on(event, callback);
    
    onBeforeUnmount(() => {
      BUS.off(event, callback);
    });
  };

  return {
    BUS,
    EVENTS,
    setBusListener
  };
} 