(function () {
  'use strict';
  var data = document.getElementById('quiz-questions-data');
  if (!data) return;
  var questions = JSON.parse(data.textContent);
  var container = document.getElementById('quiz-questions');
  var fill = document.getElementById('quiz-progress-fill');
  var label = document.getElementById('quiz-progress-label');
  var back = document.getElementById('quiz-back');
  var next = document.getElementById('quiz-next');
  var current = 0;
  var answers = {};
  var choices = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];

  questions.forEach(function (question, index) {
    var section = document.createElement('section');
    section.className = 'quiz-question';
    var heading = document.createElement('h2');
    heading.textContent = question.prompt;
    section.appendChild(heading);
    var group = document.createElement('div');
    group.className = 'likert-options';
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', question.prompt);
    choices.forEach(function (choice, position) {
      var item = document.createElement('label');
      item.className = 'likert-choice';
      var input = document.createElement('input');
      input.type = 'radio';
      input.name = question.id;
      input.value = String(position + 1);
      input.addEventListener('change', function () {
        answers[question.id] = input.value;
        render();
      });
      item.appendChild(input);
      var text = document.createElement('span');
      text.textContent = choice;
      item.appendChild(text);
      group.appendChild(item);
    });
    section.appendChild(group);
    container.appendChild(section);
  });

  function render() {
    container.querySelectorAll('.quiz-question').forEach(function (section, index) {
      section.classList.toggle('active', index === current);
      section.hidden = index !== current;
    });
    fill.style.width = ((current + 1) / questions.length * 100) + '%';
    label.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
    back.disabled = current === 0;
    next.disabled = !answers[questions[current].id];
    next.textContent = current === questions.length - 1 ? 'See my work style' : 'Next';
  }

  back.addEventListener('click', function () { if (current) { current -= 1; render(); } });
  next.addEventListener('click', function () {
    if (!answers[questions[current].id]) return;
    if (current < questions.length - 1) { current += 1; render(); return; }
    var params = new URLSearchParams();
    questions.forEach(function (question) { params.set(question.id, answers[question.id]); });
    window.location.href = (window.PERSONALITY_RESULT_URL || '/personality/result/') + '?' + params.toString();
  });
  render();
})();
