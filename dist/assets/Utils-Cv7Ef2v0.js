import{m as g}from"./manageService--yb_khzw.js";import{d as f,r as h,y as k,c as n,b as p,F as u,h as c,l as x,t as m,k as _,i as y,p as v,m as L,a as d,o as t}from"./index-BTTWJajJ.js";const w=["src"],D=f({__name:"Utils",setup(B){const l=h([]);return k(()=>{}),(async()=>{const a=await g.getDataList("utils")||[];l.value=a==null?void 0:a.reduce((e,r)=>{const s=r.type;return e[s]||(e[s]=[]),e[s].push(r),e},{})})(),(a,e)=>{const r=d("el-link"),s=d("el-space");return t(),n("div",null,[e[0]||(e[0]=p("h1",null,"工具",-1)),(t(!0),n(u,null,c(l.value,i=>(t(),n("div",null,[p("h4",null,m(i[0].type),1),x(s,{wrap:"",size:12},{default:_(()=>[(t(!0),n(u,null,c(i,(o,N)=>(t(),y(r,{href:o.link,target:"_blank"},{default:_(()=>[o.logo?(t(),n("img",{key:0,style:{width:"20px",height:"20px","margin-right":"5px"},src:o.logo},null,8,w)):v("",!0),L(" "+m(o.name),1)]),_:2},1032,["href"]))),256))]),_:2},1024)]))),256))])}}});export{D as default};
