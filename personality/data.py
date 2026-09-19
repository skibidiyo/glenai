"""Fictional work-style reflection content; not a psychological assessment."""

DIMENSIONS = [
    ('openness', 'Openness'),
    ('conscientiousness', 'Conscientiousness'),
    ('extraversion', 'Extraversion'),
    ('agreeableness', 'Agreeableness'),
    ('emotional_stability', 'Emotional Stability'),
]

# Three statements per dimension. Reverse items are inverted before averaging.
QUESTIONS = [
    {'id': 'o1', 'dimension': 'openness', 'reverse': False, 'prompt': 'I enjoy exploring several approaches before settling on one.'},
    {'id': 'o2', 'dimension': 'openness', 'reverse': False, 'prompt': 'An unfamiliar challenge makes me curious to try something new.'},
    {'id': 'o3', 'dimension': 'openness', 'reverse': True, 'prompt': 'I prefer familiar methods even when a new approach could be useful.'},
    {'id': 'c1', 'dimension': 'conscientiousness', 'reverse': False, 'prompt': 'I turn broad goals into clear steps and follow through on them.'},
    {'id': 'c2', 'dimension': 'conscientiousness', 'reverse': False, 'prompt': 'I keep track of details that others will need to deliver their work.'},
    {'id': 'c3', 'dimension': 'conscientiousness', 'reverse': True, 'prompt': 'I often leave the final details of a task until the last moment.'},
    {'id': 'e1', 'dimension': 'extraversion', 'reverse': False, 'prompt': 'Talking through ideas with colleagues gives me energy.'},
    {'id': 'e2', 'dimension': 'extraversion', 'reverse': False, 'prompt': 'I am comfortable bringing different people into a discussion.'},
    {'id': 'e3', 'dimension': 'extraversion', 'reverse': True, 'prompt': 'I usually avoid speaking up in a group, even when I have an idea to share.'},
    {'id': 'a1', 'dimension': 'agreeableness', 'reverse': False, 'prompt': 'I take time to understand how a decision affects other people.'},
    {'id': 'a2', 'dimension': 'agreeableness', 'reverse': False, 'prompt': 'I look for ways to support colleagues when priorities change.'},
    {'id': 'a3', 'dimension': 'agreeableness', 'reverse': True, 'prompt': 'When a disagreement arises, I rarely consider the other person’s perspective.'},
    {'id': 's1', 'dimension': 'emotional_stability', 'reverse': False, 'prompt': 'I can stay composed when a plan changes unexpectedly.'},
    {'id': 's2', 'dimension': 'emotional_stability', 'reverse': False, 'prompt': 'Under pressure, I can pause and consider the next sensible step.'},
    {'id': 's3', 'dimension': 'emotional_stability', 'reverse': True, 'prompt': 'A setback often makes it difficult for me to regain my focus.'},
]

MINERAL_ORDER = ['copper', 'cobalt', 'zinc', 'lead', 'nickel']

# Editorial archetype patterns in dimension order above, on a 0–100 scale.
# Every dimension contributes to squared-distance comparison. These are metaphors,
# not norms or validated psychological cutoffs. A fixed order breaks exact ties.
ARCHETYPE_TARGETS = {
    'copper': [70, 60, 85, 85, 70],  # social connection and cooperation
    'cobalt': [90, 55, 70, 55, 65],  # exploration and new possibilities
    'zinc': [60, 60, 50, 90, 75],  # support and team continuity
    'lead': [45, 75, 35, 55, 90],  # calm judgement before action
    'nickel': [50, 90, 45, 60, 80],  # structured, reliable execution
}

