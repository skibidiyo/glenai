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
        'about': 'I work with reporting and analysis, and I like finding the story behind a messy dataset. I enjoy helping colleagues get comfortable with Python and SQL, and I’m curious about how designers learn what people actually need.',
        'experience': ['Supported improvements to cross-team reporting routines', 'Helped colleagues adopt clearer data visualisation practices', 'Shared practical Python and SQL techniques with newer analysts'],
        'archetype_key': 'nickel',
    },
    {
        'id': 'marcus-reed',
        'name': 'Marcus Reed',
        'role': 'Operations Manager',
        'country': 'Germany',
        'experience_years': 18,
        'can_teach': ['Project Leadership', 'Operations Planning', 'Stakeholder Management'],
        'wants_to_learn': ['Data Visualisation', 'Digital Tools'],
        'meeting_mode': 'Online',
        'about': 'I’ve spent much of my career helping operational teams plan work and make thoughtful decisions when priorities shift. I enjoy sharing the lessons behind a plan, and I’d like to get better at using visual tools to explain complex operations.',
        'experience': ['Coordinated planning discussions across operational teams', 'Contributed to reviews of work processes and responsibilities', 'Supported colleagues developing project leadership skills'],
        'archetype_key': 'lead',
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
        'about': 'I design tools and workflows with the people who use them in mind. I like running small research sessions and trying early ideas with colleagues; lately I’ve wanted to bring more data into those design conversations.',
        'experience': ['Explored internal workflow concepts with colleagues', 'Helped develop reusable interface patterns for prototype tools', 'Shared user research approaches with cross-functional teams'],
        'archetype_key': 'cobalt',
    },
    {
        'id': 'daniel-okoro',
        'name': 'Daniel Okoro',
        'role': 'Technical Specialist',
        'country': 'South Africa',
        'experience_years': 20,
        'can_teach': ['Technical Operations', 'Safety Processes', 'Leadership'],
        'wants_to_learn': ['Digital Prototyping', 'UX Methods'],
        'meeting_mode': 'Online',
        'about': 'I’ve worked across technical operations for many years, and I enjoy making complicated procedures easier to understand. I like helping people ask questions without feeling rushed, while learning more about digital ways to explain and test ideas.',
        'experience': ['Helped document practical technical procedures', 'Supported colleagues learning safety-related processes', 'Contributed to team discussions about operational handovers'],
        'archetype_key': 'zinc',
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
        'about': 'I coordinate supply chain work, so I spend a lot of time connecting people who see different parts of the same process. I enjoy sharing planning habits that make handovers easier, and I’d like to learn how design tools can make those handovers clearer.',
        'experience': ['Coordinated routine logistics planning across teams', 'Helped clarify supplier and internal handoff steps', 'Shared practical vendor management approaches with colleagues'],
        'archetype_key': 'copper',
    },
    {
        'id': 'liam-obrien',
        'name': 'Liam O’Brien',
        'role': 'Graduate Engineer',
        'country': 'Australia',
        'experience_years': 1,
        'can_teach': ['Digital Prototyping', 'SQL'],
        'wants_to_learn': ['Operations Planning', 'Stakeholder Management'],
        'meeting_mode': 'In-person',
        'about': 'I’m early in my engineering career and like building small prototypes to test an idea before we commit to it. I’ve picked up SQL and digital modelling skills that I’m happy to share, and I’m keen to learn how experienced teams plan work with stakeholders.',
        'experience': ['Assisted with early-stage digital prototype exercises', 'Helped organise technical information for team reviews', 'Shared basic SQL techniques with fellow graduates'],
        'archetype_key': 'cobalt',
    },
]


# Editorial demo labels for fictional profiles; these are not quiz-derived assessments.
ARCHETYPES = {
    'copper': {
        'name': 'Copper',
        'tagline': 'The Connector',
        'description': 'This archetype may reflect a preference for bringing people, ideas, and perspectives together.',
        'teaching_style': 'They may prefer a conversational and collaborative approach, using discussion and shared experiences to explain ideas.',
        'learning_style': 'They might find it easier to learn through conversation, feedback, and exchanging perspectives with others.',
        'collaboration_style': 'They may enjoy connecting people across teams and helping communication flow between different perspectives.',
        'buddy_style': 'They could be especially helpful when sharing context or helping someone see how different ideas fit together.',
    },
    'cobalt': {
        'name': 'Cobalt',
        'tagline': 'The Energiser',
        'description': 'This archetype may reflect curiosity, experimentation, and an interest in exploring new possibilities.',
        'teaching_style': 'They may prefer an exploratory and hands-on approach, encouraging others to experiment and test ideas.',
        'learning_style': 'They might enjoy learning by trying unfamiliar approaches, exploring alternatives, and solving new problems.',
        'collaboration_style': 'They may enjoy brainstorming, questioning assumptions, and exploring different directions with others.',
        'buddy_style': 'They could be especially helpful when someone wants to experiment or approach a problem from another angle.',
    },
    'zinc': {
        'name': 'Zinc',
        'tagline': 'The Protector',
        'description': 'This archetype may reflect a supportive and adaptable approach to working with others.',
        'teaching_style': 'They may prefer a patient and supportive approach, adjusting explanations and pace to the other person’s needs.',
        'learning_style': 'They might find it easier to learn where there is space to ask questions, practise, and adjust.',
        'collaboration_style': 'They may pay close attention to team needs and adapt when circumstances change.',
        'buddy_style': 'They could be especially helpful in creating a low-pressure learning environment.',
    },
    'lead': {
        'name': 'Lead',
        'tagline': 'The Anchor',
        'description': 'This archetype may reflect a preference for calm judgement, careful consideration, and grounded decisions.',
        'teaching_style': 'They may prefer to explain what to do and why it matters, including context, risks, and trade-offs.',
        'learning_style': 'They might prefer time to process information and consider consequences before applying something new.',
        'collaboration_style': 'They may bring a calm perspective and help teams think through risks and possible outcomes.',
        'buddy_style': 'They could be especially helpful when learning involves responsibility, risk awareness, or careful judgement.',
    },
    'nickel': {
        'name': 'Nickel',
        'tagline': 'The Reinforcer',
        'description': 'This archetype may reflect a preference for structure, reliability, and turning plans into practical execution.',
        'teaching_style': 'They may prefer a structured approach, breaking skills into clear steps and hands-on practice.',
        'learning_style': 'They might find it easier to learn through clear goals, practical application, and organised processes.',
        'collaboration_style': 'They may bring structure, consistency, and a focus on dependable outcomes.',
        'buddy_style': 'They could be especially helpful when someone wants practical steps and a reliable way to build a skill.',
    },
}


def get_employees_with_match_info():
    """Order fictional colleagues by overlap with the current learning profile."""
    results = []
    for employee in EMPLOYEES:
        overlap = sorted(set(employee['can_teach']) & set(CURRENT_PROFILE['wants_to_learn']))
        can_learn_from_you = sorted(set(employee['wants_to_learn']) & set(CURRENT_PROFILE['can_teach']))
        results.append({
            **employee,
            'teaches_you': overlap,
            'learns_from_you': can_learn_from_you,
            'archetype': ARCHETYPES[employee['archetype_key']],
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
