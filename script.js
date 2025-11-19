// Basic DOM helpers
slidesWrap.style.transform = `translateX(-${i*100}%)`;
}
slider.querySelector('.prev').addEventListener('click', ()=>{ idx = (idx-1 + slides.length)%slides.length; show(idx); });
slider.querySelector('.next').addEventListener('click', ()=>{ idx = (idx+1)%slides.length; show(idx); });
// auto play
setInterval(()=>{ idx = (idx+1)%slides.length; show(idx); }, 6000);
})();


// Load news JSON and paginate
(function(){
const newsListEl = document.getElementById('newsList');
const paginationEl = document.getElementById('pagination');
if(!newsListEl || !paginationEl) return;


fetch('news-data.json').then(r=>r.json()).then(data=>{
const perPage = 6;
const total = data.length;
const pages = Math.ceil(total/perPage);
let current = 1;


function renderPage(page){
newsListEl.innerHTML = '';
const start = (page-1)*perPage;
const slice = data.slice(start, start+perPage);
slice.forEach(item=>{
const div = document.createElement('div');
div.className = 'news-item fade-up';
div.innerHTML = `
<img src="${item.image}" alt="${item.title}">
<h3>${item.title}</h3>
<p class="muted">${item.date}</p>
<p>${item.excerpt}</p>
<a href="#" class="btn">อ่านเพิ่มเติม</a>
`;
newsListEl.appendChild(div);
});
renderPagination(page);
}


function renderPagination(active){
paginationEl.innerHTML = '';
for(let i=1;i<=pages;i++){
const btn = document.createElement('button');
btn.className = 'page-btn' + (i===active? ' active':'');
btn.textContent = i;
btn.addEventListener('click', ()=>{ renderPage(i); });
paginationEl.appendChild(btn);
}
}


renderPage(1);
}).catch(err=>{
newsListEl.innerHTML = '<p>ไม่สามารถโหลดข่าวได้ในขณะนี้</p>';
console.error(err);
});
})();
