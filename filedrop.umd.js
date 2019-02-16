/**
 * From: https://github.com/GoogleChromeLabs/file-drop
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.fileDropElement={})}(this,function(t){function e(t,e){if(""===e)return Array.from(t).find(t=>"file"===t.kind);const i=e.toLowerCase().split(",").map(t=>t.split("/").map(t=>t.trim())).filter(t=>2===t.length);return Array.from(t).find(t=>{if("file"!==t.kind)return!1;const[e,n]=t.type.toLowerCase().split("/").map(t=>t.trim());for(const[t,r]of i)if(e===t&&("*"===r||n===r))return!0;return!1})}function i(t,i){const n=e(t.items,i);if(n)return n.getAsFile()||void 0}class n extends Event{constructor(t,e){var i,r;super(t,e),(i=this)instanceof(r=n)||Object.setPrototypeOf(i,r.prototype),this._file=e.file,this._action=e.action}get action(){return this._action}get file(){return this._file}}class r extends HTMLElement{constructor(){super(),this._dragEnterCount=0,this._onDragEnter=this._onDragEnter.bind(this),this._onDragLeave=this._onDragLeave.bind(this),this._onDrop=this._onDrop.bind(this),this._onPaste=this._onPaste.bind(this),this.addEventListener("dragover",t=>t.preventDefault()),this.addEventListener("drop",this._onDrop),this.addEventListener("dragenter",this._onDragEnter),this.addEventListener("dragend",()=>this._reset()),this.addEventListener("dragleave",this._onDragLeave),this.addEventListener("paste",this._onPaste)}get accept(){return this.getAttribute("accept")||""}set accept(t){this.setAttribute("accept",t)}_onDragEnter(t){if(this._dragEnterCount+=1,this._dragEnterCount>1)return;const i=!t.dataTransfer.items.length||!!e(t.dataTransfer.items,this.accept);this.classList.add(i?"drop-valid":"drop-invalid")}_onDragLeave(){this._dragEnterCount-=1,0===this._dragEnterCount&&this._reset()}_onDrop(t){t.preventDefault(),this._reset();const e=i(t.dataTransfer,this.accept);void 0!==e&&this.dispatchEvent(new n("filedrop",{action:"drop",file:e}))}_onPaste(t){const e=i(t.clipboardData,this.accept);void 0!==e&&this.dispatchEvent(new n("filedrop",{action:"paste",file:e}))}_reset(){this._dragEnterCount=0,this.classList.remove("drop-valid"),this.classList.remove("drop-invalid")}}customElements.define("file-drop",r),t.FileDropEvent=n,t.FileDropElement=r});
//# sourceMappingURL=filedrop.umd.js.map
