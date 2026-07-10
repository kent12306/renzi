// 员工档案页公共脚本：Tab 切换 + 弹框开关 + 调岗联动
(function() {
  // Tab 切换
  document.querySelectorAll('.profile-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.profile-tab').forEach(function(t){ t.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  // 弹框开关
  document.querySelectorAll('.modal-mask').forEach(function(m){
    m.addEventListener('click', function(e){ if(e.target===m) m.classList.remove('show'); });
  });

  // 调岗：变动类型 → 新部门显隐 + 新岗位联动
  var deptPositions = {
    '研发部':['开发工程师','架构师','测试工程师','采气工','采气班长'],
    '采气部':['采气工','采气班长','技术员'],
    '维修部':['电工','机修工','维修班长'],
    '市场部':['市场专员','市场主管'],
    '运营部':['运营专员','运营主管'],
    '行政部':['行政专员','行政主管']
  };
  var jcType = document.getElementById('jcType');
  if (jcType) {
    var jcNewDeptWrap = document.getElementById('jcNewDeptWrap');
    var jcNewDept = document.getElementById('jcNewDept');
    var jcNewPos = document.getElementById('jcNewPos');
    var currentDept = (document.querySelector('#jcType')
      && window.__currentDept) ? window.__currentDept : '研发部';

    function fillPos(dept){
      jcNewPos.innerHTML = '<option value="">请选择新岗位</option>';
      (deptPositions[dept]||[]).forEach(function(p){
        var o=document.createElement('option'); o.textContent=p; jcNewPos.appendChild(o);
      });
    }
    jcType.addEventListener('change', function(){
      if(this.value==='cross'){ jcNewDeptWrap.style.display=''; jcNewPos.innerHTML='<option value="">请先选择新部门</option>'; }
      else if(this.value==='inner'){ jcNewDeptWrap.style.display='none'; fillPos(currentDept); }
      else { jcNewDeptWrap.style.display='none'; jcNewPos.innerHTML='<option value="">请先选择变动类型</option>'; }
    });
    if (jcNewDept) jcNewDept.addEventListener('change', function(){ fillPos(this.value); });
  }
})();

// 全局弹框开关（供 onclick 调用）
function openModal(id){ var m=document.getElementById(id); if(m) m.classList.add('show'); }
function closeModal(id){ var m=document.getElementById(id); if(m) m.classList.remove('show'); }
