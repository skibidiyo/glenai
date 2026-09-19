"""Mock, fictional employee data for the Skill Matching prototype.

No real Glencore employee information is used or referenced here.
"""

CURRENT_PROFILE = {
    'name': 'Alex Morgan',
    'role': 'UX Designer',
    'country': 'Australia',
    'experience_years': 3,
    'can_teach': ['UX Research', 'Figma', 'Design Thinking'],
    'wants_to_learn': ['Python', 'Data Analytics', 'SQL'],
}

EMPLOYEES = [
    {
        'id': 'priya-sharma',
        'name': 'Priya Sharma',
        'role': 'Senior Data Analyst',
        'country': 'India',
        'experience_years': 12,
        'can_teach': ['Python', 'Data Analytics', 'SQL'],
        'wants_to_learn': ['UX Research', 'Design Thinking'],
        'meeting_mode': 'Online',
    },
    {
        'id': 'marcus-reed',
        'name': 'Marcus Reed',
        'role': 'Operations Manager',
        'country': 'Germany',
        'experience_years': 18,
        'can_teach': ['Project Leadership', 'Operations Planning', 'Stakeholder Management'],
        'wants_to_learn': ['Data Visualisation', 'Digital Tools'],
        'meeting_mode': 'In-person',
    },
    {
        'id': 'aiko-tanaka',
        'name': 'Aiko Tanaka',
        'role': 'Product Designer',
        'country': 'Japan',
        'experience_years': 6,
        'can_teach': ['Design Systems', 'User Research'],
        'wants_to_learn': ['Data Analytics', 'Python'],
        'meeting_mode': 'Online',
    },
    {
        'id': 'daniel-okoro',
        'name': 'Daniel Okoro',
        'role': 'Technical Specialist',
        'country': 'South Africa',
        'experience_years': 20,
        'can_teach': ['Technical Operations', 'Safety Processes', 'Leadership'],
        'wants_to_learn': ['Digital Prototyping', 'UX Methods'],
        'meeting_mode': 'In-person',
    },
    {
        'id': 'sofia-castillo',
        'name': 'Sofia Castillo',
        'role': 'Supply Chain Coordinator',
        'country': 'Chile',
        'experience_years': 9,
        'can_teach': ['Logistics Planning', 'Vendor Management'],
        'wants_to_learn': ['Figma', 'Design Thinking'],
        'meeting_mode': 'Online',
    },
    {
        'id': 'liam-obrien',
        'name': 'Liam O’Brien',
        'role': 'Graduate Engineer',
        'country': 'Australia',
        'experience_years': 1,
        'can_teach': ['Digital Prototyping', 'SQL'],
        'wants_to_learn': ['Operations Planning', 'Stakeholder Management'],
        'meeting_mode': 'Online',
    },
]


def _matches_learning_goal(employee):
    """Count how many of the current profile's learning goals this employee can teach."""
    return len(set(employee['can_teach']) & set(CURRENT_PROFILE['wants_to_learn']))


def get_employees_with_match_info():
    """Attach a transparent, rule-based match summary to each mock employee."""
    results = []
    for employee in EMPLOYEES:
        overlap = sorted(set(employee['can_teach']) & set(CURRENT_PROFILE['wants_to_learn']))
        can_learn_from_you = sorted(set(employee['wants_to_learn']) & set(CURRENT_PROFILE['can_teach']))
        results.append({
            **employee,
            'teaches_you': overlap,
            'learns_from_you': can_learn_from_you,
        })
    results.sort(key=lambda e: (len(e['teaches_you']) + len(e['learns_from_you'])), reverse=True)
    return results


EXPERIENCE_BANDS = ['0-5 years', '6-10 years', '11-15 years', '16+ years']


def experience_band(years):
    if years <= 5:
        return EXPERIENCE_BANDS[0]
    if years <= 10:
        return EXPERIENCE_BANDS[1]
    if years <= 15:
        return EXPERIENCE_BANDS[2]
    return EXPERIENCE_BANDS[3]
