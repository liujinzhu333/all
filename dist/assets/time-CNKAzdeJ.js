import{_ as M,r as p,z as R,D as T,c as B,b as L,o as X}from"./index-NOxQLg1p.js";const Y={class:"container"},$={__name:"time",setup(k){const I=[{image:"images/1.jpg",text:"FIRST SHOW",textColor:"#FF3366"},{image:"images/2.png",text:"SECOND SLIDE",textColor:"#33CCFF"},{image:"images/3.png",text:"THIRD IMAGE",textColor:"#99FF33"}],n={particleGap:5,textGap:3,particleSize:2,animationSpeed:.1,switchInterval:4e3,displayHeight:500},m=p(null),w=p([]),_=p(null),u=p(0),v=p([]);class C{constructor(e,a,i){this.x=Math.random()*window.innerWidth*1.5-window.innerWidth*.25,this.y=Math.random()*window.innerHeight*1.5-window.innerHeight*.25,this.targetX=e,this.targetY=a,this.color=i,this.size=n.particleSize,this.speed=n.animationSpeed,this.alpha=0}update(){this.alpha=Math.min(1,this.alpha+.02);const e=this.targetX-this.x,a=this.targetY-this.y;this.x+=e*this.speed,this.y+=a*this.speed}draw(e){e.globalAlpha=this.alpha,e.fillStyle=this.color,e.beginPath(),e.arc(this.x,this.y,this.size,0,Math.PI*2),e.fill()}}const x=()=>{const t=m.value;t.width=window.innerWidth,t.height=window.innerHeight},F=async()=>{v.value=await Promise.all(I.map(async t=>{const e=await E(t.image);return{...t,image:e}}))},E=t=>new Promise((e,a)=>{const i=new Image;i.onload=()=>e(i),i.onerror=a,i.src=t}),H=t=>{const e=D(t.image),a=G(t.text,t.textColor,t.image.height);return[...e,...a]},D=t=>{const e=[],a=document.createElement("canvas"),i=a.getContext("2d"),g=n.displayHeight/t.height,s=t.width*g;a.width=s,a.height=n.displayHeight,i.drawImage(t,0,0,s,n.displayHeight);const o=i.getImageData(0,0,s,n.displayHeight);for(let c=0;c<o.height;c+=n.particleGap)for(let l=0;l<o.width;l+=n.particleGap){const r=(c*o.width+l)*4,[h,d,f,y]=o.data.slice(r,r+4);if(y>50){const z=l+(window.innerWidth-s)/2,A=c+(window.innerHeight-n.displayHeight)/2;e.push(new C(z,A,`rgba(${h},${d},${f},${y/255})`))}}return e},G=(t,e,a)=>{const i=[],g=document.createElement("canvas"),s=g.getContext("2d");s.font="bold 48px Arial";const o=s.measureText(t).width,c=(window.innerWidth-o)/2,l=(window.innerHeight+a)/2+50;g.width=o,g.height=60,s.font="bold 48px Arial",s.fillStyle=e,s.fillText(t,0,48);const r=s.getImageData(0,0,o,60);for(let h=0;h<r.height;h+=n.textGap)for(let d=0;d<r.width;d+=n.textGap){const f=(h*r.width+d)*4;r.data[f+3]>50&&i.push(new C(c+d,l+h-30,e))}return i},W=()=>{u.value=(u.value+1)%I.length,w.value=H(v.value[u.value])},S=()=>{const t=m.value.getContext("2d");t.clearRect(0,0,t.canvas.width,t.canvas.height),w.value.forEach(e=>{e.update(),e.draw(t)}),_.value=requestAnimationFrame(S)};let P=null;const b=()=>{P=setInterval(W,n.switchInterval)};return R(async()=>{x(),window.addEventListener("resize",x),await F(),w.value=H(v.value[0]),S(),b()}),T(()=>{window.removeEventListener("resize",x),cancelAnimationFrame(_.value),clearInterval(P)}),(t,e)=>(X(),B("div",Y,[L("canvas",{ref_key:"canvasRef",ref:m},null,512)]))}},O=M($,[["__scopeId","data-v-fd7a5098"]]);export{O as default};
