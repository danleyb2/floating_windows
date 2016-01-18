/**
 * Created by brian on 1/18/16.
 */


var myQuery= function () {


    var render = function (template, values) {
        var tags = template.match(/{\s*([\w]+)+\s*}/g);
        var keys = tags.map(function (v) {
            return v.replace(/{|}/g, '');
        });
        for (var i = 0; i < tags.length; i++) {
            template = template.replace(tags[i], values[keys[i].trim()]);
        }
        return toHtmlDom(template);
    };
    var toHtmlDom = function (html) {
        var el = document.createElement('div');
        el.innerHTML = html;
        return el.childNodes[0];
    };

    var OBJarray = function (a) {
        return [].slice.call(a);
    };

    var docById = function (id) {
        return document.getElementById(id);
    };

    var $ = function (selector, context) {
        context = context || document;
        return context.querySelector(selector);
    };

    var $$ = function (selector, context) {
        context = context || document;
        return OBJarray(context.querySelectorAll(selector));
    };

    var triggerEvent = function (el, eventName, detail) {
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, detail);
        el.dispatchEvent(event);
    };

    return{
        'render':render,
        'toHtmlDom':toHtmlDom,
        'OBJarray':OBJarray,
        'docById':docById,
        '$':$,
        '$$':$$,
        'triggerEvent':triggerEvent,

    }

};


var FW=function (holder_dom) {
    var q=myQuery();
    var canDismiss=true;
    var blockBG=true;
    var window_dom = q.$('body');
    var created_dom = document.createElement((holder_dom===undefined)?'div':holder_dom);

    var background_dom = document.createElement('div');
    //background_dom.id='background_dom_id';
    background_dom.onclick= function (e) {
        e.preventDefault();

        if(e.srcElement==background_dom) {
            console.log('dismiss floating window');
            if(canDismiss) {
                background_dom.style.display = 'none';
            }
        }

    };
    background_dom.style.display='None';

    //console.log(created_dom);

    var setInnerHTML= function(html,dom){
        if (dom===undefined) dom=background_dom;
        //dom.innerHTML=html
        created_dom= q.toHtmlDom(html)
    };
    var setWidth= function(){

    };
    var setHeight= function(){

    };
    var setBGColor= function(){

    };
    var getCreatedDom= function () {
      return created_dom;
    };
    var getToDom= function () {
        return window_dom;
    };
    var setBlocking= function (block_bg) {
        blockBG=block_bg;
    };

    var setCanDismiss= function (yes) {
        canDismiss=yes
    };
    var isDisplaying =function(){
        return background_dom.style.display != 'none';
    };

    var setStyle= function(styles,dom){
        if(dom===undefined) dom = created_dom;

        for(var k in styles){
            if (dom.style.hasOwnProperty(k)){
                dom.style[k] = styles[k];
            }else{
                console.warn('property for style [ '+k+' ] missing.')
            }
        }

    };
    var display=function(time){

        created_dom.style.display='block';

        //t=background_dom;

        if(blockBG) {
            background_dom.appendChild(created_dom);
            setStyle({
                "top":0,
                "bottom":0,
                "left":0,
                "width": "100%",
                "height": "100%",
                "display":"block",
                "backgroundColor": "rgba(39, 175, 95, 0.37)"
            },background_dom);
        }else{
            background_dom=created_dom;
            setStyle({
                "top":0,
                "right":"10px",
                "width": "200px",
                "height": "50px"
                //"backgroundColor": "rgba(39, 175, 95, 0.37)"

            },background_dom);
        }
        setStyle({
            "position": "absolute"
        },background_dom);


        window_dom.appendChild(background_dom);
        if(time!=undefined) {
            time_mill = time*1000;
            setTimeout(function () {
                //window_dom.remove(created_dom)
                background_dom.style.display = 'none';
            }, time_mill);
        }

    };


    return {
        'show':display,
        'css':setStyle,
        'html':setInnerHTML,
        'cdom':getCreatedDom,
        'tdom':getToDom,
        'dismissable':setCanDismiss,
        'blocking':setBlocking,
        'displaying':isDisplaying,
        'remove': function () {
            background_dom.style.display='none';
        }
    }

};