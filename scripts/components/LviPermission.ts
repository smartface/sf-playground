import Permission from '@smartface/native/device/permission';
import { Permissions } from '@smartface/native/device/permission/permission';
import LviPermissionDesign from 'generated/my-components/LviPermission';

export default class LviPermission extends LviPermissionDesign {
    pageName?: string | undefined;
    isHavePermission: boolean;
    _isCommon: boolean;
    _hasParent: boolean;
    _parentPermission: string;
    _requestPermissionOnClick: (...args) => void;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.btnRequest.on('press', async () => {
            if (this._isCommon) {
                if (this._parentPermission) {
                    await Permission.requestPermission(Permissions[this._parentPermission][this.title])
                } else {
                    await Permission.requestPermission(Permissions[this.title])
                }
                this._requestPermissionOnClick();
            } else {
                await Permission.requestPermission(Permissions.android[this.title]);
                this._requestPermissionOnClick();
            }
        })
    }

    get title(): string {
        return this.lblTitle.text;
    }

    set title(value: string) {
        this.lblTitle.text = value;
    }

    get result(): boolean {
        return this.isHavePermission;
    }

    set result(value: boolean) {
        this.isHavePermission = value;
        if (this.isHavePermission) {
            this.lblResult.text = 'true';
            this.btnRequest.enabled = false;
        }
        else {
            this.lblResult.text = 'false';
            this.btnRequest.enabled = true;
        }
    }

    get isCommon(): boolean {
        return this._isCommon;
    }

    set isCommon(value: boolean) {
        this._isCommon = value;
    }

    get requestPermissionOnClick(): (...args) => void {
        return this._requestPermissionOnClick;
    }
    set requestPermissionOnClick(value: (...args) => void) {
        this._requestPermissionOnClick = value;
    }

    get hasParent(): boolean {
        return this._hasParent;
    }

    set hasParent(value: boolean) {
        this._hasParent = value;
    }

    get parentPermission(): string {
        return this._parentPermission;
    }

    set parentPermission(value: string) {
        this._parentPermission = value;
    }
}
