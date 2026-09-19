from django.shortcuts import render

from .data import ARCHETYPE_TARGETS, DIMENSIONS, MINERAL_ORDER, MINERALS, QUESTIONS, score_answers


def quiz(request):
    return render(request, 'personality/quiz.html', {
        'questions': QUESTIONS, 'question_count': len(QUESTIONS),
    })


def result(request):
    answers = {question['id']: request.GET.get(question['id']) for question in QUESTIONS}
    has_result = all(value in {'1', '2', '3', '4', '5'} for value in answers.values())
    if has_result:
        scores, mineral_key = score_answers(answers)
    else:
        # A clearly labelled example, also used when a result URL is opened directly.
        target = dict(zip((key for key, _label in DIMENSIONS), ARCHETYPE_TARGETS['copper']))
        example = {}
        for question in QUESTIONS:
            value = round(target[question['dimension']] / 25 + 1)
            example[question['id']] = 6 - value if question['reverse'] else value
        scores, mineral_key = score_answers(example)
    mineral = MINERALS[mineral_key]
    strongest = sorted(DIMENSIONS, key=lambda item: -scores[item[0]])[:2]
    return render(request, 'personality/result.html', {
        'mineral': mineral, 'mineral_key': mineral_key,
        'scores': [{'label': label, 'value': scores[key]} for key, label in DIMENSIONS],
        'strongest': [label for _key, label in strongest],
        'houses': [{'key': key, **MINERALS[key]} for key in MINERAL_ORDER],
        'complement': MINERALS[mineral['complement']],
        'has_result': has_result,
    })
