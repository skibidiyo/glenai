(function () {
  'use strict';

  var dataEl = document.getElementById('match-employees-data');
  if (!dataEl) return;
  var ALL_EMPLOYEES = JSON.parse(dataEl.textContent);

  var deckStack = document.getElementById('deck-stack');
  var progressWrap = document.getElementById('deck-progress-wrap');
  var progressFill = document.getElementById('deck-progress-fill');
  var progressLabel = document.getElementById('deck-progress-label');
  var noResults = document.getElementById('no-results');
  var deckControls = document.getElementById('deck-controls');
  var deckEmpty = document.getElementById('deck-empty');
  var counter = document.getElementById('deck-counter');
  var passBtn = document.getElementById('deck-pass');
  var connectBtn = document.getElementById('deck-connect');
  var undoBtn = document.getElementById('deck-undo');
  var restartBtn = document.getElementById('deck-restart');

  var queue = [];
  var index = 0;
  var history = [];
  var pendingConnectEmployee = null;

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function currentFilters() {
    return {
      skill: document.getElementById('filter-skill').value,
      country: document.getElementById('filter-country').value,
      experience: document.getElementById('filter-experience').value,
      mode: document.getElementById('filter-mode').value,
    };
  }

  function applyFilters() {
    var f = currentFilters();
    queue = ALL_EMPLOYEES.filter(function (e) {
      var matchesSkill = !f.skill || e.can_teach.indexOf(f.skill) !== -1;
      var matchesCountry = !f.country || e.country === f.country;
      var matchesExperience = !f.experience || e.experience_band === f.experience;
      var matchesMode = !f.mode || e.meeting_mode === f.mode;
      return matchesSkill && matchesCountry && matchesExperience && matchesMode;
    });
    index = 0;
    history = [];
    renderStack();
  }

  function buildCard(employee) {
    var card = document.createElement('article');
    card.className = 'deck-card';

    var teachChips = employee.can_teach.map(function (s) {
      return '<span class="skill-chip teach">' + escapeHtml(s) + '</span>';
    }).join('');
    var learnChips = employee.wants_to_learn.map(function (s) {
      return '<span class="skill-chip learn">' + escapeHtml(s) + '</span>';
    }).join('');

    var summary;
    if (employee.teaches_you && employee.teaches_you.length) {
      summary = 'Can teach you ' + employee.teaches_you.join(' + ');
    } else if (employee.learns_from_you && employee.learns_from_you.length) {
      summary = 'Wants to learn ' + employee.learns_from_you.join(' + ') + ' from you';
    } else {
      summary = 'A new connection outside your current goals';
    }

    card.innerHTML =
      '<span class="deck-mode-badge">' + escapeHtml(employee.meeting_mode) + '</span>' +
      '<div class="deck-card-top">' +
        '<span class="profile-avatar deck-avatar" aria-hidden="true">' + escapeHtml(employee.name.slice(0, 1)) + '</span>' +
        '<div>' +
          '<p class="deck-name">' + escapeHtml(employee.name) + '</p>' +
          '<p class="deck-meta">' + escapeHtml(employee.role) + ' &middot; ' + escapeHtml(employee.country) + '</p>' +
          '<p class="deck-meta">' + escapeHtml(employee.experience_years) + ' years experience</p>' +
        '</div>' +
      '</div>' +
      '<div class="skill-group"><span class="skill-group-label">Can teach</span><div class="skill-chip-list">' + teachChips + '</div></div>' +
      '<div class="skill-group"><span class="skill-group-label">Wants to learn</span><div class="skill-chip-list">' + learnChips + '</div></div>' +
      '<p class="deck-summary">' + escapeHtml(summary) + '</p>' +
      '<div class="deck-swipe-flag deck-swipe-flag-pass" aria-hidden="true">PASS</div>' +
      '<div class="deck-swipe-flag deck-swipe-flag-connect" aria-hidden="true">CONNECT</div>';

    return card;
  }

  function updateProgress() {
    var total = queue.length;
    progressFill.style.width = (total ? (index / total) * 100 : 0) + '%';
    progressLabel.textContent = Math.min(index + 1, total) + ' of ' + total;
  }

  function updateCounter() {
    var remaining = Math.max(queue.length - index, 0);
    counter.textContent = remaining + (remaining === 1 ? ' match left' : ' matches left');
  }

  function renderStack() {
    deckStack.innerHTML = '';
    undoBtn.disabled = history.length === 0;

    if (queue.length === 0) {
      noResults.hidden = false;
      progressWrap.hidden = true;
      deckControls.hidden = true;
      deckEmpty.hidden = true;
      updateCounter();
      return;
    }
    noResults.hidden = true;

    var remaining = queue.slice(index, index + 3);
    if (remaining.length === 0) {
      progressWrap.hidden = true;
      deckControls.hidden = true;
      deckEmpty.hidden = false;
      updateCounter();
      return;
    }

    deckEmpty.hidden = true;
    progressWrap.hidden = false;
    deckControls.hidden = false;

    remaining.forEach(function (employee, depth) {
      var card = buildCard(employee);
      card.style.zIndex = String(10 - depth);
      card.style.transform = 'translateY(' + (depth * 10) + 'px) scale(' + (1 - depth * 0.04) + ')';
      card.style.opacity = depth === 2 ? '0.6' : '1';
      if (depth === 0) {
        card.classList.add('is-top');
        attachDrag(card, employee);
      }
      deckStack.appendChild(card);
    });

    updateProgress();
    updateCounter();
  }

  function commitDecision(employee, action) {
    history.push({ employee: employee, action: action });
    index += 1;
    renderStack();
  }

  function flyCard(card, direction, done) {
    card.style.transition = 'transform .32s ease, opacity .32s ease';
    var x = direction === 'right' ? 640 : -640;
    var rot = direction === 'right' ? 20 : -20;
    card.style.transform = 'translate(' + x + 'px, -20px) rotate(' + rot + 'deg)';
    card.style.opacity = '0';
    window.setTimeout(function () {
      if (done) done();
    }, 300);
  }

  function resetTopCardPosition() {
    var card = deckStack.querySelector('.is-top');
    if (!card) return;
    card.style.transition = 'transform .2s ease';
    card.style.transform = 'translate(0,0) rotate(0)';
    card.querySelectorAll('.deck-swipe-flag').forEach(function (f) { f.style.opacity = '0'; });
  }

  function passCurrent() {
    var employee = queue[index];
    if (!employee) return;
    var card = deckStack.querySelector('.is-top');
    if (card) {
      flyCard(card, 'left', function () { commitDecision(employee, 'pass'); });
    } else {
      commitDecision(employee, 'pass');
    }
  }

  function connectCurrent() {
    var employee = queue[index];
    if (!employee) return;
    pendingConnectEmployee = employee;
    openConnectModal(employee.name);
  }

  passBtn.addEventListener('click', passCurrent);
  connectBtn.addEventListener('click', connectCurrent);

  undoBtn.addEventListener('click', function () {
    if (!history.length) return;
    history.pop();
    index = Math.max(index - 1, 0);
    renderStack();
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      applyFilters();
    });
  }

  document.querySelectorAll('#matching-filters select').forEach(function (select) {
    select.addEventListener('change', applyFilters);
  });
  var resetButton = document.getElementById('filter-reset');
  if (resetButton) {
    resetButton.addEventListener('click', function () {
      document.querySelectorAll('#matching-filters select').forEach(function (select) {
        select.value = '';
      });
      applyFilters();
    });
  }

  deckStack.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      passCurrent();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      connectCurrent();
    }
  });

  function attachDrag(card, employee) {
    var startX = 0;
    var dx = 0;
    var dragging = false;
    var threshold = 110;

    function onPointerDown(event) {
      dragging = true;
      startX = event.clientX;
      card.style.transition = 'none';
      card.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event) {
      if (!dragging) return;
      dx = event.clientX - startX;
      card.style.transform = 'translate(' + dx + 'px, 0) rotate(' + (dx / 18) + 'deg)';
      var passFlag = card.querySelector('.deck-swipe-flag-pass');
      var connectFlag = card.querySelector('.deck-swipe-flag-connect');
      var intensity = Math.min(Math.abs(dx) / threshold, 1);
      passFlag.style.opacity = dx < 0 ? String(intensity) : '0';
      connectFlag.style.opacity = dx > 0 ? String(intensity) : '0';
    }

    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      card.style.transition = 'transform .22s ease';
      if (dx <= -threshold) {
        flyCard(card, 'left', function () { commitDecision(employee, 'pass'); });
      } else if (dx >= threshold) {
        card.style.transform = 'translate(0,0) rotate(0)';
        card.querySelectorAll('.deck-swipe-flag').forEach(function (f) { f.style.opacity = '0'; });
        pendingConnectEmployee = employee;
        openConnectModal(employee.name);
      } else {
        card.style.transform = 'translate(0,0) rotate(0)';
        card.querySelectorAll('.deck-swipe-flag').forEach(function (f) { f.style.opacity = '0'; });
      }
      dx = 0;
    }

    card.addEventListener('pointerdown', onPointerDown);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerup', onPointerUp);
    card.addEventListener('pointercancel', onPointerUp);
  }

  var connectModal = document.getElementById('connect-modal');
  var connectModalClose = document.getElementById('connect-modal-close');
  var connectName = document.getElementById('connect-name');
  var connectChoices = document.getElementById('connect-modal-choices');
  var connectConfirmedWrap = document.getElementById('connect-modal-confirmed');
  var connectConfirmation = document.getElementById('connect-confirmation');
  var connectContinue = document.getElementById('connect-continue');

  function openConnectModal(name) {
    if (!connectModal) return;
    if (connectName) connectName.textContent = name;
    connectChoices.hidden = false;
    connectConfirmedWrap.hidden = true;
    connectModal.hidden = false;
    connectModalClose.focus();
  }

  function closeConnectModal() {
    if (connectModal) connectModal.hidden = true;
    pendingConnectEmployee = null;
  }

  function showConnectConfirmation(message) {
    connectChoices.hidden = true;
    connectConfirmedWrap.hidden = false;
    connectConfirmation.textContent = message;
    connectContinue.focus();
  }

  var messageButton = document.getElementById('connect-message');
  if (messageButton) {
    messageButton.addEventListener('click', function () {
      showConnectConfirmation('This is a prototype — in the full product, this would open a Teams chat with ' + (connectName ? connectName.textContent : 'this person') + '.');
    });
  }

  var scheduleButton = document.getElementById('connect-schedule');
  if (scheduleButton) {
    scheduleButton.addEventListener('click', function () {
      showConnectConfirmation('This is a prototype — in the full product, this would open a meeting scheduler with ' + (connectName ? connectName.textContent : 'this person') + '.');
    });
  }

  var cancelButton = document.getElementById('connect-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', function () {
      closeConnectModal();
      resetTopCardPosition();
    });
  }

  if (connectModalClose) {
    connectModalClose.addEventListener('click', function () {
      closeConnectModal();
      resetTopCardPosition();
    });
  }

  if (connectContinue) {
    connectContinue.addEventListener('click', function () {
      var employee = pendingConnectEmployee;
      closeConnectModal();
      var card = deckStack.querySelector('.is-top');
      if (card && employee) {
        flyCard(card, 'right', function () { commitDecision(employee, 'connect'); });
      } else if (employee) {
        commitDecision(employee, 'connect');
      }
    });
  }

  if (connectModal) {
    connectModal.addEventListener('click', function (event) {
      if (event.target === connectModal) {
        closeConnectModal();
        resetTopCardPosition();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && connectModal && !connectModal.hidden) {
      closeConnectModal();
      resetTopCardPosition();
    }
  });

  applyFilters();
})();
