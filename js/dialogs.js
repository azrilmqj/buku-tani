// Formulir (dialog) dan aksi tambah, tebus, bayar, cadangan.
function ask(title,fields,ok,v){
  v=v||{};
  const f=$('#frm');
  f.innerHTML='<h2>'+esc(title)+'</h2>'+fields.map(x=>{
    const val=v[x.k]!=null?v[x.k]:(x.d!=null?x.d:'');
    let c;
    if(x.t==='select')c='<select name="'+x.k+'">'+x.o.map(o=>'<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>').join('')+'</select>';
    else if(x.t==='area')c='<textarea name="'+x.k+'">'+esc(val)+'</textarea>';
    else c='<input name="'+x.k+'" type="'+(x.t||'text')+'" value="'+esc(val)+'"'+(x.t==='number'?' inputmode="decimal" min="0" step="any"':'')+(x.r===false?'':' required')+'>';
    return '<label>'+esc(x.l)+c+'</label>';
  }).join('')+'<div class="err" id="err"></div><div class="dact"><button type="button" class="btn alt" id="bc">Batal</button><button class="btn">Simpan</button></div>';
  f.onsubmit=e=>{e.preventDefault();const d={};fields.forEach(x=>{const val=f.elements[x.k].value.trim();d[x.k]=x.t==='number'?+val:val});
    const m=ok(d);if(m){$('#err').textContent=m;return}$('#dlg').close();save();draw()};
  $('#bc').onclick=()=>$('#dlg').close();
  $('#dlg').showModal();
}
function $(s){return document.querySelector(s)}

const addKas=j=>ask(j==='keluar'?'Catat pengeluaran':'Catat pemasukan',[
  {k:'tgl',l:'Tanggal',t:'date',d:today()},
  {k:'kat',l:'Jenis',t:'select',o:j==='keluar'?['Bibit','Pupuk','Obat dan pestisida','Tenaga kerja','Sewa traktor atau alat','Lainnya']:['Hasil panen','Lainnya']},
  {k:'ket',l:'Keterangan (misalnya lahan atau komoditas)',r:false},
  {k:'jml',l:'Jumlah (Rp)',t:'number'}],
  d=>{if(!(d.jml>0))return'Isi jumlah lebih dari 0.';S.kas.push({id:uid(),j,tgl:d.tgl,kat:d.kat,ket:d.ket,jml:d.jml})});
const addPupuk=()=>ask('Tambah jatah pupuk',[
  {k:'nama',l:'Nama anggota'},{k:'jenis',l:'Jenis pupuk',t:'select',o:['Urea','NPK','Organik']},
  {k:'jatah',l:'Jatah musim ini (kg)',t:'number'},{k:'ambil',l:'Sudah ditebus (kg)',t:'number',d:0}],
  d=>{if(!(d.jatah>0))return'Isi jatah lebih dari 0.';if(d.ambil>d.jatah)return'Yang ditebus tidak boleh melebihi jatah.';S.pupuk.push({id:uid(),nama:d.nama,jenis:d.jenis,jatah:d.jatah,ambil:d.ambil||0})});
const addHarga=()=>ask('Catat harga jual',[
  {k:'tgl',l:'Tanggal',t:'date',d:today()},{k:'kom',l:'Komoditas',t:'select',o:KOM},
  {k:'pembeli',l:'Pembeli atau pasar'},{k:'hrg',l:'Harga per kg (Rp)',t:'number'}],
  d=>{if(!(d.hrg>0))return'Isi harga lebih dari 0.';S.harga.push({id:uid(),tgl:d.tgl,kom:d.kom,pembeli:d.pembeli,hrg:d.hrg})});
const addKasbon=()=>ask('Catat pinjaman',[
  {k:'tgl',l:'Tanggal',t:'date',d:today()},{k:'nama',l:'Dipinjam dari siapa'},
  {k:'jml',l:'Jumlah pinjaman (Rp)',t:'number'},{k:'ket',l:'Keterangan',r:false}],
  d=>{if(!(d.jml>0))return'Isi jumlah lebih dari 0.';S.kasbon.push({id:uid(),tgl:d.tgl,nama:d.nama,jml:d.jml,bayar:0,ket:d.ket})});
const tebus=id=>{const p=S.pupuk.find(x=>x.id===id);ask('Catat penebusan: '+p.nama,[{k:'kg',l:'Ditebus sekarang (kg)',t:'number'}],
  d=>{if(!(d.kg>0))return'Isi kg lebih dari 0.';if(p.ambil+d.kg>p.jatah)return'Melebihi jatah. Sisa jatah '+(p.jatah-p.ambil)+' kg.';p.ambil+=d.kg})};
const bayar=id=>{const b=S.kasbon.find(x=>x.id===id);ask('Catat pembayaran ke '+b.nama,[{k:'jml',l:'Dibayar (Rp). Sisa '+rp(b.jml-b.bayar),t:'number'}],
  d=>{if(!(d.jml>0))return'Isi jumlah lebih dari 0.';if(b.bayar+d.jml>b.jml)return'Melebihi sisa utang.';b.bayar+=d.jml})};
const backup=()=>ask('Cadangan data',[{k:'data',l:'Salin teks ini untuk cadangan. Tempel teks cadangan lama di sini untuk memulihkan.',t:'area',d:JSON.stringify(S)}],
  d=>{try{const o=JSON.parse(d.data);if(!o||typeof o!=='object'||!Array.isArray(o.kas))return'Teks cadangan tidak valid.';S=Object.assign({kas:[],pupuk:[],harga:[],kasbon:[]},o)}catch(e){return'Teks cadangan tidak valid.'}});

