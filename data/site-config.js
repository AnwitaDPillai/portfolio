/**
 * SITE CONFIGURATION
 * Global identity, About copy, contact information,
 * external links, quote, and Substack configuration.
 */

const siteConfig = {
    identity: {
        name: "Anwita D Pillai",
        location: "Kerala, India",
        title: "Writer · Historian · Building Public Scholarship",
        shortTitle: "Writer · Historian · Public Scholarship",
        description:
            "Anwita D Pillai — Writer, historian, and independent researcher building public scholarship across history, technology, science, and policy."
    },

    contact: {
        email: "anwitadpillai007@gmail.com",
        phone: "+91 9846194894"
    },

    links: {
        website: "https://anwitadpillai.github.io/portfolio/",
        linkedin: "https://www.linkedin.com/in/anwita-d-pillai/",
        github: "https://github.com/anwitadpillai",
        substack: "https://anwitadpillai.substack.com/"
    },

    about: {
        label: "ABOUT",

        paragraphs: [
            "I’m the kind of person who reads footnotes for fun and holds grudges on behalf of dead people.",

            "I got into archives because I was nosy about the wrong things. That curiosity turned into a book-length project, a pile of competition certificates, and bylines that still feel like a prank someone played on my life. I’m currently building a Substack because I believe rigorous history should be as readable as a good grudge, and finishing a monograph because I started it and I’m stubborn."
        ],

        poetry:
            "I also write poetry, which is just history with the citations removed.",

        cta: {
            label: "Read the Substack",
            url: "https://anwitadpillai.substack.com/"
        }
    },

    contactSection: {
        heading: "Get In Touch",

        body:
            "My inbox is a no-judgment zone (unless you use Comic Sans).",

        secondaryText: "You can also find me on GitHub and LinkedIn.",

        buttonLabel: "Say Hello!",
        email: "anwitadpillai007@gmail.com",

        links: [
            {
                label: "GitHub",
                url: "https://github.com/anwitadpillai"
            },
            {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/anwita-d-pillai/"
            }
        ]
    },

    quote: {
        text: "I am out with lanterns, looking for myself.",
        author: "Emily Dickinson"
    },

    substack: {
        feedUrl: "https://anwitadpillai.substack.com/feed",
        siteUrl: "https://anwitadpillai.substack.com/",
        displayCount: 5,

        loadingText: "Loading recent essays...",
        errorText: "Unable to load recent essays.",

        rssProxy:
            "https://api.rss2json.com/v1/api.json?rss_url="
    },

    footer: {
        text: "Set in digital ink. Powered by raw code."
    },

    metadata: {
        keywords: [
            "Anwita D Pillai",
            "Anwita Pillai",
            "Historian",
            "South Asia History",
            "Substack",
            "Independent Researcher",
            "Writer",
            "Public Scholarship",
            "AI Policy",
            "Climate Policy",
            "Stanford",
            "New York Times",
            "John Locke",
            "Foyle Young Poets",
            "Gold as Grammar",
            "DOTE",
            "Jargonaut"
        ]
    }
};