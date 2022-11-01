import PgPermissionDesign from 'generated/pages/pgPermission';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Permission from '@smartface/native/device/permission';
import { Permissions } from '@smartface/native/device/permission/permission';
import LviPermission from 'components/LviPermission';
interface Result{
    title:string,
    result:boolean,
    isCommon:boolean,
    hasParent:boolean,
    parentPermission?:string
}
export default class PgPermission extends withDismissAndBackButton(PgPermissionDesign) {
    dataSet: Result[] = [];
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    cameraPermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.camera);
        this.dataSet.push({
            title: 'camera',
            isCommon: true,
            hasParent: false,
            result
        })
    }
    storagePermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.storage);
        this.dataSet.push({
            title: 'storage',
            isCommon: true,
            hasParent: false,
            result
        })
    }
    storageReadImageAndVideoPermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.storage.readImageAndVideo);
        this.dataSet.push({
            title:'readImageAndVideo',
            isCommon:true,
            hasParent:true,
            parentPermission:'storage',
            result
        })
    }
    storageReadAudioPermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.storage.readAudio);
        this.dataSet.push({
            title:'readAudio',
            isCommon:true,
            hasParent:true,
            parentPermission:'storage',
            result
        })
    }
    locationPermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.location);
        this.dataSet.push({
            title: 'location',
            isCommon:true,
            hasParent: false,
            result
        })
    }
    locationPrecisePermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.location.precise);
        this.dataSet.push({
            title:'precise',
            isCommon:true,
            hasParent:true,
            parentPermission:'location',
            result
        })
    }
    locationApproximatePermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.location.approximate);
        this.dataSet.push({
            title:'approximate',
            isCommon:true,
            hasParent:true,
            parentPermission:'location',
            result
        })
    }
    bluetoothConnectPermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.android.bluetoothConnect);
        this.dataSet.push({
            title: 'bluetoothConnect',
            isCommon:false,
            hasParent: false,
            result
        })
    }
    microphonePermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.android.microphone);
        this.dataSet.push({
            title: 'microphone',
            isCommon:false,
            hasParent: false,
            result
        })
    }

    notificationPermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.android.notification);
        this.dataSet.push({
            title:'notification',
            isCommon:false,
            hasParent: false,
            result
        })
    }

    phonePermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.android.phone);
        this.dataSet.push({
            title:'phone',
            isCommon:false,
            hasParent: false,
            result
        })
    }

    contactPermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.android.contact);
        this.dataSet.push({
            title:'contact',
            isCommon:false,
            hasParent: false,
            result
        })
    }

    smsPermissionResult = () => {
        const result = Permission.android.checkPermission(Permissions.android.sms);
        this.dataSet.push({
            title:'sms',
            isCommon:false,
            hasParent: false,
            result
        })
    }
    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    initListView() {
        this.lviMain.itemCount = this.dataSet.length;
        this.lviMain.refreshEnabled = false;
        this.lviMain.onRowBind = (listViewItem: LviPermission, index) => {
            listViewItem.title = this.dataSet[index].title;
            listViewItem.result = this.dataSet[index].result;
            listViewItem.isCommon = this.dataSet[index].isCommon;
            listViewItem.hasParent = this.dataSet[index].hasParent;
            if(this.dataSet[index].hasParent){
                listViewItem._parentPermission = this.dataSet[index].parentPermission;
            }
            listViewItem._requestPermissionOnClick = () => {
                this.refreshListView();
            }
        }
    }

    initDataSet(){
        this.dataSet = [];
        this.cameraPermissionResult();
        this.storagePermissionResult();
        this.storageReadImageAndVideoPermissionResult();
        this.storageReadAudioPermissionResult();
        this.locationPermissionResult();
        this.locationPrecisePermissionResult();
        this.locationApproximatePermissionResult();
        this.bluetoothConnectPermissionResult();
        this.microphonePermissionResult();
        this.notificationPermissionResult();
        this.phonePermissionResult();
        this.contactPermissionResult();
        this.smsPermissionResult();
    }

    refreshListView(){
        this.initDataSet();
        this.lviMain.itemCount = this.dataSet.length;
        this.lviMain.refreshData();
    }
    onShow() {
        super.onShow();
        this.initBackButton(this.router);
    }

    

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
        this.initDataSet();
        this.initListView();
    }
}
