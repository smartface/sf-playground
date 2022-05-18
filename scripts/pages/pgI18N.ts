import PgI18NDesign from 'generated/pages/pgI18N';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { i18n } from '@smartface/i18n';
import Picker from '@smartface/native/ui/picker';

export default class PgI18N extends withDismissAndBackButton(PgI18NDesign) {
  private _languagePicker: Picker;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnSetLanguage.on('press', () => this._languagePicker.show());
    this.tv.scrollEnabled = true;
  }

  initLanguagePicker() {
    this._languagePicker = new Picker();
    const items = ['en', 'tr'];
    this._languagePicker.items = items;
    this._languagePicker.on('selected', (index) => {
      this._languagePicker.currentIndex = index;
      console.info('selected: ', index);
      i18n.changeLanguage(items[index]);
    });
    i18n.on('change', (locale) => {
      console.info('i18n.onChange: ', locale);
      this.testI18N();
    });
  }

  testI18N() {
    const author = {
      name: 'John',
      github: 'johnwick'
    };

    // You can add custom formatters to!
    i18n.instance.services.formatter.add('lowercase', (value) => {
      return value.toLowerCase();
    });
    i18n.instance.services.formatter.add('underscore', (value) => {
      return value.replace(/\s+/g, '_');
    });

    this.tv.text = `
----- Basic Interpolation -----
${i18n.instance.t('myKey')}
${i18n.instance.t('interpolationKey', { what: 'Smartface' })}
${i18n.instance.t('dataModelInterpolationKey', { author })}

----- Formatting -----
${i18n.instance.t('intlNumber', { val: 1000 })}
${i18n.instance.t('intlNumber', { val: 1000.1, minimumFractionDigits: 3 })}
${i18n.instance.t('intlNumberWithOptions', { val: 2000, minimumFractionDigits: 3 })}
${i18n.instance.t('intlNumberWithOptions', { val: 2000.1234, minimumFractionDigits: 3 })}

----- Override this translation to English -----
${i18n.instance.t('interpolationKey', { what: 'Smartface', lng: 'en' })}

----- Custom Formatter (Double formatter) -----
${i18n.instance.t('customFormatter', { LOWER_VALUE: 'SMARTFACE HELLO' })}

----- Money -----
${i18n.instance.t('intlCurrencyWithOptionsSimplified', { val: 2000 })}
${i18n.instance.t('intlCurrencyWithOptions', { val: 2300 })}
${i18n.instance.t('twoIntlCurrencyWithUniqueFormatOptions', {
  localValue: 12345.67,
  altValue: 16543.21,
  formatParams: {
    localValue: { currency: 'USD', locale: 'en-US' },
    altValue: { currency: 'CAD', locale: 'fr-CA' }
  }
})}

----- Date -----
${i18n.instance.t('intlDateTime', { val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)) })}
${i18n.instance.t('intlDateTime', {
  val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
  formatParams: {
    val: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }
})}

----- Relative Time -----
${i18n.instance.t('intlRelativeTime', { val: 3 })}
${i18n.instance.t('intlRelativeTimeWithOptions', { val: -3 })}
${i18n.instance.t('intlRelativeTimeWithOptionsExplicit', { val: -3 })}
${i18n.instance.t('intlRelativeTimeWithOptionsExplicit', { val: -3, style: 'long' })}

----- List -----
${i18n.instance.t('intlList', { val: ['localization', 'smartface-i18n', 'awesomeness'] })}

----- Plurals -----
${i18n.instance.t('key', { count: 0 })}
${i18n.instance.t('key', { count: 1 })}
${i18n.instance.t('key', { count: 5 })}
${i18n.instance.t('key', { count: 100 })}
${i18n.instance.t('keyWithCount', { count: 0 })}
${i18n.instance.t('keyWithCount', { count: 1 })}
${i18n.instance.t('keyWithCount', { count: 5 })}
${i18n.instance.t('keyWithCount', { count: 100 })}

----- Nesting -----
${i18n.instance.t('nesting1')}
${i18n.instance.t('girlsAndBoys', { girls: 3, boys: 2 })}

----- Context -----
${i18n.instance.t('nesting1')}
${i18n.instance.t('girlsAndBoys', { girls: 3, boys: 2 })}
${i18n.instance.t('friend')}
${i18n.instance.t('friend', { context: 'male' })}
${i18n.instance.t('friend', { context: 'female' })}

----- Objects -----
${i18n.instance.t('tree', { returnObjects: true, something: 'gold' })}
${i18n.instance.t('array', { returnObjects: true })}

----- Array -----
${i18n.instance.t('arrayJoin', { joinArrays: '+' })}
${i18n.instance.t('arrayJoinWithInterpolation', { myVar: 'interpolate', joinArrays: ' ' })}
${i18n.instance.t('arrayOfObjects.0.name')}`;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.testI18N();
  }

  onLoad() {
    super.onLoad();
    this.initLanguagePicker();
  }
}
