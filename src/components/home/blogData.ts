export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  seoDescription: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  image: string;
  author: string;
  content: BlogContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "vibe-coding-with-claude-code-pros-and-cons",
    title: "Vibe Coding with Claude Code: Pros and Cons",
    excerpt:
      "AI agents like Claude Code can turn a sentence into working software in minutes. Here's an honest look at where that speed helps a studio like ours, and where it can quietly hurt you.",
    seoDescription:
      "An honest breakdown of vibe coding with Claude Code: the real pros and cons of building software by describing it in natural language and letting an AI agent write the code.",
    category: "AI & Development",
    date: "Jun 20, 2026",
    readTime: "7 min read",
    color: "#5B4FCF",
    image: "/vibe-coding-with-claude-code-ai-agent-development.webp",
    author: "Emberloft Studio",
    content: [
      {
        type: "paragraph",
        text: "\"Vibe coding\" is the term that stuck for a simple idea: describe what you want in plain English, and let an AI agent like Claude Code write, run, and fix the code for you. We've spent real client hours working this way over the past few months, and the results are mixed enough to be worth writing down honestly, not as hype, not as fear, just what we've actually seen.",
      },
      {
        type: "heading",
        text: "The pros",
      },
      {
        type: "paragraph",
        text: "Speed of prototyping is the obvious win. Ideas that used to take a day of boilerplate now reach a working state in minutes. That compresses the distance between \"what if we tried\" and an actual clickable prototype, which changes how often we're willing to try something.",
      },
      {
        type: "list",
        items: [
          "Faster prototyping: from idea to working build in minutes, not hours or days",
          "Lower barrier to entry: domain experts and non-engineers can translate knowledge directly into working tools",
          "Less boilerplate drudgery: repetitive scaffolding, config, and glue code get handled automatically",
          "Faster debugging loops: an agent that can read its own error output closes the loop without context-switching to docs and forums",
          "Easier exploration: cheap to throw an approach away and try three more before committing to one",
        ],
      },
      {
        type: "heading",
        text: "The cons",
      },
      {
        type: "paragraph",
        text: "The same speed that makes vibe coding exciting is what makes it risky unsupervised. Code that works on the first try isn't the same as code that's correct, secure, or maintainable six months later. If nobody on the team understands what was generated, the project has a hidden single point of failure.",
      },
      {
        type: "list",
        items: [
          "Shallow understanding: it's easy to ship code nobody on the team can actually explain or debug later",
          "Inconsistent quality: output quality varies with how well the prompt captures constraints the agent can't infer",
          "Security blind spots: generated code can pass tests while still containing real vulnerabilities if nobody reviews it line by line",
          "Architectural drift: without a human steering long-term structure, a codebase can become a pile of locally-correct, globally-messy decisions",
          "Over-reliance risk: teams that skip the fundamentals can struggle the moment they need to work without the agent",
        ],
      },
      {
        type: "heading",
        text: "Where we land",
      },
      {
        type: "paragraph",
        text: "We treat Claude Code the way we'd treat a very fast junior pair: brilliant for getting a first draft on the screen, dangerous if it ships unsupervised. The studio rule that works for us is simple: vibe coding gets you to a draft, a senior engineer decides what's production-worthy. That keeps the speed without inheriting the risk.",
      },
      {
        type: "paragraph",
        text: "If you're weighing whether to bring AI-assisted development into your own team's workflow, the honest answer is: it depends on whether you have the senior judgment in the room to catch what the agent gets wrong. Speed without review is just risk wearing a faster hat.",
      },
    ],
  },
  {
    slug: "design-brief-before-code-ai-development",
    title: "Why We Still Write a Design Brief Before Writing Any Code",
    excerpt:
      "AI agents made implementation nearly free. That moved the real bottleneck upstream, to whether anyone actually agreed on what to build. Here's the brief format that keeps fast execution from becoming fast rework.",
    seoDescription:
      "Why a written design brief still matters in 2026, even with AI coding agents. What to include in a software design brief and how it prevents scope creep and rework.",
    category: "Process & Strategy",
    date: "Jun 23, 2026",
    readTime: "6 min read",
    color: "#EEBA0B",
    image: "/design-brief-before-code-keyboard-typing.webp",
    author: "Emberloft Studio",
    content: [
      {
        type: "paragraph",
        text: "A year ago, the slow part of a project was implementation. You'd agree on roughly what to build, then spend days or weeks turning that rough agreement into working software, and a lot of ambiguity got quietly resolved along the way by whoever was typing. AI agents changed that math. Implementation is now closer to free. Which means the slow part moved somewhere else: to whether anyone actually agreed on what to build in the first place.",
      },
      {
        type: "heading",
        text: "What changed when code got cheap",
      },
      {
        type: "paragraph",
        text: "When writing code took real time, ambiguity in a request had room to get sorted out mid-build. A developer would hit a fuzzy requirement, make a reasonable call, and move on. That informal clarification process is gone when an agent generates a full feature in minutes. There's no slow middle stretch where misunderstandings naturally surface and get fixed. Instead, a vague brief turns into a fully built, fully wrong feature before anyone notices the mismatch.",
      },
      {
        type: "paragraph",
        text: "That's the actual argument for a design brief in 2026. It's not process for its own sake. It's the only checkpoint left before speed turns a misunderstanding into shipped, reviewed, demoed work that has to be unwound.",
      },
      {
        type: "heading",
        text: "What a good brief actually contains",
      },
      {
        type: "list",
        items: [
          "A one-sentence problem statement: what's broken or missing right now, in the user's words, not the solution's",
          "Success criteria: the specific, checkable condition that means the work is done, not 'looks good'",
          "Constraints: tech stack, deadline, budget, brand rules, anything that rules out an otherwise valid approach",
          "Explicit out-of-scope items: the things people will assume are included unless you say otherwise",
          "Content and copy needs: real text and real data, not placeholder lorem ipsum that hides layout problems",
          "Who approves what: one named decision-maker per area, so feedback doesn't arrive as five conflicting opinions",
        ],
      },
      {
        type: "heading",
        text: "What happens without one",
      },
      {
        type: "paragraph",
        text: "Skip the brief and the cost doesn't disappear, it just moves to the end of the project where it's far more expensive to pay. We've seen the same three failure modes repeat across AI-assisted work specifically:",
      },
      {
        type: "list",
        items: [
          "Polished features built against the wrong assumption, because the prompt was clear but the underlying intent never was",
          "Scope drift, where each prompt quietly adds a little more than what was agreed, and nobody notices until the project is twice its original size",
          "Review fatigue, where stakeholders are handed a finished-looking build so fast that they rubber-stamp it instead of actually checking it against the goal",
        ],
      },
      {
        type: "heading",
        text: "Our rule",
      },
      {
        type: "paragraph",
        text: "Every engagement at Emberloft starts with a one-page brief before a single prompt gets written, AI-assisted or not. It takes an hour to write and it's the cheapest hour in the entire project. The agent can build fast once we know what we're building. Speed is only an advantage if it's pointed in the right direction.",
      },
    ],
  },
  {
    slug: "real-cost-of-quick-client-revisions",
    title: "The Real Cost of a \"Quick\" Client Revision",
    excerpt:
      "\"Just move this button\" sounds like a five-minute fix. In practice it can touch your design system, your copy, your breakpoints, and your QA pass. Here's why small requests aren't small, and how we scope them before they snowball.",
    seoDescription:
      "Why small client revision requests in web design and development cost more than they look like, and how a clear revision scoping process prevents scope creep.",
    category: "Client Work",
    date: "Jun 26, 2026",
    readTime: "6 min read",
    color: "#FB4B54",
    image: "/quick-client-revision-cost-developer-workspace.webp",
    author: "Emberloft Studio",
    content: [
      {
        type: "paragraph",
        text: "Every studio has heard some version of: \"can you just move this button over\" or \"can we just make the header a bit bigger.\" It sounds small because it's described in five words. The actual work behind those five words is rarely five minutes, and the gap between how a request sounds and what it touches is where most project budgets quietly bleed out.",
      },
      {
        type: "heading",
        text: "Why \"just move this\" is never just one thing",
      },
      {
        type: "paragraph",
        text: "A button isn't an isolated element. It's part of a spacing system, a responsive layout that has to hold up across five breakpoints, an interaction state that changes on hover and focus, and often a pattern repeated on a dozen other pages. Move it on one screen and you've either created an inconsistency or you've signed up to update every other instance of that pattern across the site.",
      },
      {
        type: "heading",
        text: "Where the hidden cost actually hides",
      },
      {
        type: "list",
        items: [
          "Design system ripple: one component tweak often needs to be reflected everywhere that component appears, not just the page someone was looking at",
          "Copy and translation: text length changes shift layout in ways a single language preview won't catch, especially across multiple locales",
          "Responsive breakpoints: a change that looks fine on desktop can break tablet or mobile spacing in ways nobody tests until launch",
          "QA regression: any visual change needs to be re-checked across browsers and devices, not just eyeballed once on the screen it was requested on",
          "Deployment overhead: even a tiny change still goes through a build, a review, and a release, the same pipeline as a much bigger feature",
        ],
      },
      {
        type: "heading",
        text: "How we scope revisions now",
      },
      {
        type: "list",
        items: [
          "Revision rounds are defined upfront in the proposal, so both sides know how many passes are included before anything is billed extra",
          "Every request gets bucketed as either cosmetic (contained to one element) or structural (touches the system), before any work starts",
          "We send a short written summary of what a request will actually touch before starting it, so \"quick\" surprises get caught in a sentence instead of an invoice",
        ],
      },
      {
        type: "heading",
        text: "What this means for clients",
      },
      {
        type: "paragraph",
        text: "None of this is about saying no to small requests. It's about being honest, before the work starts, about what \"small\" actually means in a connected design system. Clients who know the real shape of a request make better calls about which changes are worth making now and which can wait for the next batch. That honesty is what keeps a project's scope, and its budget, where everyone agreed it would be.",
      },
    ],
  },
];
