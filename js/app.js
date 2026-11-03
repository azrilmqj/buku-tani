// Render utama, navigasi, dan pendaftaran service worker.
function draw(){
  const V={kas:vKas,pupuk:vPupuk,harga:vHarga,kasbon:vKasbon};
  $('#app').innerHTML='<h1>'+TITLE[tab]+'</h1><p class="sub">'+SUB[tab]+'</p>'+V[tab]()+'<div class="foot"><button data-a="backup">Cadangan data</button><div class="meta">Buku Tani. Data tersimpan di HP ini saja.</div></div>';
  $('#nav').innerHTML=TABS.map(t=>'<button data-a="tab" data-v="'+t[0]+'"'+(t[0]===tab?' aria-current="page"':'')+'>'+t[1]+'</button>').join('');
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,v=b.dataset.v,id=b.dataset.id;
  if(a==='tab'){tab=v;draw();window.scrollTo(0,0)}
  else if(a==='per'){per=v;draw()}
  else if(a==='kas')addKas(v);else if(a==='pupuk')addPupuk();else if(a==='harga')addHarga();else if(a==='kasbon')addKasbon();
  else if(a==='tebus')tebus(id);else if(a==='bayar')bayar(id);else if(a==='backup')backup();
  else if(a==='del'){
    if(b.dataset.arm){S[b.dataset.t]=S[b.dataset.t].filter(x=>x.id!==id);save();draw()}
    else{b.dataset.arm='1';b.textContent='Yakin hapus?';setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.textContent='Hapus'}},3000)}
  }
});
draw();

if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
