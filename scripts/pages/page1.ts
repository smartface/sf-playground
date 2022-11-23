import Page1Design from 'generated/pages/page1';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Permission from '@smartface/native/device/permission';
import { PermissionIOSAuthorizationStatus, PermissionResult, Permissions } from '@smartface/native/device/permission/permission';
import Location from '@smartface/native/device/location';
import Hardware from '@smartface/native/device/hardware';

export default class Page1 extends withDismissAndBackButton(Page1Design) {
    constructor(private router?: Router, private route?: Route) {
        super({});

        // Camera
        this.btnRequestCamera.onPress = () => {
            Permission.requestPermission('camera')
                .then((status) => {
                    console.info("Camera Request Status: ", status)
                    console.info("Camera Request Status is Granted: ", PermissionResult[status]);
                })
                .catch(err => console.error("Camera Request Error", err))
        }

        this.btnGetCameraAuthorization.onPress = () => {
            const status = Permission.ios.getAuthorizationStatus('camera')
            console.info("Camera Status: ", status)
            console.info("Camera Status enum: ", PermissionResult[status]);
        }

        // PhotoLibrary
        this.btnRequestPhotoLibrary.onPress = () => {
            Permission.requestPermission(Permissions.storage)
                .then((status) => {
                    console.info("PhotoLibrary Request Status: ", status)
                    console.info("PhotoLibrary Status is Granted: ", PermissionResult[status]);
                })
                .catch(err => console.error("PhotoLibrary Error", err))
        }

        this.btnGetPhotoLibrary.onPress = () => {
            const status = Permission.ios.getAuthorizationStatus(Permissions.storage)
            console.info("PhotoLibrary Request Status: ", status)
            console.info("PhotoLibrary Status is Granted: ", PermissionIOSAuthorizationStatus[status]);
        }


        // Location
        this.btnRequestLastKnownLocation.onPress = async () => {
            console.log("last known location")
            Permission.requestPermission(Permissions.location)
                .then((status) => {
                    console.info("getCurrentLocation Request Status: ", status)
                    console.info("getCurrentLocation Status is Granted: ", PermissionResult[status]);
                })
                .catch(err => console.error("getCurrentLocation Error", err))
        }

        this.btnGetLastKnownLocationStatus.onPress = () => {
            const status = Permission.ios.getAuthorizationStatus(Permissions.location)
            console.info("LOCATION > STATUS: ", status)
            console.info("LOCATION > STATUS: ", PermissionIOSAuthorizationStatus[status])
        }
    }
    /**
     * @event onShow
     * This event is called when a page appears on the screen (everytime).
     */
    onShow() {
        console.info("Page1e")
        super.onShow();
        this.initBackButton(this.router);
    }

    /**
     * @event onLoad
     */
    onLoad() {
        super.onLoad();
    }
}
