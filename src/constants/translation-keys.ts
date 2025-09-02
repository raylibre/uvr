export const T_KEYS = {
  USER_CATEGORIES_FAMILY_WITHOUT_FATHER: 'user.categories.familyWithoutFather',
  USER_CATEGORIES_VOLUNTEER: 'user.categories.volunteer',
  USER_CATEGORIES_ACTIVE_MILITARY: 'user.categories.activeMilitary',
  USER_CATEGORIES_ACTIVE_VETERAN: 'user.categories.activeVeteran',
  USER_CATEGORIES_RETIRED_VETERAN: 'user.categories.retiredVeteran',
  USER_CATEGORIES_COMBAT_DISABLED: 'user.categories.combatDisabled',
  USER_CATEGORIES_HOMELESS_FAMILY: 'user.categories.homelessFamily',
  MARITAL_STATUS_MARRIED: 'user.maritalStatus.married',
  MARITAL_STATUS_SINGLE: 'user.maritalStatus.single',
  MARITAL_STATUS_DIVORCED: 'user.maritalStatus.divorced',
  MARITAL_STATUS_DIVORCED_PAYING_ALIMONY: 'user.maritalStatus.divorcedPayingAlimony',
  ACTIVITY_TYPE_SOCIAL: 'user.activityTypes.social',
  ACTIVITY_TYPE_ECONOMIC: 'user.activityTypes.economic',
  ACTIVITY_TYPE_VOLUNTEER: 'user.activityTypes.volunteer',
  USER: {
    STATUS: {
      VERIFIED: 'user.status.verified',
      PENDING_VERIFICATION: 'user.status.pendingVerification'
    }
  },
  DOCUMENTS: {
    TITLE: 'auth.register.documents.title',
    ADD: 'auth.register.documents.add',
    SELECT_TYPE: 'auth.register.documents.selectType',
    REQUIRED: 'auth.register.documents.required',
    TYPES: {
      VOLUNTEER_CERTIFICATE: 'auth.register.documents.types.volunteerCertificate',
      MILITARY_ID: 'auth.register.documents.types.militaryId',
      VETERAN_CERTIFICATE: 'auth.register.documents.types.veteranCertificate',
      DISABILITY_CERTIFICATE: 'auth.register.documents.types.disabilityCertificate',
      DEATH_CERTIFICATE: 'auth.register.documents.types.deathCertificate',
      MARRIAGE_CERTIFICATE: 'auth.register.documents.types.marriageCertificate',
      BIRTH_CERTIFICATE: 'auth.register.documents.types.birthCertificate',
      DISPLACEMENT_CERTIFICATE: 'auth.register.documents.types.displacementCertificate',
      PASSPORT: 'auth.register.documents.types.passport',
      OTHER: 'auth.register.documents.types.other'
    }
  },
  UPLOAD: {
    ERRORS: {
      MAX_SIZE: 'upload.errors.maxSize',
      FILE_TYPE: 'upload.errors.fileType',
      MAX_FILES: 'upload.errors.maxFiles'
    }
  },
  COMMON: {
    BUTTONS: {
      SEND: 'common.buttons.send',
      SENDING: 'common.buttons.sending',
      JOIN: 'common.buttons.join',
      LOGIN: 'common.buttons.login',
      CANCEL: 'common.buttons.cancel',
      CONTINUE: 'common.buttons.continue',
      BACK: 'common.buttons.back',
      FINISH: 'common.buttons.finish',
      NEXT: 'common.buttons.next',
      PREVIOUS: 'common.buttons.previous',
      GET_IN_TOUCH: 'common.buttons.getInTouch',
      OUR_SERVICES: 'common.buttons.ourServices',
      BACK_TO_HOME: 'common.buttons.backToHome',
      VIEW_ALL: 'common.buttons.viewAll',
      RETRY: 'common.buttons.retry',
      VIEW_ALL_PROGRAMS: 'common.buttons.viewAllPrograms',
      EDIT: 'common.buttons.edit',
      SUBMIT: 'common.buttons.submit',
      UPLOAD_FILES: 'common.buttons.uploadFiles',
      TODAY: 'common.buttons.today',
      PROFILE: 'common.buttons.profile',
      SETTINGS: 'common.buttons.settings',
      LOGOUT: 'common.buttons.logout'
    },
    NAVIGATION: {
      LEADERSHIP: 'common.navigation.leadership',
      LEGAL_HELP: 'common.navigation.legalHelp',
      PROSTHETICS: 'common.navigation.prosthetics',
      FAMILY_TO_FAMILY: 'common.navigation.familyToFamily',
      OUR_ACTIVITIES: 'common.navigation.ourActivities',
      ABOUT_US: 'common.navigation.aboutUs',
      OPEN_MAIN_MENU: 'common.navigation.openMainMenu'
    },
    LABELS: {
      OR: 'common.labels.or',
      DRAG_AND_DROP: 'common.labels.dragAndDrop',
      CLOSE: 'common.labels.close',
      CLIENT: 'common.labels.client',
      DURATION: 'common.labels.duration',
      YES: 'common.labels.yes',
      NO: 'common.labels.no',
      ENABLED: 'common.labels.enabled',
      DISABLED: 'common.labels.disabled'
    },
    ERRORS: {
      PAGE_NOT_FOUND: 'common.errors.pageNotFound',
      GENERAL_ERROR: 'common.errors.generalError',
      FORM_SUBMIT_ERROR: 'common.errors.formSubmitError'
    },
    STATS: {
      TOTAL_PROGRAMS: 'common.stats.totalPrograms',
      FEATURED: 'common.stats.featured',
      PROGRAM_TYPES: 'common.stats.programTypes'
    }
  },
  FORM: {
    LABELS: {
      NAME: 'form.labels.name',
      EMAIL: 'form.labels.email',
      SUBJECT: 'form.labels.subject',
      MESSAGE: 'form.labels.message',
      SUBSCRIBE: 'form.labels.subscribe',
      FIRST_NAME: 'form.labels.firstName',
      LAST_NAME: 'form.labels.lastName',
      PATRONYMIC: 'form.labels.patronymic',
      PATRONYMIC_OPTIONAL: 'form.labels.patronymicOptional',
      EMAIL_ADDRESS: 'form.labels.emailAddress',
      PHONE_NUMBER: 'form.labels.phoneNumber',
      PASSWORD: 'form.labels.password',
      CONFIRM_PASSWORD: 'form.labels.confirmPassword',
      DATE_OF_BIRTH: 'form.labels.dateOfBirth',
      REGION: 'form.labels.region',
      CITY: 'form.labels.city',
      GENDER: 'form.labels.gender',
      CATEGORY: 'form.labels.category',
      FULL_ADDRESS: 'form.labels.fullAddress',
      EMERGENCY_CONTACT_NAME: 'form.labels.emergencyContactName',
      EMERGENCY_CONTACT_PHONE: 'form.labels.emergencyContactPhone',
      HAS_MINOR_CHILDREN: 'form.labels.hasMinorChildren',
      MINOR_CHILDREN_COUNT: 'form.labels.minorChildrenCount',
      BIO: 'form.labels.bio'
    },
    PLACEHOLDERS: {
      NAME: 'form.placeholders.name',
      EMAIL: 'form.placeholders.email',
      SUBJECT: 'form.placeholders.subject',
      MESSAGE: 'form.placeholders.message',
      ENTER_YOUR_NAME: 'form.placeholders.enterYourName',
      ENTER_YOUR_EMAIL: 'form.placeholders.enterYourEmail',
      ENTER_MESSAGE_SUBJECT: 'form.placeholders.enterMessageSubject',
      ENTER_YOUR_MESSAGE: 'form.placeholders.enterYourMessage'
    },
    VALIDATION: {
      REQUIRED: 'form.validation.required',
      MIN_LENGTH: 'form.validation.minLength',
      EMAIL: 'form.validation.email',
      NAME_REQUIRED: 'form.validation.nameRequired',
      EMAIL_REQUIRED: 'form.validation.emailRequired',
      SUBJECT_REQUIRED: 'form.validation.subjectRequired',
      MESSAGE_REQUIRED: 'form.validation.messageRequired',
      FIRST_NAME_REQUIRED: 'form.validation.firstNameRequired',
      LAST_NAME_REQUIRED: 'form.validation.lastNameRequired',
      PATRONYMIC_REQUIRED: 'form.validation.patronymicRequired',
      PHONE_REQUIRED: 'form.validation.phoneRequired',
      PASSWORD_REQUIRED: 'form.validation.passwordRequired',
      PASSWORD_CONFIRMATION_REQUIRED: 'form.validation.passwordConfirmationRequired',
      DATE_OF_BIRTH_REQUIRED: 'form.validation.dateOfBirthRequired',
      REGION_REQUIRED: 'form.validation.regionRequired',
      CITY_REQUIRED: 'form.validation.cityRequired',
      CATEGORY_REQUIRED: 'form.validation.categoryRequired',
      ADDRESS_REQUIRED: 'form.validation.addressRequired',
      FIRST_NAME_MIN_LENGTH: 'form.validation.firstNameMinLength',
      LAST_NAME_MIN_LENGTH: 'form.validation.lastNameMinLength',
      PATRONYMIC_MIN_LENGTH: 'form.validation.patronymicMinLength',
      EMAIL_INVALID: 'form.validation.emailInvalid',
      PHONE_INVALID: 'form.validation.phoneInvalid',
      PASSWORD_MIN_LENGTH: 'form.validation.passwordMinLength',
      PASSWORDS_DO_NOT_MATCH: 'form.validation.passwordsDoNotMatch'
    }
  },
  PAGES: {
    LEADERSHIP: {
      TITLE: 'pages.leadership.title'
    },
    PROSTHETICS: {
      TITLE: 'pages.prosthetics.title'
    },
    ACTIVITIES: {
      TITLE: 'pages.activities.title'
    },
    LEGAL_HELP: {
      TITLE: 'pages.legalHelp.title'
    },
    FAMILY: {
      TITLE: 'pages.family.title'
    }
  },
  HOME: {
    HERO: {
      TITLE: 'home.hero.title',
      TITLE_HIGHLIGHT: 'home.hero.titleHighlight',
      DESCRIPTION: 'home.hero.description',
      KEY_POINTS: {
        POINT1: {
          TITLE: 'home.hero.keyPoints.point1.title',
          DESCRIPTION: 'home.hero.keyPoints.point1.description'
        },
        POINT2: {
          TITLE: 'home.hero.keyPoints.point2.title',
          DESCRIPTION: 'home.hero.keyPoints.point2.description'
        },
        POINT3: {
          TITLE: 'home.hero.keyPoints.point3.title',
          DESCRIPTION: 'home.hero.keyPoints.point3.description'
        }
      }
    },
    ABOUT: {
      TITLE: 'home.about.title',
      DESCRIPTION: 'home.about.description'
    },
    PROGRAMS: {
      TITLE: 'home.programs.title',
      OVERVIEW: 'home.programs.overview',
      DESCRIPTION: 'home.programs.description',
      PROGRAM1: {
        TITLE: 'home.programs.program1.title',
        DESCRIPTION: 'home.programs.program1.description'
      },
      PROGRAM2: {
        TITLE: 'home.programs.program2.title',
        DESCRIPTION: 'home.programs.program2.description'
      },
      PROGRAM3: {
        TITLE: 'home.programs.program3.title',
        DESCRIPTION: 'home.programs.program3.description'
      },
      PROGRAM4: {
        TITLE: 'home.programs.program4.title',
        DESCRIPTION: 'home.programs.program4.description'
      }
    },
    REPRESENTATIVES: {
      TITLE: 'home.representatives.title',
      REP1: {
        NAME: 'home.representatives.rep1.name',
        POSITION: 'home.representatives.rep1.position'
      },
      REP2: {
        NAME: 'home.representatives.rep2.name',
        POSITION: 'home.representatives.rep2.position'
      },
      REP3: {
        NAME: 'home.representatives.rep3.name',
        POSITION: 'home.representatives.rep3.position'
      },
      REP4: {
        NAME: 'home.representatives.rep4.name',
        POSITION: 'home.representatives.rep4.position'
      }
    },
    NEWS: {
      TITLE: 'home.news.title',
      VIEW_MORE: 'home.news.viewMore',
      ARTICLE1: {
        TITLE: 'home.news.article1.title',
        EXCERPT: 'home.news.article1.excerpt',
        DATE: 'home.news.article1.date'
      },
      ARTICLE2: {
        TITLE: 'home.news.article2.title',
        EXCERPT: 'home.news.article2.excerpt',
        DATE: 'home.news.article2.date'
      },
      ARTICLE3: {
        TITLE: 'home.news.article3.title',
        EXCERPT: 'home.news.article3.excerpt',
        DATE: 'home.news.article3.date'
      }
    }
  },
  PROGRAMS: {
    SECTION: {
      TITLE: 'programs.section.title',
      DESCRIPTION: 'programs.section.description'
    }
  },
  FOOTER: {
    CONTACT: {
      TITLE: 'footer.contact.title',
      ADDRESS: 'footer.contact.address',
      EMAIL: 'footer.contact.email',
      PHONE: 'footer.contact.phone'
    },
    LINKS: {
      TITLE: 'footer.links.title',
      ABOUT: 'footer.links.about',
      PROGRAMS: 'footer.links.programs',
      NEWS: 'footer.links.news',
      CONTACT: 'footer.links.contact'
    },
    SOCIAL: {
      TITLE: 'footer.social.title'
    },
    RIGHTS: 'footer.rights'
  },
  AUTH: {
    REGISTER: {
      TITLE: 'auth.register.title',
      NEW_ACCOUNT: 'auth.register.newAccount',
      COMPLETE_REGISTRATION: 'auth.register.completeRegistration',
      UNSAVED_CHANGES: 'auth.register.unsavedChanges',
      UNSAVED_CHANGES_TEXT: 'auth.register.unsavedChangesText',
      YES_CLOSE: 'auth.register.yesClose',
      STEP_PROGRESS: 'auth.register.stepProgress',
      EMAIL_LABEL: 'auth.register.emailLabel',
      PHONE_LABEL: 'auth.register.phoneLabel',
      PASSWORD_LABEL: 'auth.register.passwordLabel',
      CONFIRM_PASSWORD_LABEL: 'auth.register.confirmPasswordLabel',
      SUBMIT: 'auth.register.submit',
      STEPS: {
        STEP1: {
          TITLE: 'auth.register.steps.step1.title',
          DESCRIPTION: 'auth.register.steps.step1.description'
        },
        STEP2: {
          TITLE: 'auth.register.steps.step2.title',
          DESCRIPTION: 'auth.register.steps.step2.description'
        },
        STEP3: {
          TITLE: 'auth.register.steps.step3.title',
          DESCRIPTION: 'auth.register.steps.step3.description'
        },
        STEP4: {
          TITLE: 'auth.register.steps.step4.title',
          DESCRIPTION: 'auth.register.steps.step4.description'
        },
        STEP5: {
          TITLE: 'auth.register.steps.step5.title',
          DESCRIPTION: 'auth.register.steps.step5.description'
        }
      },
      LABELS: {
        MARITAL_STATUS: 'auth.register.labels.maritalStatus',
        ACTIVITY_TYPE: 'auth.register.labels.activityType',
        BIO_OPTIONAL: 'auth.register.labels.bioOptional'
      },
      PLACEHOLDERS: {
        ENTER_ADDRESS: 'auth.register.placeholders.enterAddress',
        BIO_MOTIVATION: 'auth.register.placeholders.bioMotivation'
      },
      NOTIFICATIONS: {
        ENABLE_NOTIFICATIONS: 'auth.register.notifications.enableNotifications',
        ENABLE_DESCRIPTION: 'auth.register.notifications.enableDescription',
        EMAIL_NOTIFICATIONS: 'auth.register.notifications.emailNotifications',
        EMAIL_DESCRIPTION: 'auth.register.notifications.emailDescription',
        SMS_NOTIFICATIONS: 'auth.register.notifications.smsNotifications',
        SMS_DESCRIPTION: 'auth.register.notifications.smsDescription',
        NOTIFICATIONS_ENABLED: 'auth.register.notifications.notificationsEnabled',
        CHANGE_SETTINGS: 'auth.register.notifications.changeSettings'
      },
      TERMS: {
        AGREE_TO: 'auth.register.terms.agreeTo',
        TERMS_OF_SERVICE: 'auth.register.terms.termsOfService',
        AND: 'auth.register.terms.and',
        PRIVACY_POLICY: 'auth.register.terms.privacyPolicy'
      },
      REVIEW: {
        PERSONAL_INFO: 'auth.register.review.personalInfo',
        DEMOGRAPHICS: 'auth.register.review.demographics',
        EMERGENCY_CONTACT: 'auth.register.review.emergencyContact',
        NOTIFICATION_PREFERENCES: 'auth.register.review.notificationPreferences',
        CONTACT_NAME: 'auth.register.review.contactName',
        CONTACT_PHONE: 'auth.register.review.contactPhone',
        ADDRESS: 'auth.register.review.address'
      },
      SUCCESS_TITLE: 'auth.register.successTitle',
      SUCCESS_SUBTITLE: 'auth.register.successSubtitle',
      SUCCESS_TOAST: 'auth.register.successToast',
      ERRORS: {
        EMAIL_REQUIRED: 'auth.register.errors.emailRequired',
        EMAIL_INVALID: 'auth.register.errors.emailInvalid',
        EMAIL_TAKEN: 'auth.register.errors.emailTaken',
        PHONE_REQUIRED: 'auth.register.errors.phoneRequired',
        PHONE_INVALID: 'auth.register.errors.phoneInvalid',
        PHONE_TAKEN: 'auth.register.errors.phoneTaken',
        PASSWORD_REQUIRED: 'auth.register.errors.passwordRequired',
        PASSWORD_TOO_SHORT: 'auth.register.errors.passwordTooShort',
        CONFIRM_PASSWORD_REQUIRED: 'auth.register.errors.confirmPasswordRequired',
        PASSWORDS_DO_NOT_MATCH: 'auth.register.errors.passwordsDoNotMatch',
        GENERAL: 'auth.register.errors.general'
      }
    }
    ,
    LOGIN: {
      TITLE: 'auth.login.title',
      IDENTIFIER_LABEL: 'auth.login.identifierLabel',
      PASSWORD_LABEL: 'auth.login.passwordLabel',
      IDENTIFIER_REQUIRED: 'auth.login.identifierRequired',
      PASSWORD_MIN_LENGTH: 'auth.login.passwordMinLength',
      INVALID_CREDENTIALS: 'auth.login.invalidCredentials',
      SUCCESS_TOAST: 'auth.login.successToast',
      LOGOUT_SUCCESS_TOAST: 'auth.login.logoutSuccessToast'
    }
  },
  DEBUG: {
    VALIDATION_DEBUG: 'debug.validationDebug',
    VALIDATE_ALL_FIELDS: 'debug.validateAllFields'
  },
  PROGRAM_DETAIL: {
    NOT_FOUND_TITLE: 'programDetail.notFoundTitle',
    NOT_FOUND_DESCRIPTION: 'programDetail.notFoundDescription',
    TECHNICAL_DETAILS: 'programDetail.technicalDetails',
    STATS: {
      HELPED: 'programDetail.stats.helped',
      CURRENT_PARTICIPANTS: 'programDetail.stats.currentParticipants',
      SUCCESS_STORIES: 'programDetail.stats.successStories',
      BUDGET: 'programDetail.stats.budget'
    },
    ABOUT_SECTION: 'programDetail.aboutSection',
    REQUIREMENTS_SECTION: 'programDetail.requirementsSection',
    BENEFITS_SECTION: 'programDetail.benefitsSection',
    GALLERY_SECTION: 'programDetail.gallerySection',
    INFO_CARD: {
      TITLE: 'programDetail.infoCard.title',
      DURATION: 'programDetail.infoCard.duration',
      LOCATION: 'programDetail.infoCard.location',
      MAX_PARTICIPANTS: 'programDetail.infoCard.maxParticipants',
      DEADLINE: 'programDetail.infoCard.deadline'
    },
    APPLICATION_FORM: {
      TITLE: 'programDetail.applicationForm.title',
      MESSAGE_LABEL: 'programDetail.applicationForm.messageLabel',
      MESSAGE_PLACEHOLDER: 'programDetail.applicationForm.messagePlaceholder'
    },
    STATUS_CARD: {
      TITLE: 'programDetail.statusCard.title'
    },
    CONTACT_CARD: {
      TITLE: 'programDetail.contactCard.title'
    },
    AUTH_CARD: {
      TITLE: 'programDetail.authCard.title',
      MESSAGE: 'programDetail.authCard.message'
    }
  }
} as const;
