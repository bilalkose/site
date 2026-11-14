/* Cookie consent for bilalkose.co.uk
   Google Analytics is loaded only after the visitor chooses Accept.
   The choice is stored in the browser (localStorage) and can be changed
   with any link carrying the data-cookie-settings attribute. */
(function(){
  var KEY='bk_cookie_consent', GA_ID='G-QQSB564V5B', box=null;

  function read(){try{return localStorage.getItem(KEY);}catch(e){return null;}}
  function save(v){try{localStorage.setItem(KEY,v);}catch(e){}}

  function loadAnalytics(){
    if(window.__bkGaLoaded) return;
    window.__bkGaLoaded=true;
    var s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
    document.head.appendChild(s);
  }
  function clearAnalyticsCookies(){
    var host=location.hostname, parts=host.split('.');
    var domains=[host,'.'+host];
    if(parts.length>2) domains.push('.'+parts.slice(-3).join('.'),'.'+parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function(c){
      var n=c.split('=')[0].trim();
      if(n.indexOf('_ga')===0||n==='_gid'||n==='_gat'){
        domains.forEach(function(d){document.cookie=n+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain='+d;});
        document.cookie=n+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    });
  }

  function addStyles(){
    if(document.getElementById('bk-cc-style')) return;
    var st=document.createElement('style');
    st.id='bk-cc-style';
    st.textContent=
      '.bk-cc{position:fixed;left:16px;bottom:16px;z-index:1000;width:min(340px,calc(100vw - 32px));box-sizing:border-box;padding:18px 20px 16px;'+
      'background:rgba(21,15,9,.97);border:1px solid rgba(245,236,218,.16);border-radius:6px;box-shadow:0 18px 50px rgba(0,0,0,.55);'+
      'color:#c9b79a;font-family:"Hanken Grotesk",system-ui,sans-serif;font-size:.84rem;line-height:1.55;'+
      'opacity:0;transform:translateY(14px);transition:opacity .45s ease,transform .45s ease;}'+
      '.bk-cc.is-in{opacity:1;transform:none;}'+
      '.bk-cc__title{font-family:"Cormorant Garamond",serif;font-weight:600;font-size:1.12rem;color:#f5ecda;margin:0 0 6px;}'+
      '.bk-cc p{margin:0 0 14px;}'+
      '.bk-cc a{color:#f0d49a;}'+
      '.bk-cc__row{display:flex;gap:10px;}'+
      '.bk-cc button{flex:1;font:inherit;font-weight:600;font-size:.82rem;padding:10px 12px;border-radius:3px;cursor:pointer;transition:background .25s ease,border-color .25s ease,color .25s ease;}'+
      '.bk-cc__yes{background:#d9943a;border:1px solid #d9943a;color:#1a1206;}'+
      '.bk-cc__yes:hover{background:#e6a551;border-color:#e6a551;}'+
      '.bk-cc__no{background:transparent;border:1px solid rgba(245,236,218,.28);color:#f5ecda;}'+
      '.bk-cc__no:hover{border-color:#d9943a;color:#d9943a;}'+
      '.bk-cc button:focus-visible{outline:2px solid #f0d49a;outline-offset:2px;}'+
      '@media (prefers-reduced-motion:reduce){.bk-cc{transition:none;}}';
    document.head.appendChild(st);
  }

  function hide(){
    if(!box) return;
    var b=box; box=null;
    b.classList.remove('is-in');
    setTimeout(function(){if(b.parentNode) b.parentNode.removeChild(b);},450);
  }
  function show(){
    if(box) return;
    addStyles();
    box=document.createElement('div');
    box.className='bk-cc';
    box.setAttribute('role','region');
    box.setAttribute('aria-label','Cookie choice');
    box.innerHTML=
      '<div class="bk-cc__title">Cookies</div>'+
      '<p>I use Google Analytics cookies to see how visitors use this site. Nothing is switched on unless you accept. <a href="/privacy.html">Privacy policy</a></p>'+
      '<div class="bk-cc__row"><button type="button" class="bk-cc__no">Decline</button><button type="button" class="bk-cc__yes">Accept</button></div>';
    document.body.appendChild(box);
    box.querySelector('.bk-cc__yes').addEventListener('click',function(){save('granted');loadAnalytics();hide();});
    box.querySelector('.bk-cc__no').addEventListener('click',function(){save('denied');clearAnalyticsCookies();hide();});
    requestAnimationFrame(function(){requestAnimationFrame(function(){if(box) box.classList.add('is-in');});});
  }

  function init(){
    var c=read();
    if(c==='granted') loadAnalytics();
    else if(c!=='denied') setTimeout(show,900);
    document.addEventListener('click',function(e){
      var t=e.target.closest&&e.target.closest('[data-cookie-settings]');
      if(!t) return;
      e.preventDefault();
      show();
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
