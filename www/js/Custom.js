
//APP關閉程式
function exitFromApp() {
    navigator.app.exitApp();
}


//回首頁
function goIndex() {
    window.location.href = "index.html";
}

//APP播放音效
function doPlay(type, uuid) {

    if (uuid == "123456789012345") {
        if (type == 'error') {
            alert('ERROR 振動');
        }
        else {
            alert('PASS音效');
        }
    }
    else {
        var mp3URL = getMediaURL("sound/" + type + ".mp3");
        var media = new Media(mp3URL, null, mediaError);
        media.play();
        if (type == 'error') {
            navigator.vibrate(2000);
        }
    }
}

function getMediaURL(s) {
    if (device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
    return s;
}

function mediaError(e) {
    alert('Media Error');
    alert(JSON.stringify(e));
}

//getUrlVars function
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//Gen left List
function genleftlist() {

    var rowli = "";

    rowli = rowli + "<li><a href=\"sap_picklist_out.html\" data-ajax=\"false\" style=\"color: #156691; font-weight: 600\">出貨作業清單(SAP)</a></li>";
    rowli = rowli + "<li><a href=\"pda_picklist_out.html\" data-ajax=\"false\" style=\"color: #156691; font-weight: 600\">出貨作業清單(PDA)</a></li>";
    rowli = rowli + "<li><a href=\"sap_checklist.html\" data-ajax=\"false\" style=\"color: #156691; font-weight: 600\">出貨作業重讀重載刪除(SAP)</a></li>";
    rowli = rowli + "<li><a href=\"sap_movelist_out.html\" data-ajax=\"false\" style=\"color: #FA9100; font-weight: 600\">新增儲格異動作業(SAP)</a></li>";
    rowli = rowli + "<li><a href=\"pda_movelist_out.html\" data-ajax=\"false\" style=\"color: #FA9100; font-weight: 600\">儲格異動作業(PDA)</a></li>";
    rowli = rowli + "<li><a href=\"sap_dmovelist_out.html\" data-ajax=\"false\" style=\"color: #AA000A; font-weight: 600\">新增調撥出庫作業(SAP)</a></li>";
    rowli = rowli + "<li><a href=\"pda_dmovelist_out.html\" data-ajax=\"false\" style=\"color: #AA000A; font-weight: 600\">調撥出庫作業(PDA)</a></li>";
    rowli = rowli + "<li><a href=\"sap_checklist_dmovelist_out.html\" data-ajax=\"false\" style=\"color: #AA000A; font-weight: 600\">調撥出庫作業重載刪除(SAP)</a></li>";
    rowli = rowli + "<li><a href=\"sap_dmovelist_in.html\" data-ajax=\"false\" style=\"color: #32712D; font-weight: 600\">新增調撥入庫作業(SAP)</a></li>";
    rowli = rowli + "<li><a href=\"pda_dmovelist_in.html\" data-ajax=\"false\" style=\"color: #32712D; font-weight: 600\">調撥入庫作業(PDA)</a></li>";
    rowli = rowli + "<li><a href=\"sap_checklist_dmovelist_in.html\" data-ajax=\"false\" style=\"color: #32712D; font-weight: 600\">調撥入庫作業重載刪除(SAP)</a></li>";
    rowli = rowli + "<li><a href=\"#\" onclick=\"exitFromApp();\" data-ajax=\"false\" style=\"color: #545454; font-weight: 600\">離開程式</a></li>";

    $("#ulleftlist").empty();
    $("#ulleftlist").append(rowli);
    $("#ulleftlist").listview("refresh");
}

//Page Initial
function init() {

    //Gen left List
    genleftlist();

    uuid = window.localStorage.getItem("uuid");
    env = window.localStorage.getItem("env");
    app_version = window.localStorage.getItem("app_version");

    $("#lbluuid").html(uuid);
    $("#lblenv").html(env + "/" + app_version);

    $("#lblenvtitle").html(env + "/" + app_version);

    //$.ajax({
    //    url: "http://202.3.166.109/pdaweb/web%20site/",
    //    type: "HEAD",
    //    //async: false,
    //    timeout: 1000,
    //    statusCode: {
    //        200: function (response) {

    //        },
    //        400: function (response) {
    //            alert('網路異常400');
    //            window.location.href = "index.html";
    //        },
    //        0: function (response) {
    //            alert('網路異常0');
    //            window.location.href = "index.html";
    //        }
    //    }
    //});

    document.addEventListener("deviceready", onDeviceReady, false);
}

function lengthInUtf8Bytes(str) {
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
}

//側邊欄效果
$(document).on("pageinit", "#page", function () {
    $(document).on("swipeleft swiperight", "#page", function (e) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
            if (e.type === "swipeleft") {
                $("#right-panel").panel("open");
            }
        }
    });
});


