(function () {
  'use strict';

  var questionsDataEl = document.getElementById('quiz-questions-data');
  if (questionsDataEl) {
    initQuiz(JSON.parse(questionsDataEl.textContent));
  }

  function initQuiz(questions) {
    var questionsContainer = document.getElementById('quiz-questions');
    var progressFill = document.getElementById('quiz-progress-fill');
    var progressLabel = document.getElementById('quiz-progress-label');
    var backButton = document.getElementById('quiz-back');
    var nextButton = document.getElementById('quiz-next');

    var current = 0;
    var answers = {};

    questions.forEach(function (question, index) {
      var wrapper = document.createElement('div');
      wrapper.className = 'quiz-question' + (index === 0 ? ' active' : '');
      wrapper.dataset.index = String(index);

      var heading = document.createElement('h2');
      heading.textContent = question.prompt;
      wrapper.appendChild(heading);

      var list = document.createElement('ul');
      list.className = 'quiz-options';

      question.options.forEach(function (option, optionIndex) {
        var li = document.createElement('li');
        li.className = 'quiz-option';

        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = 'radio';
        input.name = question.id;
        input.value = option.mineral;
        input.id = question.id + '-' + optionIndex;
        input.addEventListener('change', function () {
          answers[question.id] = option.mineral;
          nextButton.disabled = false;
        });

        label.setAttribute('for', input.id);
        label.appendChild(input);
        label.appendChild(document.createTextNode(option.text));
        li.appendChild(label);
        list.appendChild(li);
      });

      wrapper.appendChild(list);
      questionsContainer.appendChild(wrapper);
    });

    function render() {
      var slides = questionsContainer.querySelectorAll('.quiz-question');
      slides.forEach(function (slide, index) {
        slide.classList.toggle('active', index === current);
      });

      var percent = ((current + 1) / questions.length) * 100;
      progressFill.style.width = percent + '%';
      progressLabel.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;

      backButton.disabled = current === 0;
      var hasAnswer = Boolean(answers[questions[current].id]);
      nextButton.disabled = !hasAnswer;
      nextButton.textContent = current === questions.length - 1 ? 'See my result' : 'Next';
    }

    backButton.addEventListener('click', function () {
      if (current === 0) return;
      current -= 1;
      render();
    });

    nextButton.addEventListener('click', function () {
      var question = questions[current];
      if (!answers[question.id]) return;

      if (current < questions.length - 1) {
        current += 1;
        render();
        return;
      }

      var tally = { copper: 0, cobalt: 0, nickel: 0, zinc: 0 };
      Object.keys(answers).forEach(function (questionId) {
        var mineral = answers[questionId];
        if (mineral in tally) tally[mineral] += 1;
      });

      var order = ['copper', 'cobalt', 'nickel', 'zinc'];
      var best = order[0];
      var bestScore = -1;
      order.forEach(function (mineral) {
        if (tally[mineral] > bestScore) {
          bestScore = tally[mineral];
          best = mineral;
        }
      });

      var destination = (window.PERSONALITY_RESULT_URL || '/personality/result/') + '?mineral=' + best;
      window.location.href = destination;
    });

    render();
  }

  var findComplementBtn = document.getElementById('find-complement-btn');
  var networkingConfirmation = document.getElementById('networking-confirmation');
  if (findComplementBtn && networkingConfirmation) {
    findComplementBtn.addEventListener('click', function () {
      networkingConfirmation.hidden = false;
    });
  }
})();
