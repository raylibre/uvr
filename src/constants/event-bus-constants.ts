/**
 * Application-wide event constants
 * All events should be documented with their purpose and payload type
 */
export const EVENTS = {
  // Modal events
  /** Show login modal event - no payload */
  SHOW_LOGIN_MODAL: 'SHOW_LOGIN_MODAL',
  /** Hide login modal event - no payload */
  HIDE_LOGIN_MODAL: 'HIDE_LOGIN_MODAL',
  /** Show registration modal event - no payload */
  OPEN_REGISTER_MODAL: 'OPEN_REGISTER_MODAL',
  /** Hide registration modal event - no payload */
  HIDE_REGISTER_MODAL: 'HIDE_REGISTER_MODAL',
  
  // Confirmation modal events
  MODAL_CONFIRM: 'MODAL_CONFIRM',
  MODAL_REJECT: 'MODAL_REJECT',
  MODAL_CLOSE: 'MODAL_CLOSE',
  MODAL_CLOSED: 'MODAL_CLOSED',
  
  // Auth events
  /** Emitted when login is successful - payload: { user: User } */
  SUCCESS_LOGIN: 'SUCCESS_LOGIN',
  /** Emitted when login fails - payload: { error: string } */
  FAILED_LOGIN: 'FAILED_LOGIN',
  /** Emitted when registration is successful - payload: { user: User } */
  SUCCESS_REGISTER: 'SUCCESS_REGISTER',
  /** Emitted when registration fails - payload: { error: string } */
  FAILED_REGISTER: 'FAILED_REGISTER',
  /** Emitted when user logs out - no payload */
  LOGOUT: 'LOGOUT',
  /** Emitted when user data is updated - payload: { user: User } */
  USER_DATA_UPDATED: 'USER_DATA_UPDATED'
} as const;

/** Type for all possible event names */
export type EventType = typeof EVENTS[keyof typeof EVENTS];

/** Type for event payloads */
export type EventPayload = Record<string, unknown>;

/** Type for event callback functions */
export type EventCallback = (payload?: EventPayload) => void; 