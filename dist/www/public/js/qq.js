/**
 * Created by amos on 14-8-9.
 * Maintained and developed by vergil since 2015/02/01
 */
(function(global){
    if(global.__WPA){
        return;
    }

    //speed report
    var flag1 = 21848,
        flag2 = 1,
        flag3 = 1,
        flag_loaded = 28,
        reportCgi = 'http://report.huatuo.qq.com/report.cgi';

    //to avoid the difference when the api is not the same due to the different protocols
    if (location.protocol.indexOf('https') !== -1) {
        reportCgi = 'https://report.huatuo.qq.com/report.cgi';
    }

    var platform = 'pc',
        ua = navigator.userAgent;

    if (/(?:iphone|ipad|ipod)/i.test(ua)) {
        platform = 'ios';
    } else if(/android/i.test(ua)) {
        platform = 'android';
    }

    // conf
    var 
        // env can be preset by global.__WPAENV
        env = global.__WPAENV || 'production',
        version = '4.1.0',        
        // support file protocol
        //寮哄埗protocol涓篽ttps
        protocol = 'https:',//location.protocol.indexOf('http') > -1 ? location.protocol : 'http:',
        hostMap = {
            development: 'dev',
            test: 'oa'
        },

        // static base can be preset by global.__WPASTATICBASE
        //todo
        //if it is https, then 'combo' should be prefixed with 'ssl'


        //staticBase = global.__WPASTATICBASE || protocol + '//' + (hostMap[env] || '') + 'combo.b.qq.com/qidian/wpa/dist/' + version,
        //鏈湴寮€鍙戞椂浼氭墜鍔ㄤ紶鍏taticBase,鎵€浠ヤ笉鑳界洿鎺ヨ鐩栨帀锛屽厛鍒ゆ柇鏄惁鏄湰鍦扮殑
        staticBase = global.__WPASTATICBASE,// || protocol + '//' + (hostMap[env] || '') + 'combo.b.qq.com/qidian/src/wpa/dist/' + version,

        host = protocol + '//' + (hostMap[env] || '') + 'wp.qiye.qq.com',
        // base can be preset by global.__WPABASE
        base = global.__WPABASE || host,
        // base can be preset by global.__WPAAPIBASE
        apiBase = global.__WPABAPIASE || host + '/api',
        stack = [],
        apiStack = [],
        tmpEventBucket = {},
        charset = 'utf-8'; 

    //閲嶅啓staticBase涓篻timg鍩熷悕鐨�
    if (!staticBase) {
        if (env === 'development') {
            staticBase = 'https://dev.gtimg.com';
            staticBase += '/qidian/src/wpa/dist/' + version;
        } else if (env === 'test') {
            staticBase = 'https://oa.gtimg.com';
            staticBase += '/qidian/src/wpa/dist/' + version;
        } else {
            staticBase = 'https://bqq.gtimg.com';
            staticBase += '/qidian/src/wpa/dist/' + version;
        }

        // staticBase += '/qidian/src/wpa/dist/' + version;
    }
    

    // fetch
    var doc = document,
        head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement,
        baseElement = head.getElementsByTagName("base")[0],
        currentlyAddingScript;

    function fetch(uri) {
        var node = doc.createElement("script"),
            sTime;

        node.charset = charset;
        node.async = true;
        node.src = uri;
        node.id = 'LBFnode';

        // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
        // the end of the insert execution, so use `currentlyAddingScript` to
        // hold current node, for deriving uri in `define` call
        currentlyAddingScript = node;

        node.onload = node.onreadystatechange = function() {
            if(!this.readyState || this.readyState=='loaded' || this.readyState=='complete') {
                var eTime = +new Date(),
                    timeCost = eTime - sTime;
                // console.log('loading pk1.js time:' + (eTime - sTime));
                var r = new Image(),
                    params = 'flag1=' + flag1 + '&flag2=' + flag2 + '&flag3=' + flag3 + '&' + flag_loaded + '=' + timeCost;
                r.src = reportCgi + '?appid=20282&platform=' + platform + '&speedparams=' + encodeURIComponent(params);
            }
        };

        //start to load pk1.js
        sTime = +new Date();
        // ref: #185 & http://dev.jquery.com/ticket/2709
        baseElement ?
            head.insertBefore(node, baseElement) :
            head.appendChild(node);

        currentlyAddingScript = null;
    }

    function getScriptPosition() {
        var scripts = document.getElementsByTagName('script');
        return scripts.length > 0 ? scripts[scripts.length - 1] : null;
    }


    // Public API

    var exports = global.__WPA = {
        version: version,

        base: base,

        staticBase: staticBase,

        apiBase: apiBase,

        env: env,

        protocol: protocol,

        create: function(data){
            data.scriptPosition = getScriptPosition();
            stack.push(data);
        },

        on: function(type, cb){
            tmpEventBucket[type] ?
                tmpEventBucket[type].push(cb) :
                tmpEventBucket[type] = [cb];
        },

        api: function(){
            apiStack.push(arguments);
        },

        ready: function(onReady){
            exports.on('load', onReady);
        },

        getScriptPosition: getScriptPosition,

        _stack: stack,

        _apiStack: apiStack,

        _evtBkt: tmpEventBucket
    };

    // fetch packed modules
    fetch(staticBase + '/pk1.js');
})(this);
__WPA.create({"id":114,"fkfuin":2852153681,"fkfext":744620679,"fkfextname":"admin4","cate":1,"type":5,"isCorpUin":0,"scene":0,"name":"\u76f4\u8fbe\u671f\u8d27\u63a5\u5f85\u7ec4\u4ef6","createTime":1541476965,"createrUin":744620679,"createrName":"admin4","title":"\u5728\u7ebf\u54a8\u8be2","signature":"","btnText":"\u7acb\u5373\u54a8\u8be2","avatar":"\/\/bqq.gtimg.com\/qidian\/src\/sites\/srv\/wpa\/conf\/wpa\/avatar\/1-2.png?20160606","position":0,"btnBgColor":{"index":"0","value":"#12b7f5"},"theme":0,"key":"55648fd2d6abc35519c2b5f0bdd8367e","imUrl":"http:\/\/q.url.cn\/cdj8DM?_type=wpa&qidian=true","custom":{"wpaLocation":{"v":{"type":"2","px":"0"},"h":{"type":"3","px":"10"}}},"location":{"v":{"type":"2","px":"0"},"h":{"type":"3","px":"10"}},"roleQQ":{"forid":182,"type":1,"value":0,"name":"\u62db\u5546\u90e8\u603b\u76d1(admin4)","uin":744620679,"data":"744620679","isDisabled":0,"isKfuin":0}});