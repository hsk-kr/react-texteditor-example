(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[738],{21237:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return b}});var n=l(86771),o=l(3937),s=l(72534),r=l(20363),a=l.n(r);l(12440),l(32246);let y=[{label:"H1",style:"header-one",styleType:"block"},{label:"H2",style:"header-two",styleType:"block"},{label:"H3",style:"header-three",styleType:"block"},{label:"Bold",style:"BOLD",styleType:"inline"},{label:"Italic",style:"ITALIC",styleType:"inline"},{label:"Underline",style:"UNDERLINE",styleType:"inline"},{label:"Blockquote",style:"blockquote",styleType:"block"},{label:"UL",style:"unordered-list-item",styleType:"block"},{label:"OL",style:"ordered-list-item",styleType:"block"}],i=e=>{let{label:t,active:l,onToggle:o}=e;return(0,n.jsx)("button",{type:"button",className:"text-gray-500 text-sm p-1 hover:text-secondary hover:font-bold ".concat(l?"text-secondary font-bold":""),onClick:o,children:t})},c=e=>{let{editorState:t,onEditorStateChange:l}=e,o=e=>()=>{l("block"===e.styleType?s.RichUtils.toggleBlockType(t,e.style):s.RichUtils.toggleInlineStyle(t,e.style))},r=t.getSelection(),a=t.getCurrentContent().getBlockForKey(r.getStartKey()).getType(),c=t.getCurrentInlineStyle();return(0,n.jsx)("div",{className:"min-h-12 max-h-24 flex gap-1 p-2 border-b-gray-800 border flex-wrap",children:y.map(e=>{let t="block"===e.styleType?a===e.style:c.has(e.style);return(0,n.jsx)(i,{label:e.label,active:t,onToggle:o(e)},e.label)})})};function b(e){let{onChange:t}=e,[l,r]=(0,o.useState)(()=>s.EditorState.createEmpty());return(0,o.useEffect)(()=>{let e=(0,s.convertToRaw)(l.getCurrentContent()),n=a()(e);t(n)},[l]),(0,n.jsxs)("div",{className:"h-full flex flex-col",children:[(0,n.jsx)(c,{editorState:l,onEditorStateChange:r}),(0,n.jsx)("div",{className:"h-[0] min-h-[0] flex-[1] disable-tailwind overflow-y-auto",children:(0,n.jsx)(s.Editor,{editorState:l,onChange:r})})]})}},32246:function(){}}]);