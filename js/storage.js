// Data, penyimpanan lokal, dan fungsi bantu.
const KEY='bukutani:v1';
let S={kas:[],pupuk:[],harga:[],kasbon:[]},tab='kas',per='bulan';
try{const r=localStorage.getItem(KEY);if(r)S=Object.assign(S,JSON.parse(r))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const rp=n=>'Rp'+Math.round(n).toLocaleString('id-ID');
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const tg=d=>new Date(d+'T00:00').toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sum=(a,f)=>a.reduce((t,x)=>t+(+f(x)||0),0);
const KOM=['Padi','Jagung','Pisang','Tembakau','Cabai','Bawang','Tomat','Lainnya'];
const TABS=[['kas','Kas'],['pupuk','Pupuk'],['harga','Harga'],['kasbon','Kasbon']];
const SUB={kas:'Catat uang masuk dan keluar usaha tani.',pupuk:'Pantau jatah pupuk subsidi tiap anggota.',harga:'Bandingkan harga dari berbagai pembeli sebelum menjual.',kasbon:'Catat pinjaman modal sampai lunas.'};

