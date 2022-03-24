import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '@assets/langs/en.json';
import ko from '@assets/langs/ko.json';

i18n.fallbacks = true;
i18n.translations = { en, ko };
i18n.locale = Localization.locale || 'ko';

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? // @ts-ignore
      TKey | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : TKey;
}[keyof TObj & string];
