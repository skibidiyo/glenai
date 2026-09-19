from django.shortcuts import render

from .data import CURRENT_PROFILE, experience_band, get_employees_with_match_info


def matching_home(request):
    employees = get_employees_with_match_info()
    for employee in employees:
        employee['experience_band'] = experience_band(employee['experience_years'])

    countries = sorted({e['country'] for e in employees})
    all_skills = sorted({skill for e in employees for skill in e['can_teach']})

    context = {
        'profile': CURRENT_PROFILE,
        'employees': employees,
        'countries': countries,
        'skills': all_skills,
        'experience_bands': ['0-5 years', '6-10 years', '11-15 years', '16+ years'],
    }
    return render(request, 'matching/matching.html', context)
