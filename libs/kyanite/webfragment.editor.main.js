export default{init:e=>{"use strict";e.addEventListener("component-dom-updated",(t=>{onContentDomUpdated(t,e)}))}};function onContentDomUpdated(e,t){const n=getClientIframe(t);if(!n)return;const{name:o,domNodes:d}=e.target,r=new CustomEvent("editor-component-dom-updated",{detail:{name:o,domNodes:d}});n.contentDocument.dispatchEvent(r)}function getEditorIframes(){return Array.from(document.body.querySelectorAll("iframe"))}function getClientIframe(e){return getEditorIframes().find((t=>t.src.indexOf(e.editedPage.path)))}