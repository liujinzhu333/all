import{m as g}from"./manageService-CK5DSoRL.js";import{d as f,r as h,i as k,o as t,c as a,b as p,F as u,j as c,t as d,a as x,w as m,f as y,g as v,e as w,h as _}from"./index-NOxQLg1p.js";const L=["src"],D=f({__name:"Utils",setup(B){const o=h([]);return k(()=>{}),(async()=>{const l=await g.getDataList("utils")||[];o.value=l.reduce((e,n)=>{const s=n.type;return e[s]||(e[s]=[]),e[s].push(n),e},{})})(),(l,e)=>{const n=_("el-link"),s=_("el-space");return t(),a("div",null,[e[0]||(e[0]=p("h1",null,"工具",-1)),(t(!0),a(u,null,c(o.value,i=>(t(),a("div",null,[p("h4",null,d(i[0].type),1),x(s,{wrap:"",size:12},{default:m(()=>[(t(!0),a(u,null,c(i,(r,N)=>(t(),y(n,{href:r.link,target:"_blank"},{default:m(()=>[r.logo?(t(),a("img",{key:0,style:{width:"20px",height:"20px","margin-right":"5px"},src:r.logo},null,8,L)):v("",!0),w(" "+d(r.name),1)]),_:2},1032,["href"]))),256))]),_:2},1024)]))),256))])}}});export{D as default};
