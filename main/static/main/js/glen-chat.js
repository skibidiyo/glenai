document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const scroll = document.getElementById('message-scroll');
  const mascot = document.querySelector('.message-avatar').getAttribute('src');
  const chatView = document.getElementById('chat-view');
  const aboutView = document.getElementById('about-view');
  const tabs = document.querySelectorAll('.chat-tab');

  // These destinations belong to the matching and personality apps.
  // TODO: update paths here and in home.html if those apps choose different routes.
  const replies = [
    { test: /mentor|skill match|buddy|skills? to (learn|teach)/i, message: 'I can help you find colleagues based on what you want to learn and what you can share.', actions: [{ label: 'View Skill Matching', href: '/matching/' }] },
    { test: /mineral|personality|work style|assessment/i, message: 'Discover your work style and strengths through Glen’s mineral personality experience.', actions: [{ label: 'Start Assessment', href: '/personality/' }] },
    { test: /leave|holiday|vacation|time off/i, message: 'You can request annual leave through the employee portal. You may also want to review the leave policy before submitting your request.', actions: [{ label: 'View policy', demo: true }, { label: 'Open employee portal', demo: true }] },
    { test: /expense|reimbursement|receipt/i, message: 'For expenses, keep your receipt and submit a claim through your usual employee expense process. Your local finance team can help with approval or policy questions.', actions: [{ label: 'Expense guidance', demo: true }] },
    { test: /polic(y|ies)|guideline|procedure/i, message: 'Company policies are usually available through your internal employee resources. If you tell me the topic, I can help narrow down what to look for.', actions: [{ label: 'Browse policies', demo: true }] },
    { test: /support|help desk|it |technical|password|computer|laptop|access/i, message: 'For workplace or IT support, describe the issue and its urgency when you contact your local support team. If your access is blocked, use your organisation’s standard support channel.', actions: [{ label: 'Support guidance', demo: true }] },
  ];

  function addMessage(kind, message, actions = []) {
    const row = document.createElement('div');
    row.className = `message-row ${kind === 'glen' ? 'glen-row' : 'user-row'}`;
    if (kind === 'glen') {
      const avatar = document.createElement('img');
      avatar.className = 'message-avatar';
      avatar.src = mascot;
      avatar.alt = '';
      row.append(avatar);
    }
    const content = document.createElement('div');
    content.className = 'message-content';
    const meta = document.createElement('div');
    meta.className = 'message-meta';
    const name = document.createElement('strong');
    name.textContent = kind === 'glen' ? 'Glen' : 'You';
    const time = document.createElement('span');
    time.textContent = 'Just now';
    meta.append(name, time);
    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${kind === 'glen' ? 'glen-bubble' : 'user-bubble'}`;
    bubble.textContent = message;
    content.append(meta, bubble);
    if (actions.length) {
      const actionRow = document.createElement('div');
      actionRow.className = 'message-actions';
      actions.forEach(action => {
        const link = document.createElement('a');
        link.textContent = action.label;
        link.href = action.href || '#';
        if (action.demo) {
          link.setAttribute('aria-label', `${action.label} (demo only)`);
          link.addEventListener('click', event => {
            event.preventDefault();
            addMessage('glen', 'This is a demo action. Connect it to your internal resource when available.');
          });
        }
        actionRow.append(link);
      });
      content.append(actionRow);
    }
    row.append(content);
    scroll.append(row);
    scroll.scrollTop = scroll.scrollHeight;
  }

  function send(value) {
    const query = value.trim();
    if (!query) return;
    addMessage('user', query);
    const reply = replies.find(item => item.test.test(query));
    if (reply) addMessage('glen', reply.message, reply.actions);
    else addMessage('glen', 'I can help you find the right information. This prototype currently supports a limited set of workplace questions.');
    input.value = '';
    document.getElementById('suggestions').hidden = true;
  }

  form.addEventListener('submit', event => { event.preventDefault(); send(input.value); });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(input.value); }
  });
  document.querySelectorAll('[data-prompt]').forEach(button => button.addEventListener('click', () => send(button.dataset.prompt)));
  document.getElementById('focus-chat').addEventListener('click', () => { tabs[0].click(); input.focus(); });
  tabs.forEach((tab, index) => tab.addEventListener('click', () => {
    tabs.forEach((item, itemIndex) => { item.classList.toggle('active', itemIndex === index); item.setAttribute('aria-selected', String(itemIndex === index)); });
    chatView.hidden = index !== 0;
    aboutView.hidden = index !== 1;
  }));
  document.querySelectorAll('[data-history]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.history === 'back') history.back(); else history.forward();
  }));
  document.querySelectorAll('[data-demo-nav]').forEach(button => button.addEventListener('click', () => {
    addMessage('glen', `${button.dataset.demoNav} is part of the surrounding Teams-style demo. Glen is the active app.`);
    tabs[0].click();
  }));
});
