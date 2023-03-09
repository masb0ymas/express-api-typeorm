import { logServer } from '@core/helpers/formatter'
import i18next from 'i18next'
import i18nextBackend from 'i18next-fs-backend'

void i18next.use(i18nextBackend).init(
  {
    lng: 'id',
    fallbackLng: 'id',
    preload: ['en', 'id'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
    },
  },
  (err, _t) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(logServer('i18next', 'is ready...'))
  }
)

export const i18nConfig = i18next
