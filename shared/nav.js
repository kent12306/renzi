const topModules = [
  ["employees", "员工管理", "regular-employees.html"],
  ["insurance", "社保公积金", "insurance-bill.html"],
  ["org", "组织单位管理", "org-manage.html"],
  ["attendance", "考勤管理", "attendance-ledger.html"],
  ["performance", "绩效管理", "perf-personal-contract.html"]
];

const sideMenus = {
  employees: [
    ["长宁正式员工", "regular-employees.html"],
    ["蜀南操服", "shunan-caofei-employees.html"],
    ["蜀南管理人员", "shunan-mgmt-employees.html"],
    ["外包人员", "outsourced-employees.html"]
  ],
  insurance: [
    ["社保缴纳台账", "insurance-bill.html"]
  ],
  org: [["组织单位管理", "org-manage.html"]],
  attendance: [
    ["考勤台账", "attendance-ledger.html"],
    ["年休假计划", "annual-leave-plan.html"],
    ["请假申请", "leave-apply.html"],
    ["加班申请", "overtime-apply.html"],
    ["审批中心", "approval-center.html"],
    ["请假类型配置", "leave-type-config.html"]
  ],
  performance: [
    ["业绩合同"],
    ["个人业绩合同", "perf-personal-contract.html"],
    ["部门业绩合同", "perf-dept-contract.html"],
    ["过程考核"],
    ["考核配置", "perf-process-config.html"],
    ["部门间互评", "perf-dept-mutual.html"],
    ["领导评价", "perf-leader-eval.html"],
    ["过程考核汇总", "perf-quarterly-summary.html"],
    ["考核结果"],
    ["民主测评", "perf-democracy-eval.html"],
    ["绩效兑现", "perf-annual-result.html"],
    ["绩效兑现配置"],
    ["岗位层级与系数", "perf-position-level-config.html"],
    ["部门岗位价值系数", "perf-dept-value-coefficient.html"],
    ["业绩档次评定", "perf-rating-assessment.html"],
    ["绩效兑现规则配置", "perf-cashout-rules-config.html"],
    ["填报管控中心"],
    ["填报周期设置", "perf-report-schedule.html"],
    ["填报提醒设置", "perf-reminder-config.html"]
  ]
};

const body = document.body;
const moduleId = body.dataset.module;
const pageFile = location.pathname.split("/").pop();
const pageContent = document.querySelector(".page-content");
const pageTitle = pageContent?.dataset.title || document.title;
const pageDesc = pageContent?.dataset.desc || "";
const moduleLabel = topModules.find(item => item[0] === moduleId)?.[1] || "功能模块";

document.body.innerHTML = `
  <div class="prototype-shell">
    <header class="topbar">
      <a class="brand" href="./index.html">
        <span class="brand-mark"></span>
        <span>长宁人力资源系统</span>
      </a>
      <nav class="top-nav" aria-label="一级模块">
        ${topModules.map(([id, label, href]) => `<a class="${id === moduleId ? "active" : ""}" href="./${href}">${label}</a>`).join("")}
      </nav>
      <a class="button" href="../index.html">原型库</a>
    </header>
    <main class="workspace">
      <aside class="side-panel">
        <nav class="side-nav" aria-label="二级菜单">
          ${(function(){
            var items = sideMenus[moduleId] || [];
            // 只有当菜单没有子分组标题时，才在顶部显示模块名分组标题
            var firstIsGroup = items.length > 0 && items[0].length === 1;
            return (firstIsGroup ? '' : '<span>' + moduleLabel + '</span>') +
              items.map(function(item){
                return item.length === 1
                  ? '<span>' + item[0] + '</span>'
                  : '<a class="' + (item[1] === pageFile ? 'active' : '') + '" href="./' + item[1] + '">' + item[0] + '</a>';
              }).join('');
          }())}
        </nav>
      </aside>
      <section class="content-panel">
        <div class="breadcrumb">${moduleLabel} / ${pageTitle}</div>
        <div class="page-title-row">
          <div>
            <h1>${pageTitle}</h1>
            <p>${pageDesc}</p>
          </div>
          <div class="toolbar" data-page-actions></div>
        </div>
        <div data-page-slot></div>
      </section>
    </main>
  </div>
`;

document.querySelector("[data-page-slot]").append(...pageContent.childNodes);
const actions = pageContent.dataset.actions || "";
document.querySelector("[data-page-actions]").innerHTML = actions;


// ── 全局删除二次确认弹框 ────────────────────────────────
(function setupDeleteConfirm() {
  // 创建弹框
  var mask = document.createElement('div');
  mask.id = 'globalDeleteModal';
  mask.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:3000;align-items:center;justify-content:center;';
  mask.innerHTML =
    '<div style="background:#fff;border-radius:8px;padding:28px 32px;width:380px;max-width:92vw;box-shadow:0 8px 32px rgba(0,0,0,0.18);text-align:center;">' +
      '<h3 style="font-size:16px;font-weight:600;margin:0 0 16px;color:#333;">确认删除</h3>' +
      '<p style="font-size:14px;color:#666;margin:0 0 24px;">确定要删除这条数据吗？此操作不可恢复。</p>' +
      '<div style="display:flex;justify-content:center;gap:12px;">' +
        '<button type="button" class="btn" id="gdmCancel">取消</button>' +
        '<button type="button" class="btn danger" id="gdmOk">确认删除</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(mask);

  function closeModal() { mask.style.display = 'none'; }
  mask.querySelector('#gdmCancel').addEventListener('click', closeModal);
  mask.querySelector('#gdmOk').addEventListener('click', closeModal);
  mask.addEventListener('click', function(e) { if (e.target === mask) closeModal(); });

  // 事件委托：拦截所有指向 confirm-delete.html 的链接
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href*="confirm-delete.html"]');
    if (a) {
      e.preventDefault();
      mask.style.display = 'flex';
    }
  });
})();
