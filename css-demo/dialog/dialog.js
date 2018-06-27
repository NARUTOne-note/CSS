/**
 * 模拟模态框
 * @author NARUTOne
 */

const HIDE_PIRECLS = 'dialog-hiddle';

function dialog (options) {
  if(typeof options !== 'object') {
    new Error('dialog options should is object type !');
    return
  }

  const defaultOptions = {
    width: 520,
    className: '',
    headerText: '', // htmlNode/string
    bodyText: '', // htmlNode/string
    footerText: '' // htmlNode/string
  };

  this.name = 'dialog';
  this.options = Object.assign({}, defaultOptions, options);
  this.visible = false;

  this.open = function (options) {
    this.options = Object.assign({}, this.options, options);
    this.visible = true;
    const antClass = this._animation();
    const className = antClass + ' ' + this.options.className;
    this._render(className);
    setTimeout(() => {
      const dialogEle = document.getElementById('dialog');
      this._removeClass(dialogEle, antClass);
      this._onClose();
    }, 600)
  }
}

dialog.prototype = {
  constructor: dialog,
  _render: function (className) {
    let ele = document.getElementById('dialog-box');
    const {width, headerText, bodyText, footerText} = this.options;
    const isHideClass = this.visible ? '' : HIDE_PIRECLS;

    if (ele) {
      document.body.removeChild(ele);
      ele = null;
    }

    const dialogDomTree = `
      <div class="dialog-transfer ${isHideClass} ${className}" id="dialog">
        <div class="dialog-mask"></div>
        <div class="dialog-wrap" id="mask-dialog">
          <div class="dialog-modal">
            <div class="dialog-content" style="width: ${width}px;">
              <a class="dialog-close" id="close-dialog">X</a>
              <div class="dialog-header">${headerText}</div>
              <div class="dialog-body">${bodyText}</div>
              <div class="dialog-footer">${footerText}</div>
            </div>
          </div>
        </div>
      </div>
    `
    const div = document.createElement('div');
    div.id = 'dialog-box'
    div.innerHTML = dialogDomTree;
    document.body.appendChild(div);
  },
  _onClose: function () {
    const close = document.getElementById('close-dialog');
    const mask = document.getElementById('mask-dialog');

    close.addEventListener('click', () => {this._close()}, false);
    mask.addEventListener('click', () => {this._close()}, false);
  },
  _close: function () {
    this.visible = false;
    const dialogEle = document.getElementById('dialog');
    const close = document.getElementById('close-dialog');
    const mask = document.getElementById('mask-dialog');
    const antClass = this._animation();
    this._addClass(dialogEle, antClass);
    setTimeout(() => {
      this._addClass(dialogEle, HIDE_PIRECLS);
      this._removeClass(dialogEle, antClass);
      close.removeEventListener('click', () => {this._close()}, false);
      mask.removeEventListener('click', () => {this._close()}, false);
    }, 600)
  },
  _animation: function () {
    const ANI_PREFIXCLS = {
      open: 'transfer-enter-active transfer-appear',
      close: 'transfer-leave-active'
    }
    return this.visible ? ANI_PREFIXCLS['open']: ANI_PREFIXCLS['close'];
  },
  _getEle: function () {
    return document.getElementById('dialog');
  },
  _hasClass: function (elements, cName) {
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断  
  },
  _removeClass: function (ele, cName) {
    if( this._hasClass(ele, cName) ){
      ele.className = ele.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ),"" ); // replace方法是替换  
    };  
  },
  _addClass: function (ele, cName) {
    if ( !this._hasClass(ele, cName)) {
      ele.className += " " + cName;
    }
  }
}

const data = [
  {
    qa: '如何关联/导入包裹?',
    as: '您好，是否健康快速的回复会计师会计发货时就开始疯狂水电费水电费'
  },
  {
    qa: '如何关联/导入包裹?',
    as: '您好，是否健康快速的回复会计师会计发货时就开始疯狂水电费水电费'
  },
  {
    qa: '如何关联/导入包裹?',
    as: '您好，是否健康快速的回复会计师会计发货时就开始疯狂水电费水电费'
  }
];

window.onload = () => {
  var infoEle = document.getElementById('info');
  var dialogObj = new dialog({});

  const lis = data.map((item, index) => {
    const {qa, as} = item;
    return `<li data-index="${index}">${qa}</li>`;
  }).join('');

  infoEle.innerHTML = lis;

  infoEle.addEventListener('click', (ev)=>{
    var target = ev.target;
    if (target.tagName === 'LI' || target.nodeName.toLowerCase() == "li") {
      const index = target.getAttribute('data-index');
      console.log(index)
      const content = data[index - 0];
      const obj = {
        headerText: `<h3>${content['qa']}</h3>`,
        bodyText: `<div class="doc">${content['as']}</div>`
      };
      dialogObj.open(obj);
    }
  }, false)
}