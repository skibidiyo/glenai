(function () {
  'use strict';
  var source = document.getElementById('match-employees-data');
  if (!source) return;
  var people = JSON.parse(source.textContent);
  var learningName = document.getElementById('profile-modal-title').textContent.trim();
  document.getElementById('learning-avatar').textContent = learningName.split(/\s+/).filter(Boolean).map(function (part) { return part.charAt(0); }).slice(0, 2).join('').toUpperCase();
  var learningProfile = { canTeach: [], wantsToLearn: [], role: '', country: '', years: 0 };
  var queue = people.slice();
  var index = 0;
  var saved = [];
  try { saved = JSON.parse(localStorage.getItem('glen-saved-buddies') || '[]'); } catch (_error) { saved = []; }
  if (!Array.isArray(saved)) saved = [];
  var card = document.getElementById('buddy-card');
  var previous = document.getElementById('deck-previous');
  var next = document.getElementById('deck-next');
  var pass = document.getElementById('deck-pass');
  var save = document.getElementById('deck-save');
  var connect = document.getElementById('deck-connect');
  var activeModal = null;
  var modalTrigger = null;
  var escapeHtml = function (value) { var el = document.createElement('span'); el.textContent = value == null ? '' : String(value); return el.innerHTML; };
  var plural = function (count, word) { return count + ' ' + word + (count === 1 ? '' : 's'); };

  function chips(skills, kind) {
    return skills.map(function (skill) { return '<span class="skill-chip ' + kind + '">' + escapeHtml(skill) + '</span>'; }).join('');
  }
  function current() { return queue[index]; }
  function persistSaved() { try { localStorage.setItem('glen-saved-buddies', JSON.stringify(saved)); } catch (_error) {} }
  function render() {
    var person = current();
    var total = queue.length;
    var available = !!person;
    document.getElementById('no-results').hidden = total !== 0;
    document.getElementById('deck-empty').hidden = !total || available;
    card.hidden = !available;
    document.getElementById('deck-controls').hidden = !available;
    previous.disabled = index === 0;
    next.disabled = !available || index >= total - 1;
    document.getElementById('deck-counter').textContent = available ? (index + 1) + ' of ' + total : total ? 'All ' + total + ' viewed' : '0 profiles';
    document.getElementById('saved-count').textContent = saved.length ? plural(saved.length, 'profile') + ' saved on this device' : '';
    document.getElementById('saved-badge').textContent = saved.length ? '(' + saved.length + ')' : '';
    if (!available) return;
    var archetype = person.archetype;
    var experience = function (items) {
      return '<ul class="experience-list">' + items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') + '</ul>';
    };
    function archetypePanel(full) {
      return '<section class="archetype-panel" aria-label="Mineral Archetype"><span class="section-kicker">MINERAL ARCHETYPE</span><h4 class="archetype-name">' + escapeHtml(archetype.name) + ' · ' + escapeHtml(archetype.tagline) + '</h4><p class="archetype-description">' + escapeHtml(archetype.description) + '</p><span class="archetype-insight-label">ARCHETYPE-BASED INSIGHTS</span><div class="archetype-insight-grid"><div><h5>Teaching style</h5><p>' + escapeHtml(archetype.teaching_style) + '</p></div><div><h5>Learning style</h5><p>' + escapeHtml(archetype.learning_style) + '</p></div>' + (full ? '<div><h5>Collaboration style</h5><p>' + escapeHtml(archetype.collaboration_style) + '</p></div><div><h5>As a learning buddy</h5><p>' + escapeHtml(archetype.buddy_style) + '</p></div>' : '') + '</div></section>';
    }
    card.innerHTML = '<div class="buddy-identity"><span class="buddy-avatar" aria-hidden="true">' + escapeHtml(person.name.slice(0, 1)) + '</span><div><span class="section-kicker">FICTIONAL DEMO PROFILE</span><h3>' + escapeHtml(person.name) + '</h3><p>' + escapeHtml(person.role) + ' · ' + escapeHtml(person.country) + ' · ' + escapeHtml(person.experience_years) + ' years experience</p><p>Available for ' + escapeHtml(person.meeting_mode.toLowerCase()) + ' mentoring</p></div></div>' +
      '<div class="buddy-content"><div class="skill-columns"><div><h4>CAN TEACH YOU</h4><div class="skill-chip-list">' + chips(person.can_teach, 'teach') + '</div></div><div><h4>WANTS TO LEARN FROM YOU</h4><div class="skill-chip-list">' + chips(person.wants_to_learn, 'learn') + '</div></div></div>' +
      '<div class="buddy-section"><h4>ABOUT</h4><p>' + escapeHtml(person.about) + '</p></div>' +
      '<div class="buddy-section"><h4>EXPERIENCE AT GLENCORE</h4>' + experience(person.experience.slice(0, 2)) + '</div>' +
      archetypePanel(false) + '<button type="button" class="profile-link" id="view-full-profile">View full profile →</button></div>';
    save.classList.toggle('is-saved', saved.indexOf(person.id) !== -1);
    save.setAttribute('aria-pressed', saved.indexOf(person.id) !== -1 ? 'true' : 'false');
    save.innerHTML = saved.indexOf(person.id) !== -1 ? '<span aria-hidden="true">&#9645;</span> Saved' : '<span aria-hidden="true">&#9645;</span> Save';
    document.getElementById('view-full-profile').addEventListener('click', function () {
      document.getElementById('profile-detail-title').textContent = person.name;
      document.getElementById('profile-detail-body').innerHTML = '<p>' + escapeHtml(person.role) + ' · ' + escapeHtml(person.country) + ' · ' + escapeHtml(person.experience_years) + ' years experience</p><p>Available for ' + escapeHtml(person.meeting_mode.toLowerCase()) + ' mentoring.</p><h3>Can teach you</h3><div class="skill-chip-list">' + chips(person.can_teach, 'teach') + '</div><h3>Wants to learn from you</h3><div class="skill-chip-list">' + chips(person.wants_to_learn, 'learn') + '</div><h3>About</h3><p>' + escapeHtml(person.about) + '</p><h3>Experience at Glencore</h3>' + experience(person.experience) + archetypePanel(true);
      openModal('profile-detail-modal');
    });
  }
  function move(delta) { index = Math.max(0, Math.min(queue.length, index + delta)); render(); }
  previous.addEventListener('click', function () { move(-1); });
  next.addEventListener('click', function () { move(1); });
  pass.addEventListener('click', function () { move(1); });
  document.getElementById('deck-restart').addEventListener('click', function () { index = 0; render(); });
  save.addEventListener('click', function () {
    var person = current(); if (!person) return;
    if (saved.indexOf(person.id) === -1) saved.push(person.id); else saved = saved.filter(function (id) { return id !== person.id; });
    persistSaved(); render();
  });
  connect.addEventListener('click', function () {
    if (!current()) return;
    document.getElementById('connect-name').textContent = current().name;
    document.getElementById('connect-choices').hidden = false;
    document.getElementById('connect-confirmed').hidden = true;
    openModal('connect-modal');
  });
  document.getElementById('connect-message').addEventListener('click', function () { confirmConnect('In the full product, this would start a Teams conversation. No message was sent.'); });
  document.getElementById('connect-schedule').addEventListener('click', function () { confirmConnect('In the full product, this would open a meeting scheduler. No invitation was sent.'); });
  function confirmConnect(message) {
    document.getElementById('connect-choices').hidden = true;
    document.getElementById('connect-confirmed').hidden = false;
    document.getElementById('connect-confirmation').textContent = message;
    document.getElementById('connect-continue').focus();
  }
  document.getElementById('connect-continue').addEventListener('click', function () { closeModal(); move(1); });

  function openModal(id) {
    modalTrigger = document.activeElement;
    activeModal = document.getElementById(id);
    activeModal.hidden = false;
    activeModal.querySelector('.modal-close').focus();
  }
  function closeModal() {
    if (!activeModal) return;
    activeModal.hidden = true;
    activeModal = null;
    if (modalTrigger) modalTrigger.focus();
  }
  document.getElementById('profile-open').addEventListener('click', function () { openModal('profile-modal'); });
  function splitSkills(value) { return value.split(',').map(function (skill) { return skill.trim(); }).filter(Boolean); }
  learningProfile.canTeach = splitSkills(document.getElementById('learning-teach').value);
  learningProfile.wantsToLearn = splitSkills(document.getElementById('learning-learn').value);
  learningProfile.role = document.getElementById('learning-role').value;
  learningProfile.country = document.getElementById('learning-country').value;
  learningProfile.years = Number(document.getElementById('learning-years').value);
  document.getElementById('profile-edit').addEventListener('click', function () {
    document.getElementById('learning-role').value = learningProfile.role;
    document.getElementById('learning-country').value = learningProfile.country;
    document.getElementById('learning-years').value = String(learningProfile.years);
    document.getElementById('learning-teach').value = learningProfile.canTeach.join(', ');
    document.getElementById('learning-learn').value = learningProfile.wantsToLearn.join(', ');
    closeModal(); openModal('profile-edit-modal');
  });
  document.getElementById('learning-edit-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var teachInput = document.getElementById('learning-teach');
    var learnInput = document.getElementById('learning-learn');
    var canTeach = splitSkills(teachInput.value);
    var wantsToLearn = splitSkills(learnInput.value);
    if (!canTeach.length || !wantsToLearn.length) {
      (canTeach.length ? learnInput : teachInput).focus();
      return;
    }
    var role = document.getElementById('learning-role').value.trim();
    var country = document.getElementById('learning-country').value.trim();
    var years = Number(document.getElementById('learning-years').value);
    if (!role || !country) return;
    learningProfile.canTeach = canTeach;
    learningProfile.wantsToLearn = wantsToLearn;
    learningProfile.role = role;
    learningProfile.country = country;
    learningProfile.years = years;
    document.getElementById('learning-profile-meta').textContent = role + ' · ' + country + ' · ' + years + ' years experience';
    document.getElementById('learning-teach-skills').innerHTML = chips(canTeach, 'teach');
    document.getElementById('learning-learn-skills').innerHTML = chips(wantsToLearn, 'learn');
    closeModal();
    applyFilters();
  });
  document.getElementById('filters-open').addEventListener('click', function () { openModal('filters-modal'); });
  document.getElementById('saved-open').addEventListener('click', function () {
    var list = document.getElementById('saved-list');
    var savedPeople = people.filter(function (person) { return saved.indexOf(person.id) !== -1; });
    list.innerHTML = savedPeople.length ? savedPeople.map(function (person) { return '<button class="saved-person" type="button" data-person="' + escapeHtml(person.id) + '"><strong>' + escapeHtml(person.name) + '</strong><span>' + escapeHtml(person.role) + ' · ' + escapeHtml(person.country) + '</span></button>'; }).join('') : '<p>No profiles saved yet. Save a colleague while browsing to find them here.</p>';
    list.querySelectorAll('[data-person]').forEach(function (button) { button.addEventListener('click', function () {
      document.querySelectorAll('#matching-filters select').forEach(function (element) { element.value = ''; });
      queue = people.slice(); index = queue.findIndex(function (person) { return person.id === button.dataset.person; }); render(); closeModal();
    }); });
    openModal('saved-modal');
  });

  document.querySelectorAll('[data-close]').forEach(function (button) { button.addEventListener('click', closeModal); });
  document.querySelectorAll('.modal-overlay').forEach(function (overlay) { overlay.addEventListener('click', function (event) { if (event.target === overlay) closeModal(); }); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && activeModal) closeModal();
    if (event.key === 'Tab' && activeModal) {
      var focusable = Array.from(activeModal.querySelectorAll('button:not([disabled]),select,input,textarea')).filter(function (element) { return !element.closest('[hidden]'); });
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  function applyFilters() {
    var skill = document.getElementById('filter-skill').value;
    var country = document.getElementById('filter-country').value;
    var experience = document.getElementById('filter-experience').value;
    var mode = document.getElementById('filter-mode').value;
    queue = people.filter(function (person) { return (!skill || person.can_teach.indexOf(skill) !== -1) && (!country || person.country === country) && (!experience || person.experience_band === experience) && (!mode || person.meeting_mode === mode); });
    function overlap(person) { return person.can_teach.filter(function (item) { return learningProfile.wantsToLearn.indexOf(item) !== -1; }).length + person.wants_to_learn.filter(function (item) { return learningProfile.canTeach.indexOf(item) !== -1; }).length; }
    queue.sort(function (a, b) { return overlap(b) - overlap(a); });
    index = 0; render(); closeModal();
  }
  document.getElementById('filter-apply').addEventListener('click', applyFilters);
  document.getElementById('filter-reset').addEventListener('click', function () { document.querySelectorAll('#matching-filters select').forEach(function (element) { element.value = ''; }); applyFilters(); });
  render();
})();
