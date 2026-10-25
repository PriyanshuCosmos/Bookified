import { splitIntoSegments } from './utils';
import { curatedWorldBooks } from './constants';

export interface SeedBookData {
    title: string;
    author: string;
    slug: string;
    coverURL: string;
    category: string;
    persona: string;
    fullContent: string;
}

export const curatedBooksDetailedContent: Record<string, string> = {
    'atomic-habits': `
# Atomic Habits by James Clear

## Core Thesis
Small, incremental changes of just 1 percent every day compound into remarkable results over time. Habits are the compound interest of self-improvement. You do not rise to the level of your goals; you fall to the level of your systems.

## The Fundamentals: Why Tiny Changes Make a Big Difference
- The 1% Rule: Improving by 1% every day for a year makes you 37 times better. Conversely, declining by 1% brings you down to nearly zero.
- The Plateau of Latent Potential: Breakthrough moments are often the result of many previous actions that build up the potential required to unleash a major change. Work is not wasted; it is simply stored.
- Identity-Based Habits: The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become. True behavior change is identity change.

## The Four Laws of Behavior Change

### The 1st Law: Make It Obvious (Cue)
- Implementation Intentions: Formulate a specific plan beforehand: "I will [BEHAVIOR] at [TIME] in [LOCATION]."
- Habit Stacking: Pair a new habit with a current habit: "After [CURRENT HABIT], I will [NEW HABIT]."
- Environment Design: Make the cues of good habits obvious and visible. Redesign your spaces so that triggers for positive behaviors are in plain sight, while removing triggers for bad habits.

### The 2nd Law: Make It Attractive (Craving)
- Temptation Bundling: Pair an action you want to do with an action you need to do.
- Social Norms: Join a culture where your desired behavior is the normal behavior. We imitate the habits of three groups: the close (family and friends), the many (the tribe), and the powerful (those with status).

### The 3rd Law: Make It Easy (Response)
- Reduce Friction: Decrease the number of steps between you and your good habits. Increase friction for bad habits.
- The 2-Minute Rule: When you start a new habit, it should take less than two minutes to do. Scale down the habit to an easy gateway behavior (e.g., "read one page" instead of "read a chapter").
- Prime the Environment: Prepare your space ahead of time to make future actions easier.

### The 4th Law: Make It Satisfying (Reward)
- Immediate vs. Delayed Rewards: What is immediately rewarded is repeated. What is immediately punished is avoided. The costs of your good habits are in the present; the costs of your bad habits are in the future.
- Habit Tracking: Keep a visual habit tracker and remember the rule: "Never miss twice." Missing once is an accident; missing twice is the start of a new, bad habit.

## Key Takeaways and Quotes
- "You do not rise to the level of your goals. You fall to the level of your systems."
- "Every action you take is a vote for the person you wish to become."
- "Focus on who you want to be, not what you want to achieve."
`,

    'the-psychology-of-money': `
# The Psychology of Money by Morgan Housel

## Core Thesis
Doing well with money has a little to do with how smart you are and a lot to do with how you behave. Financial success is not a hard science; it is a soft skill where your personal psychology and relationship with risk matter more than formulas.

## Key Insights and Principles

### 1. No One is Crazy
Everyone has different formative experiences with money based on when and where they grew up. An investor who lived through high inflation perceives risk completely differently from someone who grew up during a boom market.

### 2. Luck & Risk
Luck and risk are siblings. They are both the reality that every outcome in life is guided by forces other than individual effort. Be humble when things go well and compassionate when they fail.

### 3. Never Enough
The hardest financial skill is getting the goalpost to stop moving. Comparing yourself to others creates an insatiable appetite that leads people to risk what they have and need for what they don't have and don't need.

### 4. Compounding and Time
Warren Buffett's greatest skill is time. Over 99% of his wealth was accumulated after his 50th birthday. Compounding works wonders when you allow investments to sit uninterrupted for decades.

### 5. Getting Wealthy vs. Staying Wealthy
Getting wealthy requires taking risks, being optimistic, and putting yourself out there. Staying wealthy requires the opposite: humility, paranoia, and the realization that what you made can be lost quickly. Survival is the ultimate financial strategy.

### 6. Room for Error (Margin of Safety)
The most important part of every plan is planning on your plan not going according to plan. Having cash reserves and conservative debt keeps you from being forced to sell during downturns.

### 7. Freedom and Autonomy
The highest form of wealth is the ability to wake up every morning and say, "I can do whatever I want today." Controlling your time is the highest dividend money pays.

## Key Quotes
- "Spending money to show people how much money you have is the fastest way to have less money."
- "Wealth is what you don't see: the cars not purchased, the diamonds not bought, the first-class upgrades declined."
`,

    'clean-code': `
# Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin

## Core Thesis
Even bad code can function, but if code isn't clean, it can bring a development organization to its knees. Writing clean code requires craftsmanship, discipline, and constant refactoring. Clean code reads like well-written prose.

## Core Rules and Principles

### 1. Meaningful Names
- Intention-Revealing: Names should answer why it exists, what it does, and how it is used.
- Pronounceable and Searchable: Avoid single-letter variables except for brief loop counters.
- Consistency: Pick one word for one abstract concept across the codebase (e.g., fetch vs. get vs. retrieve).

### 2. Functions Should Do One Thing
- Single Responsibility: Functions should do one thing, they should do it well, and they should do it only.
- Small Size: Functions should rarely exceed 20 lines of code.
- Minimal Arguments: The ideal number of arguments is zero (niladic). Next is one (monadic), followed by two (dyadic). Avoid three or more arguments whenever possible.
- No Side Effects: A function must not make unexpected changes to state or global variables.

### 3. Comments: Explain Why, Not What
- Good code is mostly self-documenting. Clear naming and clean structure eliminate the need for explanatory comments.
- Use comments to explain non-obvious business intent, legal notices, or warning of consequences, not to apologize for bad code.

### 4. Formatting & Structure
- The Newspaper Metaphor: A source file should read like a newspaper article—headline at top, high-level summary next, and granular implementation details at the bottom.
- Vertical Density: Lines that are closely related conceptually should be positioned vertically close to each other.

### 5. Error Handling
- Use exceptions rather than return codes.
- Do not pass or return null. Returning empty collections or Null Objects eliminates NullPointerExceptions.

### 6. The Boy Scout Rule
"Always leave the campground cleaner than you found it." With every commit, improve the codebase slightly by renaming a variable, breaking up a large function, or removing duplicate logic.

## Key Quotes
- "Clean code always looks like it was written by someone who cares."
- "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
`,

    'deep-work': `
# Deep Work: Rules for Focused Success in a Distracted World by Cal Newport

## Core Thesis
The ability to perform deep work—concentrating without distraction on a cognitively demanding task—is becoming increasingly rare at the exact same time it is becoming increasingly valuable in our economy. Those who cultivate this skill will thrive.

## The Two Core Abilities for Thriving in the New Economy
1. The ability to quickly master hard, complex things.
2. The ability to produce at an elite level, in terms of both quality and speed.
High-Quality Work Produced = (Time Spent) x (Intensity of Focus).

## The Four Rules of Deep Work

### Rule 1: Work Deeply
Choose a deep work scheduling philosophy:
- Monastic Philosophy: Eliminate shallow obligations completely.
- Bimodal Philosophy: Divide time into distinct deep intervals and shallow intervals (e.g., specific days or months).
- Rhythmic Philosophy: Establish a consistent daily habit at the same time each day (e.g., 90 minutes every morning).
- Journalistic Philosophy: Fit deep work into your schedule whenever you have free time (requires high discipline).
Ritualize the process: define where you will work, for how long, and how you will support your energy.

### Rule 2: Embrace Boredom
The ability to concentrate deeply is a skill that must be trained. If every time you feel bored you reach for your smartphone, your brain becomes wired for distraction. Practice resisting instant gratification and schedule intentional internet-free blocks.

### Rule 3: Quit Social Media
Apply the Law of the Vital Few (the 80/20 rule) to your network tools. Only use a tool if its positive impacts on your core life goals substantially outweigh its negative distractions. Don't adopt a platform merely because it offers "some benefit."

### Rule 4: Drain the Shallows
Treat shallow work (emails, bureaucratic meetings, administrative tasks) with suspicion. Schedule every minute of your day using time blocking, establish sender filters for email, and implement a strict shutdown ritual at the end of the workday.

## Key Quotes
- "If you don't produce, you won't thrive—no matter how skilled or talented you are."
- "Clarity about what matters provides clarity about what does not."
`,

    '1984': `
# 1984 by George Orwell

## Core Themes & Synopsis
Set in the superstate of Oceania, a society ruled by the totalitarian Party and its supreme leader, Big Brother. The protagonist, Winston Smith, works at the Ministry of Truth where he rewrites history to align with Party propaganda. He secretly rebels against the regime by keeping a diary, falling in love with Julia, and seeking truth.

## Key Concepts and Worldbuilding
- Big Brother: The omnipresent figurehead representing the surveillance and authority of the Party.
- Newspeak: The official language designed to diminish the range of human thought. If a concept cannot be named, it cannot be thought or enacted in rebellion.
- Doublethink: The power of holding two contradictory beliefs in one's mind simultaneously, and accepting both of them (e.g., "War is Peace", "Freedom is Slavery", "Ignorance is Strength").
- Thoughtcrime: Holding beliefs or desires contrary to Party ideology. Monitored relentlessly by the Thought Police and Telescreens.
- The Ministry of Truth (Minitrue): Handles propaganda and rewrites history.
- The Ministry of Peace (Minipax): Waxes eternal, perpetual war.
- The Ministry of Love (Miniluv): Enforces law, order, surveillance, and torture.
- The Ministry of Plenty (Miniplenty): Oversees economic shortages and rationing.

## Winston's Rebellion and Downfall
- Winston's inner awakening begins with writing in his forbidden diary: "Freedom is the freedom to say that two plus two make four."
- Winston and Julia rent a room above Mr. Charrington's antique shop to carry out their secret love affair away from telescreens.
- O'Brien, an Inner Party official whom Winston suspects is part of the secret resistance Brotherhood, traps Winston and Julia.
- In Room 101 inside the Ministry of Love, Winston faces his ultimate phobia: rats strapped to his face. To escape torture, he breaks and betrays Julia, crying: "Do it to Julia! Not me!"
- Broken in spirit, Winston ends the novel having lost his individuality, sitting in the Chestnut Tree Café: "He loved Big Brother."

## Enduring Relevance
1984 remains an urgent warning against authoritarianism, censorship, political euphemism, historical revisionism, and technological surveillance.
`,

    'rich-dad-poor-dad': `
# Rich Dad Poor Dad by Robert Kiyosaki

## Core Thesis
Financial literacy is the foundation of wealth. The wealthy do not work for money; they have their money work for them. Assets put money into your pocket, while liabilities take money out of your pocket.

## Lessons from the Two Dads
- The Poor Dad (his biological father): Highly educated, hard-working PhD who believed in steady jobs, academic credentials, and security, yet struggled financially all his life.
- The Rich Dad (his best friend's father): An eighth-grade dropout who understood business systems, cash flow, investments, and financial freedom.

## The 6 Core Lessons

### Lesson 1: The Rich Don't Work for Money
The middle class and poor work for money driven by fear (fear of not having money) and greed (desire for consumer goods). The rich use their minds to build income-producing assets that generate passive income.

### Lesson 2: Why Teach Financial Literacy?
It is not about how much money you make; it is about how much you keep.
- Asset: Something that puts money in your pocket (rental property, stocks, bonds, intellectual property).
- Liability: Something that takes money out of your pocket (mortgages, luxury car loans, credit card balances). Your primary residence is often treated as an asset, but is really a liability because it takes money out for taxes, interest, and upkeep.

### Lesson 3: Mind Your Own Business
Keep your daytime job, but start building an asset column on the side. Invest in businesses that do not require your presence, stocks, mutual funds, income-producing real estate, and notes.

### Lesson 4: The History of Taxes and the Power of Corporations
The rich understand tax codes. Corporations allow businesses to earn, spend everything they can on business expenses, and only pay tax on what is left over. Employees, by contrast, earn, get taxed first, and spend what is left.

### Lesson 5: The Rich Invent Money
Financial intelligence consists of four skills: accounting, investing, understanding markets, and the law. Great opportunities are seen with your mind, not your eyes.

### Lesson 6: Work to Learn—Don't Work for Money
Seek jobs for what you will learn rather than what you will earn. Develop skills in sales, marketing, communication, and management.

## Key Quotes
- "The poor and the middle class work for money. The rich have money work for them."
- "Intelligence solves problems and produces money. Money without financial intelligence is money soon gone."
`,

    'thinking-fast-and-slow': `
# Thinking, Fast and Slow by Daniel Kahneman

## Core Thesis
Human judgment and decision-making are governed by two distinct cognitive systems. Understanding the cognitive biases, heuristics, and quirks of both systems is essential for making rational choices in business, finance, and everyday life.

## System 1 and System 2

### System 1 (Fast, Intuitive, Automatic)
Operates automatically and quickly, with little or no effort and no sense of voluntary control. Examples: recognizing facial expressions, driving on an empty road, reacting to sudden sounds. System 1 is prone to cognitive shortcuts (heuristics) and systemic biases.

### System 2 (Slow, Deliberate, Effortful)
Allocates attention to the effortful mental operations that demand it, including complex computations and logical reasoning. Examples: solving 17 x 24, parking in a narrow space, checking the validity of a complex argument. System 2 is lazy and prefers to endorse System 1's intuitions unless prompted to verify.

## Major Heuristics and Biases

### 1. Anchoring Effect
People's estimates stay close to an initial number presented to them, even if that number is completely arbitrary or irrelevant.

### 2. Availability Heuristic
We assess the frequency or probability of an event by the ease with which examples come to mind. Dramatic, publicized events (plane crashes) are judged far more likely than common ones (diabetes).

### 3. Loss Aversion & Prospect Theory
Humans feel the pain of a loss roughly twice as intensely as the pleasure of an equivalent gain. This asymmetry causes people to make irrational decisions to avoid realizing losses.

### 4. Overconfidence & The Illusion of Validity
People construct coherent narratives out of past events and believe the future is predictable. We overestimate our understanding of the world and underestimate the role of chance.

### 5. Sunk Cost Fallacy
Continuing to invest time or capital into a failing endeavor simply because of resources already committed, rather than evaluating future payoff.

## Practical Advice
When making high-stakes decisions, slow down, engage System 2, seek independent statistical data (the base rate), and solicit alternative perspectives to counter your initial intuitions.
`,

    'the-pragmatic-programmer': `
# The Pragmatic Programmer by David Thomas and Andrew Hunt

## Core Thesis
Pragmatic programmers combine personal responsibility, continuous learning, adaptable design, and relentless automation to deliver high-quality software that satisfies real human needs.

## Fundamental Philosophies

### 1. Care About Your Craft
There is no point in developing software unless you care about doing it well. Think about what you are doing while you are doing it.

### 2. Provide Options, Don't Make Excuses
Take ownership of your work. When an unexpected obstacle or bug arises, do not blame the compiler, the OS, or a colleague. Instead, analyze the situation and present realistic alternatives and solutions.

### 3. Software Entropy (The Broken Window Theory)
Do not leave "broken windows" (bad designs, wrong decisions, poor code) unrepaired. Fix each one as soon as it is discovered. Neglect accelerates rot.

### 4. Good Enough Software
Realize that software is never finished, only released. Strive for high quality while recognizing that perfection is an illusion that prevents timely delivery.

### 5. DRY: Don't Repeat Yourself
Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. Duplication leads to maintenance nightmares.

### 6. Orthogonality & Decoupling
Design components that are self-contained and have clean, single-purpose interfaces. Changes in one module should not have ripple effects in unrelated modules.

### 7. Tracer Bullets & Prototyping
When exploring unknown architectural territory, write a thin, end-to-end slice through all layers of your system. Tracer bullets test how components fit together in real time and give immediate user feedback.

### 8. Automate Everything
Manual procedures are error-prone. Automate builds, testing, deployment, and linting. Let computers do the repetitive tasks so developers can focus on creative problem solving.
`,

    'the-power-of-habit': `
# The Power of Habit by Charles Duhigg

## Core Thesis
Habits are not destiny. By understanding the three-part neurological loop that governs every habit, individuals, organizations, and communities can rebuild their routines to achieve extraordinary transformation.

## The Habit Loop
Every habit consists of three sequential components:
1. The Cue: A trigger that tells your brain to go into automatic mode and which habit to use.
2. The Routine: The physical, mental, or emotional behavior itself.
3. The Reward: A positive payoff that helps your brain figure out if this particular loop is worth remembering for the future.

## The Golden Rule of Habit Change
You cannot extinguish a bad habit; you can only change it.
To change a habit:
- Keep the same Cue.
- Keep the same Reward.
- Insert a new Routine in the middle.
For example, if you eat snacks at 3 PM out of boredom or a desire for socializing, substitute the snacking routine with a 5-minute walk to chat with a colleague.

## Keystone Habits
Some habits matter more than others. Keystone habits cause a chain reaction, disrupting and reordering other behaviors throughout your life.
- Examples: Regular exercise, daily food journaling, making your bed each morning. When someone begins exercising, they naturally start eating better, sleeping better, and experiencing reduced stress.

## Organizational Habits and Social Movements
- Alcoa and Paul O'Neill: By focusing exclusively on worker safety as a keystone habit, Alcoa transformed internal communication, streamlined manufacturing, and became one of the top-performing companies on Wall Street.
- Social Movements: Habits of friendship, peer pressure, and shared identity drive viral social revolutions (such as the Montgomery Bus Boycott).
`,

    'how-to-win-friends-and-influence-people': `
# How to Win Friends and Influence People by Dale Carnegie

## Core Thesis
Success in business and personal life is 85% due to skill in human engineering—personality and the ability to lead people—and only 15% to technical knowledge. Dealing with people is the greatest challenge you face.

## Part 1: Fundamental Techniques in Handling People
1. Don't criticize, condemn, or complain. Criticism puts people on the defensive and wounds their pride.
2. Give honest and sincere appreciation. The deepest urge in human nature is "the desire to be important."
3. Arouse in the other person an eager want. Talk about what they want and show them how to get it.

## Part 2: Six Ways to Make People Like You
1. Become genuinely interested in other people.
2. Smile. An authentic smile says: "I like you. You make me happy. I am glad to see you."
3. Remember that a person's name is to that person the sweetest and most important sound in any language.
4. Be a good listener. Encourage others to talk about themselves.
5. Talk in terms of the other person's interests.
6. Make the other person feel important—and do it sincerely.

## Part 3: How to Win People to Your Way of Thinking
- The only way to get the best of an argument is to avoid it.
- Show respect for the other person's opinions. Never say, "You're wrong."
- If you are wrong, admit it quickly and emphatically.
- Begin in a friendly way.
- Get the other person saying "Yes, yes" immediately.
- Let the other person do a great deal of the talking.
- Let the other person feel that the idea is his or hers.
- Try honestly to see things from the other person's point of view.
- Be sympathetic with the other person's ideas and desires.
- Appeal to the nobler motives.

## Part 4: Be a Leader: How to Change People Without Giving Offense
- Begin with praise and honest appreciation.
- Call attention to people's mistakes indirectly.
- Talk about your own mistakes before criticizing the other person.
- Ask questions instead of giving direct orders.
- Let the other person save face.
- Praise the slightest improvement and praise every improvement.
`,

    'brave-new-world': `
# Brave New World by Aldous Huxley

## Core Themes & Synopsis
Set in a future World State in the year 632 AF (After Ford), where society is engineered through reproductive technology, psychological conditioning, genetic stratification, and forced consumerism. Citizens are pacified through the pleasure drug soma and state-mandated promiscuity, having surrendered art, science, family, and religion in exchange for artificial stability.

## Society & The Caste System
- Human reproduction is industrialized through the Bokanovsky Process.
- Fetuses are chemically treated and conditioned into five rigid castes:
  - Alphas: Intellectual and ruling elite.
  - Betas: Technicians, managers, and administrators.
  - Gammas: Semi-skilled laborers.
  - Deltas: Low-skilled manual workers.
  - Epsilons: Genetically stunted laborers performing repetitive menial tasks.
- Hypnopaedia (sleep-learning) conditions citizens from infancy with state aphorisms like "Ending is better than mending" and "Everyone belongs to everyone else."

## John the Savage vs. World Controller Mustapha Mond
- John, born naturally to a civilized woman (Linda) on a New Mexico Savage Reservation, grows up reading Shakespeare and valuing love, suffering, and virtue.
- When brought to civilized London, John is horrified by the emptiness, superficiality, and mechanical hedonism of the World State.
- In their famous climax debate, Mustapha Mond argues that true happiness requires eliminating emotional extremes, poetry, religion, and grief.
- John demands "the right to be unhappy, the right to grow old and ugly and impotent, the right to have syphilis and cancer, the right to have too little to eat, the right to be in constant apprehension of what may happen tomorrow."
- Unable to reconcile with this soul-destroying utopia, John retreats to a secluded lighthouse, where relentless public voyeurism ultimately drives him to suicide.
`,

    'the-courage-to-be-disliked': `
# The Courage to Be Disliked by Ichiro Kishimi & Fumitake Koga

## Core Thesis
Based on the psychological theories of Alfred Adler, this book argues through a Socratic dialogue that unhappiness is not a predetermined fate imposed by trauma, but a choice. True freedom and happiness come from the courage to live authentically, separate tasks, and accept that some people will dislike you.

## Five Key Pillars of Adlerian Psychology

### 1. Teleology over Etiology (Causes vs. Purpose)
We are not determined by past traumas; rather, we assign meaning to past events to suit our current purposes. If someone claims they cannot leave the house because of childhood trauma, Adler argues they create anxiety in order to achieve the goal of staying safely inside.

### 2. All Problems are Interpersonal Relationship Problems
Loneliness, self-doubt, and feelings of inferiority arise exclusively from comparing yourself to other people and worrying about how others perceive you. If you were the only human on the planet, all social friction would vanish.

### 3. Separation of Tasks
Whose task is this? You are responsible only for your own choices, values, and actions. How other people react to you, judge you, or feel about you is their task, not yours. Attempting to intrude on others' tasks or letting others intrude on yours is the source of all relationship misery.

### 4. Community Feeling (Horizontal vs. Vertical Relationships)
Do not treat relationships as vertical hierarchies where you either praise or scold. Treat everyone as equal human partners (horizontal relationships). Seek to contribute to the community without expecting praise or validation.

### 5. The Courage to Be Disliked
If you want to live freely and authentically according to your own principles, you must be willing to accept that not everyone will approve of you. Being disliked by some is the price of true freedom.
`,

    'javascript-the-definitive-guide': `
# JavaScript: The Definitive Guide by David Flanagan

## Core Overview
The comprehensive reference to the core JavaScript language and client-side web APIs. Covers execution context, asynchronous event loop, functional programming, prototypal inheritance, and modern ES6+ paradigms.

## Core Language Topics
- Types, Values, and Variables: Primitive types (strings, numbers, booleans, symbols, BigInt, null, undefined) vs. Objects and references.
- Expressions and Operators: Equality (=== vs ==), optional chaining (?.), nullish coalescing (??), destructuring.
- Functions and Scope: Lexical scoping, closures, arrow functions vs. function declarations, 'this' binding.
- Prototypal Inheritance: Classes, prototype chains, Object.create, inheritance mechanics under the hood.
- Asynchronous Programming: Event loop, Call stack, Microtask queue, Callbacks, Promises, async/await syntax, and Promise combinators (all, race, allSettled, any).

## Client-Side Web APIs
- The Document Object Model (DOM): Querying, manipulating elements, event bubbling, delegation, and performance optimization.
- Networking & Fetch API: HTTP requests, handling JSON, streaming responses, and error handling.
- Web Storage & Security: LocalStorage, SessionStorage, Cookies, Cross-Site Scripting (XSS), and Cross-Origin Resource Sharing (CORS).
`,

    'sapiens-a-brief-history-of-humankind': `
# Sapiens: A Brief History of Humankind by Yuval Noah Harari

## Core Thesis
Homo sapiens conquered the planet not because of superior physical strength, but because of a unique ability to believe in and cooperate around shared fictions—myths, religions, nations, and money.

## The Three Great Revolutions

### 1. The Cognitive Revolution (70,000 Years Ago)
Sapiens evolved the capacity for complex language and imagination. Unlike other animals that can only communicate concrete facts ("watch out, a lion!"), humans can transmit information about things that do not physically exist ("the river god protects our tribe"). This allowed large numbers of strangers to cooperate smoothly under common beliefs.

### 2. The Agricultural Revolution (12,000 Years Ago)
"History's biggest fraud." Farming produced more food, but led to worse nutrition, longer working hours, disease, social inequality, and vulnerability to crop failure. Wheat domesticated humans rather than humans domesticating wheat.

### 3. The Scientific Revolution (500 Years Ago)
Humans admitted their ignorance ("we do not know") and embraced empirical observation, mathematics, and technological innovation. Coupled with European imperialism and capitalism, science accelerated human power exponentially.

## Key Concepts
- Shared Intersubjective Reality: Money, human rights, laws, and corporations do not exist in the physical universe; they exist only because millions of people collectively believe in them.
- Money is the Greatest Mutual Trust System: It is the only fiction that bridges any cultural, religious, or political divide.
`,

    'zero-to-one': `
# Zero to One by Peter Thiel

## Core Thesis
Every time someone creates something completely new, humanity goes from 0 to 1. Progress takes two forms: horizontal (copying things that work, going from 1 to n) and vertical (creating new breakthroughs, going from 0 to 1). True entrepreneurs build monopolies that create new value.

## Key Contrarian Principles
- What important truth do very few people agree with you on?
- Competition is for Losers: In perfect competition, all profits are competed away. Creative monopolists invent a unique category and generate sustainable profits to invest in the future.
- The 4 Characteristics of a Monopoly:
  1. Proprietary Technology (at least 10x better than the closest substitute).
  2. Network Effects (the product becomes more valuable as more people use it).
  3. Economies of Scale (fixed costs spread over vast volume).
  4. Branding.
- Start Small and Monopolize: Target a small, concentrated niche market where you can dominate quickly before scaling outward (e.g., PayPal targeting eBay power sellers; Facebook targeting Harvard students).
- Distribution Matters as Much as Product: Superior sales and distribution can win even with an ordinary product, but an extraordinary product with poor distribution will fail.
`,

    'the-alchemist': `
# The Alchemist by Paulo Coelho

## Core Themes & Synopsis
The journey of Santiago, an Andalusian shepherd boy who dreams of finding a treasure buried at the Egyptian Pyramids. Along his pilgrimage through Spain and the Sahara desert, he encounters the King of Salem (Melchizedek), a crystal merchant, an Englishman, the desert woman Fatima, and an Alchemist who teaches him to read the omens of the universe.

## Core Lessons & Allegories
- Personal Legend: What you have always wanted to accomplish. When you truly want something, all the universe conspires in helping you to achieve it.
- The Soul of the World: All things are interconnected. By listening to your heart and being attuned to nature, you can communicate in the universal language.
- The Fear of Suffering: "Tell your heart that the fear of suffering is worse than the suffering itself. And that no heart has ever suffered when it goes in search of its dreams."
- The Ultimate Discovery: Santiago reaches the Pyramids only to learn from a bandit that the treasure was buried back home in Andalusia beneath the sycamore tree at the ruined church where his journey started. The journey itself transformed him into the man capable of understanding the treasure.
`,

    'meditations': `
# Meditations by Marcus Aurelius

## Core Thesis
Personal journal entries written by Roman Emperor Marcus Aurelius during military campaigns. It serves as an intimate guide to Stoic philosophy: enduring adversity, accepting mortality, controlling one's thoughts, and fulfilling one's duty to human society.

## Core Stoic Principles
- The Dichotomy of Control: Some things are within our control (our thoughts, opinions, impulses, desires), while others are not (our body, reputation, wealth, external events). Focus exclusively on what is within your control and accept the rest with serenity (Amor Fati).
- Master Your Mind: "You have power over your mind—not outside events. Realize this, and you will find strength."
- Perception Determines Reality: If you are pained by any external thing, it is not this thing that tears you down, but your own judgment about it. And it is in your power to wipe out this judgment now.
- Memento Mori (Remember You Must Die): Live every day as if it were your last, not in reckless hedonism, but in noble integrity, generosity, and purposeful action.
`,

    'cant-hurt-me': `
# Can't Hurt Me by David Goggins

## Core Thesis
Most people only tap into 40% of their actual capabilities. Through intentional self-discipline, mental callousness, and embracing pain, anyone can overcome trauma, demolish self-imposed limitations, and achieve greatness.

## Key Principles & Frameworks
- The 40% Rule: When your mind tells you that you are completely exhausted and ready to quit, you have only reached 40% of your true potential.
- The Accountability Mirror: Facing your unvarnished truth in the mirror every day. Be ruthlessly honest about your flaws and set tangible daily goals to rectify them.
- Callousing Your Mind: Just as physical friction creates calluses on your hands to protect against pain, mental friction (doing things you hate every day) callouses your mind against adversity and doubt.
- Taking Souls: Outworking your competition and exceeding expectations so completely that your relentless work ethic demoralizes obstacles and inspires those around you.
- The Cookie Jar: Remembering your past triumphs, hardships survived, and obstacles conquered when you hit a wall, using past grit as mental fuel to push forward.
`,

    'mans-search-for-meaning': `
# Man's Search for Meaning by Viktor E. Frankl

## Core Thesis
Those who have a 'why' to live, can bear with almost any 'how'. Even in the grimmest depths of suffering in concentration camps, human beings retain the ultimate freedom: the ability to choose one's attitude in any given set of circumstances.

## Core Insights from Logotherapy
- The Ultimate Human Freedom: Everything can be taken from a man but one thing: the last of human freedoms—to choose one's attitude in any given set of circumstances, to choose one's own way.
- Three Sources of Meaning:
  1. By creating a work or doing a deed.
  2. By experiencing something or encountering someone (love, nature, art).
  3. By the attitude we take toward unavoidable suffering.
- Suffering Ceases to be Suffering the moment it finds a meaning, such as the meaning of a sacrifice.
- Despair is suffering without meaning.
`,

    'to-kill-a-mockingbird': `
# To Kill a Mockingbird by Harper Lee

## Core Themes & Synopsis
Set in the fictional town of Maycomb, Alabama, during the Great Depression. Narrated by young Scout Finch, whose father, lawyer Atticus Finch, is appointed to defend Tom Robinson, a Black man falsely accused of raping a white woman, Mayella Ewell.

## Major Characters & Themes
- Atticus Finch: The moral compass of the story, who teaches his children empathy: "You never really understand a person until you consider things from his point of view—until you climb into his skin and walk around in it."
- The Mockingbird Symbol: Mockingbirds don't do one thing but make music for us to enjoy. They don't eat up people's gardens or nest in corncribs. That's why it is a sin to kill a mockingbird. Both Tom Robinson and Boo Radley represent metaphorical mockingbirds—innocent beings harmed by prejudice and malice.
- Moral Courage: Atticus explains: "Real courage is when you know you're licked before you begin, but you begin anyway and you see it through no matter what."
`,
};

export function getCuratedBookContent(slug: string): string {
    return curatedBooksDetailedContent[slug] || `
# ${slug}

## Overview
Comprehensive companion guide and chapter breakdown. Discusses main themes, key characters, historical context, and philosophical reflections.

## Key Takeaways
- Foundational insights and analysis.
- Critical themes for discussion and debate.
`;
}
