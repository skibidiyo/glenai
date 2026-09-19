from django.shortcuts import render

from .data import MINERAL_ORDER, MINERALS, QUESTIONS


def quiz(request):
    context = {
        'questions': QUESTIONS,
        'question_count': len(QUESTIONS),
    }
    return render(request, 'personality/quiz.html', context)


def result(request):
    mineral_key = request.GET.get('mineral', '')
    if mineral_key not in MINERALS:
        mineral_key = MINERAL_ORDER[0]

    mineral = MINERALS[mineral_key]
    other_minerals = [MINERALS[key] for key in MINERAL_ORDER if key != mineral_key]
    complements = [MINERALS[key] for key in mineral['complements']]

    context = {
        'mineral': mineral,
        'other_minerals': other_minerals,
        'complements': complements,
        'has_result': bool(request.GET.get('mineral')),
    }
    return render(request, 'personality/result.html', context)
