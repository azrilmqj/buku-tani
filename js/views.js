// Tampilan tiap tab. Ringkasan ditulis sebagai kalimat biasa agar mudah dipahami.
const TITLE={kas:'Kas usaha tani',pupuk:'Pupuk subsidi',harga:'Harga jual',kasbon:'Kasbon modal'};
const empty=t=>'<div class="empty">'+t+'</div>';
const del=(t,id)=>'<button class="btn sm del" data-a="del" data-t="'+t+'" data-id="'+id+'">Hapus</button>';
const ln=(l,r,c)=>'<div class="ln"><span>'+l+'</span><span class="amt '+(c||'')+'">'+r+'</span></div>';
const sp=(c,t)=>'<b class="'+c+'">'+t+'</b>';

function vKas(){
  const m=today().slice(0,7);
  const L=S.kas.filter(x=>per==='semua'||x.tgl.startsWith(m)).sort((a,b)=>b.tgl.localeCompare(a.tgl));
  const mi=sum(L.filter(x=>x.j==='masuk'),x=>x.jml),ke=sum(L.filter(x=>x.j==='keluar'),x=>x.jml),u=mi-ke,tot=mi+ke;
  const s=L.length?(per==='semua'?'Sejauh ini':'Bulan ini')+', uang masuk '+sp('i',rp(mi))+' dan keluar '+sp('o',rp(ke))+'. '+(u<0?'Rugi ':'Untung ')+sp(u<0?'o':'i',rp(Math.abs(u)))+'.':'Belum ada uang masuk atau keluar '+(per==='semua'?'yang tercatat.':'bulan ini.');
  return '<div class="tgl"><button data-a="per" data-v="bulan" aria-pressed="'+(per==='bulan')+'">Bulan ini</button><button data-a="per" data-v="semua" aria-pressed="'+(per==='semua')+'">Semua</button></div>'
  +'<div class="hl"><p class="sent">'+s+'</p>'+(tot?'<div class="thread"><i style="flex:'+mi+';background:var(--pos)"></i><i style="flex:'+ke+';background:var(--neg)"></i></div>':'')+'</div>'
  +'<div class="acts"><button class="btn" data-a="kas" data-v="keluar">Catat pengeluaran</button><button class="btn alt" data-a="kas" data-v="masuk">Catat pemasukan</button></div>'
  +(L.length?L.map(x=>'<div class="row">'+ln('<b>'+esc(x.kat)+'</b>',(x.j==='keluar'?'-':'+')+rp(x.jml),x.j==='keluar'?'o':'i')+'<div class="meta">'+tg(x.tgl)+(x.ket?', '+esc(x.ket):'')+'</div><div class="ra">'+del('kas',x.id)+'</div></div>').join(''):empty('Mulai dengan mencatat biaya bibit atau hasil panen.'));
}
function vPupuk(){
  const L=S.pupuk,sisa=sum(L,x=>x.jatah-x.ambil),belum=L.filter(x=>x.ambil<x.jatah).length;
  const s=!L.length?'Belum ada jatah pupuk yang dicatat.':sisa>0?'Masih ada '+sp('',sisa.toLocaleString('id-ID')+' kg')+' jatah yang belum ditebus, pada '+belum+' catatan.':'Semua jatah sudah ditebus.';
  return '<div class="hl"><p class="sent">'+s+'</p></div>'
  +'<div class="acts"><button class="btn" data-a="pupuk">Tambah jatah anggota</button></div>'
  +(L.length?L.map(x=>{const p=x.jatah?x.ambil/x.jatah*100:0,ok=x.ambil>=x.jatah;return '<div class="row">'+ln('<b>'+esc(x.nama)+'</b>'+(ok?'<span class="ok">lengkap</span>':''),x.ambil+' dari '+x.jatah+' kg')+'<div class="prog"><i style="width:'+p+'%"></i></div><div class="meta">'+esc(x.jenis)+', sisa '+(x.jatah-x.ambil)+' kg</div><div class="ra">'+(ok?'':'<button class="btn sm" data-a="tebus" data-id="'+x.id+'">Catat tebus</button>')+del('pupuk',x.id)+'</div></div>'}).join(''):empty('Tambahkan jatah pupuk subsidi tiap anggota kelompok.'));
}
function vHarga(){
  const g={};S.harga.forEach(x=>(g[x.kom]=g[x.kom]||[]).push(x));
  const ks=Object.keys(g).sort();
  return '<div class="acts"><button class="btn" data-a="harga">Catat harga jual</button></div>'
  +(ks.length?ks.map(k=>{const a=g[k].sort((x,y)=>y.tgl.localeCompare(x.tgl)),top=a.reduce((m,x)=>x.hrg>m.hrg?x:m,a[0]),avg=sum(a,x=>x.hrg)/a.length;
    return '<h2 class="grp">'+esc(k)+'</h2><p class="sent sm">Tertinggi '+sp('i',rp(top.hrg)+'/kg')+' dari '+esc(top.pembeli)+', rata-rata '+sp('',rp(avg)+'/kg')+'.</p>'
    +a.slice(0,6).map(x=>'<div class="row">'+ln('<b>'+esc(x.pembeli)+'</b>',rp(x.hrg)+'/kg')+'<div class="meta">'+tg(x.tgl)+'</div><div class="ra">'+del('harga',x.id)+'</div></div>').join('')}).join(''):empty('Catat tawaran dari tengkulak, pasar, dan pembeli lain supaya bisa dibandingkan sebelum menjual.'));
}
function vKasbon(){
  const L=S.kasbon,sisa=sum(L,x=>x.jml-x.bayar);
  const s=sisa>0?'Utang yang belum lunas '+sp('o',rp(sisa))+'.':L.length?'Semua pinjaman sudah lunas.':'Belum ada pinjaman yang dicatat.';
  return '<div class="hl"><p class="sent">'+s+'</p></div>'
  +'<div class="acts"><button class="btn" data-a="kasbon">Catat pinjaman</button></div>'
  +(L.length?L.slice().sort((a,b)=>b.tgl.localeCompare(a.tgl)).map(x=>{const s=x.jml-x.bayar;return '<div class="row">'+ln('<b>'+esc(x.nama)+'</b>'+(s<=0?'<span class="ok">lunas</span>':''),rp(s),s>0?'o':'')+'<div class="meta">Pinjam '+rp(x.jml)+', dibayar '+rp(x.bayar)+', '+tg(x.tgl)+(x.ket?', '+esc(x.ket):'')+'</div><div class="ra">'+(s>0?'<button class="btn sm" data-a="bayar" data-id="'+x.id+'">Catat bayar</button>':'')+del('kasbon',x.id)+'</div></div>'}).join(''):empty('Catat modal yang dipinjam supaya tidak lupa dan tidak salah hitung.'));
}
