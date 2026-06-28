import{a as e}from"./rolldown-runtime-Cyuzqnbw.js";import{h as t,m as n}from"./charts-0NOBGwam.js";import{o as r,t as i}from"./motion-BTPbep6R.js";import{c as a,s as o}from"./ui-CoPMD1OS.js";import{a as s,d as c,n as l,p as u,u as d}from"./index-Dea51mCP.js";var f=e(t(),1),p=n(),m={"Explain closures in JavaScript":`A **closure** is a function that retains access to variables from its outer (lexical) scope, even after the outer function has returned.

**Example:**
\`\`\`js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
\`\`\`

Key points:
• Closures are created every time a function is created
• They enable data privacy and encapsulation
• Commonly used in callbacks, event handlers, and module patterns`,"What is the virtual DOM?":`The **Virtual DOM** is a lightweight JavaScript representation of the actual DOM.

**How it works:**
1. When state changes, React creates a new Virtual DOM tree
2. It diffs the new tree with the previous one (reconciliation)
3. Only the changed nodes are updated in the real DOM

**Benefits:**
• Minimizes expensive DOM operations
• Enables declarative UI programming
• Batches multiple updates for efficiency

This is why React can be very performant despite re-rendering components frequently.`,default:`That's a great question! Here's a structured approach to answering it:

1. **Define** the concept clearly
2. **Explain** how it works under the hood
3. **Provide** a practical example
4. **Discuss** trade-offs and best practices

Would you like me to elaborate on any specific aspect?`};function h(){let{user:e}=u(),[t,n]=(0,f.useState)(l[0].id),[h,g]=(0,f.useState)([{id:`1`,role:`ai`,content:`Hi! I'm your AI interview prep assistant. Choose a topic from the sidebar or ask me any technical question to practice. I'll help you prepare with detailed answers and explanations.`,time:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}]),[_,v]=(0,f.useState)(``),[y,b]=(0,f.useState)(!1),x=(0,f.useRef)(null),S=(0,f.useRef)(null),C=(0,f.useCallback)(()=>{x.current?.scrollIntoView({behavior:`smooth`})},[]);(0,f.useEffect)(()=>{C()},[h,y,C]);let w=(0,f.useCallback)(async e=>{if(!e.trim())return;let t={id:d(),role:`user`,content:e.trim(),time:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})};g(e=>[...e,t]),v(``),b(!0),await new Promise(e=>setTimeout(e,1500+Math.random()*1e3));let n=m[e.trim()]||m.default,r={id:d(),role:`ai`,content:n,time:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})};b(!1),g(e=>[...e,r])},[]),T=(0,f.useCallback)(e=>{e.preventDefault(),w(_)},[_,w]),E=(0,f.useCallback)(e=>{w(e)},[w]);return(0,p.jsxs)(`div`,{className:`interview-page`,children:[(0,p.jsxs)(`div`,{className:`chat-sidebar`,children:[(0,p.jsx)(`div`,{className:`chat-sidebar-header`,children:`Interview Topics`}),(0,p.jsx)(`div`,{className:`topic-list`,children:l.map(e=>(0,p.jsxs)(`div`,{className:`topic-item ${t===e.id?`active`:``}`,onClick:()=>n(e.id),role:`button`,tabIndex:0,onKeyDown:t=>t.key===`Enter`&&n(e.id),children:[(0,p.jsx)(`span`,{style:{marginRight:8},children:e.icon}),e.name]},e.id))})]}),(0,p.jsxs)(`div`,{className:`chat-main`,children:[(0,p.jsx)(`div`,{className:`chat-header`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h3`,{className:`chat-title`,children:`AI Interview Assistant`}),(0,p.jsxs)(`div`,{className:`chat-status`,children:[(0,p.jsx)(`span`,{className:`status-dot`}),(0,p.jsx)(`span`,{children:`Online`})]})]})}),(0,p.jsxs)(`div`,{className:`chat-messages`,role:`log`,"aria-live":`polite`,"aria-label":`Chat messages`,children:[h.map(t=>(0,p.jsxs)(i.div,{className:`chat-message ${t.role}`,initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:[(0,p.jsx)(`div`,{className:`message-avatar`,style:{background:t.role===`ai`?`linear-gradient(135deg, #6366f1, #06b6d4)`:`linear-gradient(135deg, #f59e0b, #ef4444)`,color:`#fff`},children:t.role===`ai`?(0,p.jsx)(o,{style:{fontSize:16}}):c(e?.name||`U`)}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`message-content`,children:t.content.split(`
`).map((e,n)=>(0,p.jsxs)(`span`,{children:[e,n<t.content.split(`
`).length-1&&(0,p.jsx)(`br`,{})]},n))}),(0,p.jsx)(`p`,{className:`message-time`,children:t.time})]})]},t.id)),(0,p.jsx)(r,{children:y&&(0,p.jsxs)(i.div,{className:`chat-message ai`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[(0,p.jsx)(`div`,{className:`message-avatar`,style:{background:`linear-gradient(135deg, #6366f1, #06b6d4)`,color:`#fff`},children:(0,p.jsx)(o,{style:{fontSize:16}})}),(0,p.jsxs)(`div`,{className:`typing-indicator`,children:[(0,p.jsx)(`span`,{}),(0,p.jsx)(`span`,{}),(0,p.jsx)(`span`,{})]})]})}),(0,p.jsx)(`div`,{ref:x})]}),(0,p.jsx)(`div`,{className:`suggested-questions`,children:s.map(e=>(0,p.jsx)(`button`,{className:`suggested-btn`,onClick:()=>E(e),children:e},e))}),(0,p.jsx)(`form`,{className:`chat-input-area`,onSubmit:T,children:(0,p.jsxs)(`div`,{className:`chat-input-wrapper`,children:[(0,p.jsx)(`input`,{ref:S,className:`chat-input`,type:`text`,placeholder:`Ask a technical question...`,value:_,onChange:e=>v(e.target.value),"aria-label":`Type your message`}),(0,p.jsx)(`button`,{type:`submit`,className:`send-btn`,disabled:!_.trim()||y,"aria-label":`Send message`,children:(0,p.jsx)(a,{style:{fontSize:18}})})]})})]})]})}export{h as default};