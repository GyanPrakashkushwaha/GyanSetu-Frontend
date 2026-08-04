/**
 * Mock data matching the exact backend JSON schema.
 * Used for the "Try Demo" flow so the UI can be tested without a live backend.
 */
export const MOCK_DATA = {
  metadata: {
    subject: "Mathematics",
    grade: "Class 12",
    difficulty: "Intermediate",
    topic: "Limits and Derivatives",
    chapter: "Calculus",
    category: "STEM",
    language: "English"
  },
  knowledge_base: {
    learning_objectives: [
      "Define limits and derivatives in the context of calculus.",
      "Calculate the limit of a function as it approaches a specific point.",
      "Determine the derivative of a function using the first principle of derivatives.",
      "Apply the rules of derivatives to find the derivatives of polynomial and trigonometric functions."
    ],
    prerequisites: [
      "Understanding of basic algebra and functions.",
      "Familiarity with the concept of a function and its graph.",
      "Knowledge of limits from previous mathematics courses."
    ],
    concepts: [
      "Limits of functions",
      "Derivatives of functions",
      "Instantaneous rate of change",
      "Algebra of limits and derivatives",
      "Standard limits and derivatives of functions"
    ],
    key_terms: [
      {
        term: "Limit",
        definition: "The value that a function approaches as the input approaches a specified value."
      },
      {
        term: "Derivative",
        definition: "The measure of how a function changes as its input changes, defined as the limit of the average rate of change of the function."
      },
      {
        term: "Instantaneous velocity",
        definition: "The derivative of the position function with respect to time, representing the velocity at a specific moment."
      },
      {
        term: "Average velocity",
        definition: "The total distance traveled divided by the total time taken."
      }
    ],
    formulae: [
      "s = 4.9t^2",
      "\\bar{v} = \\frac{f(t_2) - f(t_1)}{t_2 - t_1}",
      "f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}"
    ],
    misconceptions: [
      "Students may confuse the limit of a function with the value of the function at that point.",
      "Students might think that the derivative at a point can be calculated without considering the limit process.",
      "Students may believe that all functions have derivatives at every point, not recognizing points of discontinuity or non-differentiability."
    ]
  },
  teaching_plan: {
    total_periods: 6,
    rationale: "The pacing is designed to gradually build students' understanding of limits and derivatives, starting with foundational concepts and progressing to more complex applications.",
    periods: [
      { period_number: 1, focus_topic: "Prerequisites Review",          learning_outcome: "Students will understand the basic algebra and functions necessary for calculus.",               concepts_covered: ["Understanding of basic algebra and functions.", "Familiarity with the concept of a function and its graph."], estimated_minutes: 40 },
      { period_number: 2, focus_topic: "Introduction to Limits",        learning_outcome: "Students will be able to define limits in the context of calculus.",                             concepts_covered: ["Limits of functions"], estimated_minutes: 40 },
      { period_number: 3, focus_topic: "Calculating Limits",            learning_outcome: "Students will calculate the limit of a function as it approaches a specific point.",             concepts_covered: ["Algebra of limits and derivatives", "Standard limits and derivatives of functions"], estimated_minutes: 40 },
      { period_number: 4, focus_topic: "Introduction to Derivatives",   learning_outcome: "Students will define derivatives in the context of calculus.",                                   concepts_covered: ["Derivatives of functions", "Instantaneous rate of change"], estimated_minutes: 40 },
      { period_number: 5, focus_topic: "Calculating Derivatives",       learning_outcome: "Students will determine the derivative of a function using the first principle of derivatives.", concepts_covered: ["Apply the rules of derivatives to find derivatives of polynomial and trigonometric functions."], estimated_minutes: 40 },
      { period_number: 6, focus_topic: "Application of Derivatives",    learning_outcome: "Students will apply derivatives to solve real-world problems.",                                  concepts_covered: ["Instantaneous velocity", "Average velocity"], estimated_minutes: 40 }
    ]
  },
  learning_gaps: {
    gaps: [
      {
        misconception: "Students may confuse the limit of a function with the value of the function at that point.",
        severity_level: "High",
        diagnostic_question: "What do you think happens to the value of the function as it approaches a certain point, even if the function is not defined at that point?",
        remedial_action: "Use a visual representation, such as a graph, to show a function that approaches a limit but does not equal that limit at a specific point. For example, illustrate the function f(x) = (x²-1)/(x-1) as x approaches 1, highlighting that the limit is 2 while f(1) is undefined."
      },
      {
        misconception: "Students might think that the derivative at a point can be calculated without considering the limit process.",
        severity_level: "High",
        diagnostic_question: "Can you explain how you would find the slope of the tangent line at a specific point on a curve? What role do you think limits play in that process?",
        remedial_action: "Conduct a mini-activity where students calculate the slope of secant lines approaching a point on a curve, then transition to the concept of the derivative as the limit of these slopes."
      },
      {
        misconception: "Students may believe that all functions have derivatives at every point, not recognizing points of discontinuity or non-differentiability.",
        severity_level: "Medium",
        diagnostic_question: "Can you identify any points on a graph where the function might not have a derivative? What characteristics of the graph lead you to that conclusion?",
        remedial_action: "Provide students with various types of functions, including piecewise functions and functions with sharp corners or vertical tangents. Have them analyze these graphs to identify points of non-differentiability."
      }
    ]
  },
  period_contents: [
    {
      period_number: 1,
      script: {
        introduction: "Good morning, class! Today, we are diving into the fascinating world of calculus, specifically focusing on limits and derivatives. To kick things off, let's think about how we can predict the behavior of a function as we approach a certain point.",
        main_body: [
          "Begin by reviewing the definition of a function. A function is a relationship between a set of inputs and a set of possible outputs, where each input is related to exactly one output.",
          "Discuss the importance of understanding limits in calculus. A limit helps us understand the behavior of a function as it approaches a certain point.",
          "Introduce the concept of left-hand and right-hand limits.",
          "Use the example of a piecewise function to illustrate both limit types."
        ],
        conclusion: "In summary, today we reviewed the basic concepts of functions and limits, which are foundational for understanding calculus."
      },
      activity: {
        title: "Limit Exploration",
        duration_minutes: 15,
        materials_needed: [],
        instructions: [
          "Divide the class into small groups of 3-4 students.",
          "Assign each group a different function to analyze.",
          "Ask each group to calculate the limit of their function as x approaches a specific point.",
          "Have each group present their findings to the class."
        ]
      },
      assessment: {
        questions: [
          "What is the limit of f(x) = x² as x approaches 0?",
          "Explain the difference between left-hand and right-hand limits using an example.",
          "For the function g(x) = |x|, what is the limit as x approaches 0?"
        ],
        answer_key: [
          "0",
          "Left-hand limit is the value as x approaches from the left; right-hand limit is from the right.",
          "0"
        ]
      }
    },
    {
      period_number: 2,
      script: {
        introduction: "Today, we are going to explore the concept of limits in calculus. Imagine you are on a road trip, and you are getting closer to your destination. In mathematics, limits help us understand how functions behave as we get closer to a specific point.",
        main_body: [
          "Define the concept of limits: A limit is the value that a function approaches as the input approaches a certain point.",
          "Introduce the notation: lim(x→a) f(x) = l.",
          "Use f(x) = x² as an example: as x gets closer to 0, f(x) approaches 0.",
          "Discuss g(x) = |x|: lim(x→0) g(x) = 0 holds even though the function changes direction.",
          "Explain left-hand and right-hand limits with the piecewise function example."
        ],
        conclusion: "In summary, limits allow us to understand the behavior of functions as they approach specific points."
      },
      activity: {
        title: "Limit Exploration Groups",
        duration_minutes: 15,
        materials_needed: [],
        instructions: [
          "Divide students into small groups.",
          "Assign each group a different function: f(x)=x², g(x)=|x|, h(x)=(x²-4)/(x-2).",
          "Ask each group to compute the limit as x approaches 0 or 2.",
          "Encourage groups to share their findings."
        ]
      },
      assessment: {
        questions: [
          "What does it mean for a limit to exist?",
          "How do you denote the limit of a function as it approaches a certain point?",
          "Can the limit of a function at a point be different from the function's value at that point?"
        ],
        answer_key: [
          "A limit exists if the left-hand limit and right-hand limit are equal.",
          "The limit is denoted as lim(x→a) f(x) = l.",
          "Yes, the limit can exist even if the function is not defined at that point."
        ]
      }
    },
    {
      period_number: 3,
      script: {
        introduction: "Today, we are diving into the fascinating world of limits! Imagine you are approaching a destination, but you can only see the road ahead. The closer you get, the clearer the path becomes.",
        main_body: [
          "Introduce left-hand and right-hand limits using the analogy of approaching a destination from different directions.",
          "Define the limit of a function at a point as the common value of left and right-hand limits.",
          "Present the algebra of limits: lim[f(x) ± g(x)] = lim f(x) ± lim g(x).",
          "Introduce standard limits: lim(x→0) sin(x)/x = 1.",
          "Explain the derivative definition: f'(a) = lim(h→0) [f(a+h)-f(a)]/h."
        ],
        conclusion: "In summary, limits are essential for understanding how functions behave near specific points."
      },
      activity: {
        title: "Limit Exploration Stations",
        duration_minutes: 15,
        materials_needed: ["Graph paper", "Markers", "Calculators", "Printed function tables"],
        instructions: [
          "Set up different stations around the classroom, each with a specific function.",
          "At each station, students calculate left-hand limit, right-hand limit, and overall limit.",
          "Students graph the functions on graph paper and visually confirm calculations.",
          "After completing all stations, students share their findings."
        ]
      },
      assessment: {
        questions: [
          "What is the left-hand limit of the piecewise function {1 if x≤0, 2 if x>0} at x=0?",
          "Calculate lim(x→2) (x²-4)/(x-2).",
          "Explain why lim(x→0) |x| = 0."
        ],
        answer_key: [
          "1",
          "4",
          "Because as x approaches 0 from either side, the value of |x| approaches 0."
        ]
      }
    },
    {
      period_number: 4,
      script: {
        introduction: "Good morning! Today, we are diving into derivatives. Let's think about how we measure change in our daily lives — when you drive a car, you look at the speedometer. Similarly, derivatives measure how a function changes.",
        main_body: [
          "We define the derivative at a point as: f'(a) = lim(h→0) [f(a+h)-f(a)]/h.",
          "For f(x) = 3x, f'(2) = lim(h→0) [3(2+h)-3(2)]/h = 3.",
          "For f(x) = 2x²+3x-5, f'(-1) = -1, meaning the function decreases at that rate.",
          "Derivatives have practical applications: in physics, they determine instantaneous velocity."
        ],
        conclusion: "Derivatives are fundamental in calculus, allowing us to measure how a function changes at any given point."
      },
      activity: {
        title: "Derivative Exploration",
        duration_minutes: 15,
        materials_needed: [],
        instructions: [
          "Divide the class into small groups of 3-4 students.",
          "Each group receives a different function: f(x)=x², f(x)=5x-3, f(x)=sin(x).",
          "Groups use the limit definition to find the derivative at x=1.",
          "Each group presents their derivative and discusses what it means."
        ]
      },
      assessment: {
        questions: [
          "What is the definition of a derivative?",
          "How do you find the derivative of f(x)=4x³ at x=2?",
          "Explain the significance of the derivative in real-world applications."
        ],
        answer_key: [
          "The derivative is defined as the limit of the average rate of change as the interval approaches zero.",
          "Apply the limit definition: f'(2) = lim(h→0) [f(2+h)-f(2)]/h = 48.",
          "The derivative represents instantaneous rate of change, applicable in physics and economics."
        ]
      }
    },
    {
      period_number: 5,
      script: {
        introduction: "Today, we will focus on calculating derivatives using the first principle. The derivative represents the rate of change. Who can tell me the derivative of a constant? Yes — it's zero!",
        main_body: [
          "Theorem: for f(x) = aₙxⁿ + … + a₀, the derivative is df/dx = naₙxⁿ⁻¹ + …",
          "Example: derivative of f(x) = 6x¹⁰⁰ - x⁵⁵ + x is 600x⁹⁹ - 55x⁵⁴ + 1.",
          "For trigonometric functions, derivative of sin(x) is cos(x).",
          "Derivative of tan(x) is sec²(x), derived via the limit definition."
        ],
        conclusion: "Today we learned to calculate derivatives of polynomial and trigonometric functions using the first principle and established rules."
      },
      activity: {
        title: "Derivative Relay Race",
        duration_minutes: 15,
        materials_needed: [],
        instructions: [
          "Divide the class into groups of 4-5 students.",
          "Provide each group a set of polynomial and trigonometric functions to differentiate.",
          "Set a timer for 10 minutes to find all derivatives.",
          "Each group presents one derivative with step-by-step explanation."
        ]
      },
      assessment: {
        questions: [
          "What is the derivative of f(x) = 3x⁴ + 2x² - 5?",
          "Using the first principle, find the derivative of f(x) = sin(x) at x = π/4.",
          "What is the derivative of f(x) = x³ - 4x + 7?"
        ],
        answer_key: [
          "12x³ + 4x",
          "√2/2",
          "3x² - 4"
        ]
      }
    },
    {
      period_number: 6,
      script: {
        introduction: "Today, we explore how derivatives apply to real-world problems — specifically instantaneous and average velocity. If a body is dropped from a tall cliff, how can we determine its speed at any moment?",
        main_body: [
          "The distance formula for a falling body: s = 4.9t².",
          "Average velocity between t=0 and t=2: v = (19.6-0)/(2-0) = 9.8 m/s.",
          "Average velocity between t=1 and t=2: v = (19.6-4.9)/(2-1) = 14.7 m/s.",
          "As intervals shrink, average velocity approaches the instantaneous velocity — the derivative."
        ],
        conclusion: "We learned how to apply derivatives to find instantaneous velocity from distance-time data — a fundamental concept in calculus."
      },
      activity: {
        title: "Velocity Investigation",
        duration_minutes: 15,
        materials_needed: [],
        instructions: [
          "Divide the class into groups of 3-4 students.",
          "Provide time intervals and distances based on s = 4.9t².",
          "Each group calculates average velocity for various intervals approaching t=2.",
          "Groups present findings and discuss how values converge to instantaneous velocity."
        ]
      },
      assessment: {
        questions: [
          "What is the formula for calculating average velocity?",
          "How does the average velocity change as time intervals get smaller?",
          "What does the derivative represent in the context of motion?"
        ],
        answer_key: [
          "Average velocity = (s(t₂) - s(t₁)) / (t₂ - t₁)",
          "The average velocity approaches a limit — the instantaneous velocity.",
          "The derivative represents the instantaneous rate of change of distance with respect to time."
        ]
      }
    }
  ]
};

/**
 * Simulates the streaming/polling behavior for demo mode.
 * Resolves with the full mock data, stage-by-stage, with delays.
 */
export const DEMO_STAGES = [
  { stage: 'Parsing Document',         delay: 800,  partial: {} },
  { stage: 'Generating Metadata',      delay: 1200, partial: d => ({ metadata: d.metadata }) },
  { stage: 'Building Knowledge Base',  delay: 1500, partial: d => ({ metadata: d.metadata, knowledge_base: d.knowledge_base }) },
  { stage: 'Generating Teaching Plan', delay: 1200, partial: d => ({ metadata: d.metadata, knowledge_base: d.knowledge_base, teaching_plan: d.teaching_plan }) },
  { stage: 'Analyzing Learning Gaps',  delay: 1000, partial: d => ({ metadata: d.metadata, knowledge_base: d.knowledge_base, teaching_plan: d.teaching_plan, learning_gaps: d.learning_gaps }) },
  { stage: 'Writing Period Scripts',   delay: 2000, partial: d => ({ ...d, period_contents: d.period_contents.slice(0, 3) }) },
  { stage: 'Completed',                delay: 1000, partial: d => d },
];
