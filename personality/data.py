"""Prototype quiz content and copy for the Mineral Personality experience.

This is a lightweight workplace discovery activity, not a validated
psychometric instrument. No employment decisions should be based on it.
"""

QUESTIONS = [
    {
        'id': 'q1',
        'prompt': 'When working on a new problem, I usually...',
        'options': [
            {'text': 'Bring people together and build agreement', 'mineral': 'copper'},
            {'text': 'Explore unusual ideas and experiment', 'mineral': 'cobalt'},
            {'text': 'Create structure and establish a dependable plan', 'mineral': 'nickel'},
            {'text': 'Adapt quickly as new information appears', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q2',
        'prompt': 'In a team meeting, I’m most likely to...',
        'options': [
            {'text': 'Check in on how everyone is feeling about the plan', 'mineral': 'copper'},
            {'text': 'Suggest a completely different way of looking at it', 'mineral': 'cobalt'},
            {'text': 'Ask what the timeline and next steps are', 'mineral': 'nickel'},
            {'text': 'Point out a risk that needs a quick workaround', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q3',
        'prompt': 'A colleague asks for help with a task outside my usual role. I...',
        'options': [
            {'text': 'Offer to loop in others who might help too', 'mineral': 'copper'},
            {'text': 'Get curious and try a new approach to it', 'mineral': 'cobalt'},
            {'text': 'Break it into steps and work through it methodically', 'mineral': 'nickel'},
            {'text': 'Improvise with whatever is on hand', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q4',
        'prompt': 'My colleagues would probably describe me as...',
        'options': [
            {'text': 'Warm and easy to talk to', 'mineral': 'copper'},
            {'text': 'Full of ideas', 'mineral': 'cobalt'},
            {'text': 'Dependable and consistent', 'mineral': 'nickel'},
            {'text': 'Quick on my feet', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q5',
        'prompt': 'When plans change at the last minute, I...',
        'options': [
            {'text': 'Check in with the people affected first', 'mineral': 'copper'},
            {'text': 'Get energised by the chance to try something new', 'mineral': 'cobalt'},
            {'text': 'Look for a way to restore a stable plan quickly', 'mineral': 'nickel'},
            {'text': 'Shift direction without much friction', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q6',
        'prompt': 'The part of a project I enjoy most is...',
        'options': [
            {'text': 'Coordinating everyone toward the same goal', 'mineral': 'copper'},
            {'text': 'The early, open-ended brainstorming', 'mineral': 'cobalt'},
            {'text': 'Seeing a solid process through to completion', 'mineral': 'nickel'},
            {'text': 'Solving the unexpected problem that comes up', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q7',
        'prompt': 'I feel most useful at work when I’m...',
        'options': [
            {'text': 'Helping resolve a disagreement between colleagues', 'mineral': 'copper'},
            {'text': 'Pitching a new idea nobody has tried yet', 'mineral': 'cobalt'},
            {'text': 'Keeping a project on track and on schedule', 'mineral': 'nickel'},
            {'text': 'Finding a practical fix under pressure', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q8',
        'prompt': 'When giving feedback to a colleague, I tend to...',
        'options': [
            {'text': 'Lead with encouragement and keep the relationship warm', 'mineral': 'copper'},
            {'text': 'Suggest a different angle they might not have considered', 'mineral': 'cobalt'},
            {'text': 'Reference the agreed plan or standard to keep things objective', 'mineral': 'nickel'},
            {'text': 'Focus on what can realistically change right now', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q9',
        'prompt': 'Faced with a tight deadline, I’m most likely to...',
        'options': [
            {'text': 'Rally the team and divide the work together', 'mineral': 'copper'},
            {'text': 'Look for a smarter, faster way to solve it', 'mineral': 'cobalt'},
            {'text': 'Lock in a clear checklist and work through it in order', 'mineral': 'nickel'},
            {'text': 'Juggle priorities and adjust as things move', 'mineral': 'zinc'},
        ],
    },
    {
        'id': 'q10',
        'prompt': 'A tool or process I rely on breaks unexpectedly. My first instinct is to...',
        'options': [
            {'text': 'Ask around to see who else has hit the same issue', 'mineral': 'copper'},
            {'text': 'Treat it as a chance to try a different tool altogether', 'mineral': 'cobalt'},
            {'text': 'Follow the documented fallback procedure', 'mineral': 'nickel'},
            {'text': 'Cobble together a quick workaround and keep moving', 'mineral': 'zinc'},
        ],
    },
]

MINERALS = {
    'copper': {
        'key': 'copper',
        'name': 'Copper',
        'tagline': 'The Connector',
        'traits': ['Collaborative', 'People-focused', 'Relationship builder', 'Turns conversation into action'],
        'strengths': ['Communication', 'Teamwork', 'Stakeholder engagement', 'Coordination'],
        'work_style': 'You bring people into the conversation early and keep them aligned as things move forward.',
        'collaboration_style': 'You build trust quickly and help teams find common ground before pushing ahead.',
        'growth_opportunities': ['Practising giving direct, structured feedback', 'Setting aside dedicated time for solo deep work'],
        'roles': ['Stakeholder engagement lead', 'Change management', 'Team coordination', 'Client-facing roles'],
        'complements': ['nickel', 'cobalt'],
    },
    'cobalt': {
        'key': 'cobalt',
        'name': 'Cobalt',
        'tagline': 'The Innovator',
        'traits': ['Curious', 'Exploratory', 'Creative', 'Interested in new possibilities'],
        'strengths': ['Experimentation', 'Ideation', 'Innovation', 'Problem solving'],
        'work_style': 'You gravitate toward the open-ended parts of a problem and enjoy testing unconventional ideas.',
        'collaboration_style': 'You energise a team’s thinking, especially early in a project when options are still open.',
        'growth_opportunities': ['Following an idea through to a finished, practical outcome', 'Building in structure once a plan is chosen'],
        'roles': ['Innovation and R&D', 'Product design', 'Strategy', 'Process improvement'],
        'complements': ['nickel', 'zinc'],
    },
    'nickel': {
        'key': 'nickel',
        'name': 'Nickel',
        'tagline': 'The Stabiliser',
        'traits': ['Reliable', 'Structured', 'Resilient', 'Consistent'],
        'strengths': ['Planning', 'Organisation', 'Process', 'Maintaining momentum'],
        'work_style': 'You bring order to ambiguity and make sure commitments are followed through.',
        'collaboration_style': 'Teams rely on you to keep a project grounded and moving steadily forward.',
        'growth_opportunities': ['Getting comfortable with a looser, less defined plan', 'Making space for experimentation'],
        'roles': ['Programme and project management', 'Operations', 'Planning and scheduling', 'Quality and process'],
        'complements': ['cobalt', 'copper'],
    },
    'zinc': {
        'key': 'zinc',
        'name': 'Zinc',
        'tagline': 'The Adapter',
        'traits': ['Flexible', 'Resourceful', 'Practical', 'Responsive to change'],
        'strengths': ['Adaptability', 'Finding solutions', 'Navigating changing situations', 'Connecting different perspectives'],
        'work_style': 'You stay practical under pressure and adjust course quickly when circumstances shift.',
        'collaboration_style': 'You help teams respond to the unexpected without losing momentum.',
        'growth_opportunities': ['Slowing down to document a process for others', 'Sticking with a long, steady plan without changing course'],
        'roles': ['Field and site operations', 'Troubleshooting and support', 'Cross-functional coordination', 'Logistics'],
        'complements': ['cobalt', 'nickel'],
    },
}

MINERAL_ORDER = ['copper', 'cobalt', 'nickel', 'zinc']


def score_answers(mineral_keys):
    """Tally selected mineral keys and return the winning mineral key.

    Ties are broken by the fixed MINERAL_ORDER so results are deterministic.
    """
    tally = {key: 0 for key in MINERAL_ORDER}
    for key in mineral_keys:
        if key in tally:
            tally[key] += 1
    best_score = max(tally.values()) if tally else 0
    for key in MINERAL_ORDER:
        if tally[key] == best_score:
            return key, tally
    return MINERAL_ORDER[0], tally
