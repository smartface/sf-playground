import FlListViewIndexDesign from 'generated/my-components/FlListViewIndex';
import Screen from '@smartface/native/device/screen';
import Label from '@smartface/native/ui/label';
import { themeService } from 'theme';
const labelLayoutStyles = themeService.getNativeStyle('.flListViewIndex-label');
const labelStyles = themeService.getNativeStyle('.flListViewIndex-label');
const labelHeight = themeService.getNativeStyle('.flListViewIndex-label').height;

const FL_LIST_VIEW_INDEX_LOCK_TIMEOUT = 200;

export default class FlListViewIndex extends FlListViewIndexDesign {
  pageName?: string | undefined;
  lock: boolean = false;
  labels: Label[] = [];
  _values: string[] = [];
  _topMargin: number = 0;
  _onItemSelect: (selectedLabel: string) => void;
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
    this.on('touchMoved', (e) => {
      if (this._onItemSelect) {
        const selectedLabel = this.calculateItem(e.y);
        !this.lock && this._onItemSelect(selectedLabel);
        this.lock = true;
        setTimeout(() => (this.lock = false), FL_LIST_VIEW_INDEX_LOCK_TIMEOUT);
      }
    });
    this.on('touchEnded', (e) => {
      if (this._onItemSelect) {
        const selectedLabel = this.calculateItem(e.y);
        !this.lock && this._onItemSelect(selectedLabel);
        this.lock = true;
        setTimeout(() => (this.lock = false), FL_LIST_VIEW_INDEX_LOCK_TIMEOUT);
      }
    });
  }
  calculateItem(y: number) {
    return this._values[Math.round(y / labelHeight)] || this._values[this._values.length - 1];
  }
  set onItemSelect(value: (selectedLabel: string) => void) {
    this._onItemSelect = value;
  }
  set topMargin(value: number) {
    this._topMargin = value;
  }
  get topMargin(): number {
    return this._topMargin;
  }
  topToDispatch(): number {
    const height = (this._values || []).length * labelHeight;
    return (Screen.height - height) / 2;
  }
  set indexes(values: string[]) {
    this._values = values;
    values.forEach((value, index) => {
      const label = new Label({ ...labelLayoutStyles, ...labelStyles });
      label.text = value;
      this.addChild(label, `${value}/${index}`);
      this.labels.push(label);
    });
  }
}