MINERALS = {
    'copper': {
        'name': 'Copper', 'tagline': 'The Connector', 'property': 'Copper conducts electricity and heat.',
        'inspiration': 'Inspired by copper’s conductivity, this archetype may reflect a working style that helps people, ideas, and information move across teams.',
        'summary': 'Helps ideas and relationships move across teams.', 'question': 'Who should we bring together?',
        'strengths': ['Communication', 'Facilitation', 'Connecting perspectives'],
        'work_style': 'You may prefer to move ideas forward through conversation and shared understanding.',
        'collaboration': 'You tend to bring people into the discussion and look for common ground.',
        'problem_solving': 'You may connect insights from several people before choosing a path.',
        'decisions': 'You tend to consider who should be involved and how to build alignment.',
        'leadership': 'You may contribute through collaborative, facilitative leadership.',
        'best': 'Cross-team work where communication and knowledge sharing matter.',
        'growth': ['Make room for focused individual work.', 'State a clear recommendation when discussion has run its course.'],
        'environments': ['Stakeholder engagement', 'Cross-functional projects', 'Communications'],
        'complement': 'nickel', 'complement_reason': 'Copper may help ideas travel across teams; Nickel may help turn them into reliable execution.',
    },
    'cobalt': {
        'name': 'Cobalt', 'tagline': 'The Energiser', 'property': 'Cobalt is used in high-performance technologies, including batteries and specialised materials.',
        'inspiration': 'Inspired by cobalt’s use in high-performance applications, this archetype may reflect curiosity and energy for new possibilities.',
        'summary': 'Brings momentum to new ideas.', 'question': 'What new possibility could we explore?',
        'strengths': ['Curiosity', 'Experimentation', 'Generating possibilities'],
        'work_style': 'You may enjoy exploring an open question before narrowing the options.',
        'collaboration': 'You tend to invite others to test assumptions and imagine alternatives.',
        'problem_solving': 'You may try a small experiment to learn what could work.',
        'decisions': 'You tend to value evidence from exploration before committing.',
        'leadership': 'You may contribute through vision-oriented, exploratory leadership.',
        'best': 'Early-stage challenges with room to test ideas.',
        'growth': ['Choose a practical next step after exploration.', 'Invite careful review of risks and constraints.'],
        'environments': ['Innovation', 'Technology', 'Transformation'],
        'complement': 'lead', 'complement_reason': 'Cobalt may explore possibilities; Lead may help assess risks and consequences.',
    },
    'zinc': {
        'name': 'Zinc', 'tagline': 'The Protector', 'property': 'Zinc is used to galvanise steel and help protect it from corrosion.',
        'inspiration': 'Inspired by zinc’s protective role in galvanisation, this archetype may reflect a supportive style that helps teams maintain effectiveness during change.',
        'summary': 'Supports teams through change.', 'question': 'How do we support the team through this?',
        'strengths': ['Consideration', 'Team support', 'Practical adaptability'],
        'work_style': 'You may notice what people need as circumstances shift.',
        'collaboration': 'You tend to make space for different needs and help others stay connected.',
        'problem_solving': 'You may find practical adjustments that protect team continuity.',
        'decisions': 'You tend to consider the impact of change on those doing the work.',
        'leadership': 'You may contribute through supportive, adaptive leadership.',
        'best': 'Collaborative work where circumstances or needs are changing.',
        'growth': ['Protect time for your own priorities.', 'Raise difficult issues early, even when doing so feels uncomfortable.'],
        'environments': ['Change support', 'People & Culture', 'Service and operational support'],
        'complement': 'cobalt', 'complement_reason': 'Zinc may sustain people through change; Cobalt may open up fresh possibilities.',
    },
    'lead': {
        'name': 'Lead', 'tagline': 'The Anchor', 'property': 'Lead’s density has supported shielding applications.',
        'inspiration': 'Inspired by lead’s density and shielding applications, this archetype may reflect grounding, careful judgement, and awareness of consequences.',
        'summary': 'Brings grounding and careful judgement.', 'question': 'What should we consider before we act?',
        'strengths': ['Risk awareness', 'Calm judgement', 'Deliberation'],
        'work_style': 'You may prefer to understand the implications before taking action.',
        'collaboration': 'You tend to offer a steady perspective when a team faces pressure.',
        'problem_solving': 'You may examine risks, assumptions and possible consequences.',
        'decisions': 'You tend to pause, weigh evidence and make considered choices.',
        'leadership': 'You may contribute through calm, deliberate leadership.',
        'best': 'Complex decisions where safety, risk or long-term effects matter.',
        'growth': ['Share your assessment early enough to shape the discussion.', 'Recognise when enough evidence is available to move.'],
        'environments': ['Risk and safety', 'Governance', 'Complex operations'],
        'complement': 'cobalt', 'complement_reason': 'Lead may assess consequences; Cobalt may bring fresh possibilities into view.',
    },
    'nickel': {
        'name': 'Nickel', 'tagline': 'The Reinforcer', 'property': 'Nickel can strengthen alloys and improve durability and corrosion resistance.',
        'inspiration': 'Inspired by nickel’s role in strengthening alloys, this archetype may reflect a preference for strengthening plans, systems, and reliable delivery.',
        'summary': 'Strengthens plans, systems and execution.', 'question': 'How do we make this stronger and deliver it reliably?',
        'strengths': ['Organisation', 'Implementation', 'Process improvement'],
        'work_style': 'You may turn broad intentions into workable systems and clear steps.',
        'collaboration': 'You tend to make responsibilities and handoffs easier to follow.',
        'problem_solving': 'You may improve a process so the solution works consistently.',
        'decisions': 'You tend to ask what can be delivered reliably with the available resources.',
        'leadership': 'You may contribute through structured, execution-focused leadership.',
        'best': 'Work that benefits from dependable implementation and repeatable processes.',
        'growth': ['Leave room to test unconventional ideas.', 'Check whether a process still serves the people using it.'],
        'environments': ['Operations', 'Project delivery', 'Engineering and process improvement'],
        'complement': 'copper', 'complement_reason': 'Nickel may turn plans into reliable delivery; Copper may help people align around them.',
    },
}


def score_answers(answers):
    """Return five 0–100 dimension scores and the closest editorial archetype.

    Answers map question IDs to Likert values 1–5. Reverse items use 6-value.
    Each dimension averages three items; (average-1)*25 yields 0–100.
    The selected house minimises squared distance across all five dimensions.
    Equal distances use MINERAL_ORDER, making results deterministic.
    """
    scores = {}
    for key, _label in DIMENSIONS:
        items = [q for q in QUESTIONS if q['dimension'] == key]
        values = []
        for item in items:
            value = int(answers[item['id']])
            if value < 1 or value > 5:
                raise ValueError('Responses must be between 1 and 5')
            values.append(6 - value if item['reverse'] else value)
        scores[key] = round((sum(values) / len(values) - 1) * 25)
    vector = [scores[key] for key, _label in DIMENSIONS]
    mineral = min(MINERAL_ORDER, key=lambda key: sum(
        (actual - target) ** 2 for actual, target in zip(vector, ARCHETYPE_TARGETS[key])
    ))
    return scores, mineral
