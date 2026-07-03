// Loads the shared nav and footer into every page.
// Each page needs: <div id="site-header"></div> and <div id="site-footer"></div>
(function(){
  function inject(id, url){
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function(res){ if (!res.ok) throw new Error('failed to load ' + url); return res.text(); })
      .then(function(html){
        el.innerHTML = html;
        // re-run any <script> tags inside the injected html (innerHTML doesn't execute them)
        var scripts = el.querySelectorAll('script');
        scripts.forEach(function(oldScript){
          var newScript = document.createElement('script');
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      })
      .catch(function(err){ console.error(err); });
  }
  inject('site-header', 'nav.html');
  inject('site-footer', 'footer.html');
})();
