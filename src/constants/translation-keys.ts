export const T_KEYS = {
  COMMON: {
    BUTTONS: {
      SEND: 'common.buttons.send',
      SENDING: 'common.buttons.sending',
      JOIN: 'common.buttons.join',
      LOGIN: 'common.buttons.login',
      CANCEL: 'common.buttons.cancel',
      GET_IN_TOUCH: 'common.buttons.getInTouch',
      OUR_SERVICES: 'common.buttons.ourServices',
      BACK_TO_HOME: 'common.buttons.backToHome'
    },
    NAVIGATION: {
      LEADERSHIP: 'common.navigation.leadership',
      LEGAL_HELP: 'common.navigation.legalHelp',
      PROSTHETICS: 'common.navigation.prosthetics',
      FAMILY_TO_FAMILY: 'common.navigation.familyToFamily',
      OUR_ACTIVITIES: 'common.navigation.ourActivities',
      ABOUT_US: 'common.navigation.aboutUs'
    },
    ERRORS: {
      PAGE_NOT_FOUND: 'common.errors.pageNotFound'
    }
  },
  FORM: {
    LABELS: {
      NAME: 'form.labels.name',
      EMAIL: 'form.labels.email',
      SUBJECT: 'form.labels.subject',
      MESSAGE: 'form.labels.message',
      SUBSCRIBE: 'form.labels.subscribe'
    },
    PLACEHOLDERS: {
      NAME: 'form.placeholders.name',
      EMAIL: 'form.placeholders.email',
      SUBJECT: 'form.placeholders.subject',
      MESSAGE: 'form.placeholders.message'
    },
    VALIDATION: {
      REQUIRED: 'form.validation.required',
      MIN_LENGTH: 'form.validation.minLength',
      EMAIL: 'form.validation.email'
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
      EMAIL_LABEL: 'auth.register.emailLabel',
      PHONE_LABEL: 'auth.register.phoneLabel',
      PASSWORD_LABEL: 'auth.register.passwordLabel',
      CONFIRM_PASSWORD_LABEL: 'auth.register.confirmPasswordLabel',
      SUBMIT: 'auth.register.submit',
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
  }
} as const; 