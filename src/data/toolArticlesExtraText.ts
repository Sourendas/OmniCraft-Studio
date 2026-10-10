import type { ToolArticleExtra } from './toolArticlesExtra';

export const EXTRA_TEXT: Record<string, ToolArticleExtra> = {
  'resume-builder': {
    sections: [
      {
        heading: 'What the form covers',
        paragraphs: [
          "The form has Contact (name, job title, email, phone, location, LinkedIn, GitHub, website), Summary, Experience, Education, and Skills & certifications. Each role takes a job title, company, location, start and end dates, a Current role tick box, and as many bullets as you add. Add role puts a new role at the top, which keeps the most recent job first. Empty fields are left out of the PDF.",
          "The page opens with a sample person so you can see every section filled. Replace all of it. The resume PDF checklist guide explains how to search the download for leftover sample text before you send it.",
        ],
      },
      {
        heading: 'Layouts and the PDF',
        paragraphs: [
          "The template picker offers twelve layouts in three groups: Traditional (Classic, Ivy, Elegant), Contemporary (Modern Teal, Teal Banner, Executive, Slate), and Layout (Sidebar, Timeline, Swiss, Editorial, Compact). The live preview follows the one you choose. Download PDF builds the file with jsPDF using Helvetica or Times, so the text is real and selectable, which is what applicant tracking systems need. The file is named after you and the template, for example Priya_Sharma_classic.pdf.",
          "Keyword overlap compares a fixed list of common technical terms in a job description you paste with the words in your resume. It is a local check, not an employer's system. The Rewrite button puts an action verb at the front of a bullet that does not start with one. Read the result, because a verb cannot add facts you did not write.",
        ],
      },
    ],
    limits: [
      "Your draft is saved in this browser's local storage on this device so it survives a refresh. On a shared computer, clear the site data when you finish.",
      "FileTools Kit does not send this resume to employers and does not keep a copy on a server.",
      "The PDF uses built-in Latin fonts. Names or text in non-Latin scripts will not display correctly.",
    ],
    tips: [
      "Freshers can list internships, college projects, and volunteer work as roles in Experience. Name them honestly, for example Project: Attendance app.",
      "Keep one page if you have less than about five years of experience.",
      "Try Compact if your content spills onto a second page by a few lines.",
    ],
    faq: [
      { q: "Will the PDF pass an ATS?", a: "No tool can promise that. The PDF has real text in a single reading order, which most systems parse well. What matters more is clear headings, standard job titles, and honest content that matches the posting." },
      { q: "Can I add a photo?", a: "No. Many employers, especially in the US and UK, ask applicants not to include photos. If a posting requires one, use a different tool." },
    ],
    guides: [
      { slug: 'ats-friendly-resume-for-freshers', label: 'Resume format for freshers: an ATS-friendly PDF' },
      { slug: 'resume-pdf-checklist', label: 'Resume PDF checklist before you send' },
      { slug: 'build-resume-pdf', label: 'Build a resume PDF in your browser' },
    ],
  },
  'dev-tools': {
    sections: [
      {
        heading: 'The five tabs',
        paragraphs: [
          "JSON / CSV formats or minifies JSON, converts an array of flat objects to CSV, and converts simple CSV back to JSON. Format JSON and Minify JSON check the syntax first and show the parser's error message if the JSON is broken. SQL line-breaks starts a new line before common keywords such as SELECT, FROM, WHERE, and JOIN so a long one-line query is easier to read. It is not a full SQL formatter and does not check syntax.",
          "RegEx Live Tester runs a JavaScript regular expression with the flags you type against your test text and lists every match with its position and capture groups. Base64 encodes and decodes UTF-8 text, so accented letters, Hindi, and emoji round-trip correctly. Hash Generator computes SHA-1, SHA-256, SHA-384, and SHA-512 with the browser's Web Crypto.",
        ],
      },
      {
        heading: 'When to reach for each tab',
        paragraphs: [
          "Format JSON when an API response arrives as one long line and you need to read it. Minify JSON before storing it somewhere that counts characters. Use JSON to CSV when someone wants to open data in a spreadsheet, and CSV to JSON when a script expects JSON. Use the regex tester to check a pattern against real samples before it goes into code. Use Base64 when a system asks for text in that encoding, and a SHA-256 hash when you need to compare two pieces of text without showing them.",
        ],
      },
      {
        heading: 'Limits of the CSV converter',
        paragraphs: [
          "CSV to JSON splits each line on commas. Quoted fields that contain commas or line breaks will be split in the wrong place, and every value comes out as text. That is fine for simple exports. For a complex spreadsheet, export JSON from the source program instead.",
        ],
      },
    ],
    tips: [
      "Use Minify JSON before pasting a payload into a URL or a config field with a length limit.",
      "Regex patterns follow JavaScript syntax. Lookbehind and named groups work in current browsers.",
      "To compare two hashes, paste both into Text Diff rather than reading 64 characters by eye.",
    ],
    faq: [
      { q: "Does anything I paste leave the browser?", a: "No. Every tab runs in this page. Still, avoid pasting live passwords or API keys on a shared screen." },
      { q: "Why is there no MD5?", a: "Web Crypto does not provide MD5, and MD5 should not be used for security. SHA-256 is the usual choice for checksums." },
    ],
    guides: [
      { slug: 'json-formatting-explained', label: 'JSON formatting explained' },
      { slug: 'csv-to-json', label: 'Convert CSV to JSON and back' },
      { slug: 'base64-explained', label: 'Base64 explained' },
      { slug: 'hash-text-sha256', label: 'Hash text with SHA-256' },
    ],
  },
  'markdown-editor': {
    sections: [
      {
        heading: 'What the preview renders',
        paragraphs: [
          "The preview handles the Markdown most notes use: headings with #, ##, and ###; bold, italic, and strikethrough; bullet lists with a dash; numbered lines; task lists with - [ ] and - [x]; block quotes with >; horizontal rules with ---; inline code and fenced code blocks; simple pipe tables; and links in the form [text](https://example.com). It is a lightweight parser, not a complete CommonMark or GitHub engine, so nested lists and some edge cases look different from GitHub.",
          "The toolbar inserts syntax around the selected text: headings, bold, italic, strikethrough, lists, task boxes, quotes, code blocks, and links. Split View, Editor Only, and Preview Only change the layout. The counters show words, characters, lines, and an estimated reading time at 200 words per minute.",
        ],
      },
      {
        heading: 'A short example',
        paragraphs: [
          "Type a line starting with ## Release notes, a blank line, then three lines starting with a dash. The preview shows a heading and a bullet list. Add **fixed** inside a bullet to make one word bold, and a line such as [Changelog](https://example.com/changelog) to add a link. Tables need a header row, a separator row of dashes, and then the data rows, each with cells separated by pipes. If something does not look right, compare it with the Markdown basics guide, which lists the exact syntax this preview understands.",
        ],
      },
      {
        heading: 'Getting your work out',
        paragraphs: [
          "Download .md saves the raw Markdown. Copy Markdown copies the source, and Copy HTML copies the rendered HTML for pasting into a site builder or email tool. The text is kept in this tab only. Closing or refreshing the tab clears it, so download or copy before you leave.",
        ],
      },
    ],
    tips: [
      "Leave a blank line between paragraphs and before a list. Most Markdown engines need it.",
      "Put a space after # in headings. #Heading is plain text in most renderers.",
      "Use fenced code blocks with three backticks for anything with special characters.",
    ],
    faq: [
      { q: "Will my Markdown look the same on GitHub?", a: "Mostly. The basics match. GitHub supports extras such as nested lists, footnotes, and automatic links that this preview does not render." },
      { q: "Can I open an existing .md file?", a: "Paste its contents into the editor. There is no file-open button." },
    ],
    guides: [{ slug: 'markdown-basics', label: 'Markdown basics: headings, lists, links, and tables' }],
  },
  'text-diff': {
    sections: [
      {
        heading: 'How the comparison works',
        paragraphs: [
          "Paste the older version into Original Text (Before) and the newer one into Modified Text (After). The comparison is line by line: a line that changed at all shows as one removed line and one added line. Side-by-Side View lists every line in order in one column, with removed lines shaded red and marked with a minus and added lines shaded green and marked with a plus. Unified Git Patch shows the same changes in the standard patch format that git and code review tools read.",
          "Ignore Whitespace treats lines that differ only in spacing as the same. Ignore Case treats upper and lower case as the same. The text on screen keeps its original case and spacing either way. The counters show added, removed, and unchanged lines, plus how the word and character counts changed.",
        ],
      },
      {
        heading: 'Reading the result',
        paragraphs: [
          "A line that was edited appears as a red removal directly followed by a green addition, so read the pair together to see the change. Unchanged lines give context. If almost every line shows as changed, the two texts probably use different line endings or one was re-wrapped; turn on Ignore Whitespace, or paste both through a plain text editor first.",
        ],
      },
      {
        heading: 'Good uses',
        paragraphs: [
          "Check what a colleague changed in a policy draft before you sign off. Compare two versions of a config file before deploying. Confirm that a long hash or key you were sent matches the one you expected by pasting both. Swap Panes reverses old and new if you pasted them the wrong way round.",
        ],
      },
    ],
    tips: [
      "For prose, put each sentence on its own line before comparing. A one-line paragraph shows as a single changed line.",
      "Copy Unified Patch or Download .patch to share exactly what changed.",
      "The patch is built from the raw text, so it includes whitespace and case changes even when the ignore options are on.",
    ],
    faq: [
      { q: "Does it highlight changed words inside a line?", a: "No. Changes are shown per line. Split long paragraphs into sentences to narrow down where an edit is." },
      { q: "Can I compare Word or PDF files?", a: "Paste their text. To get text out of a DOCX, use File Converter to export TXT first." },
    ],
    guides: [{ slug: 'compare-two-text-versions', label: 'Compare two versions of a text' }],
  },
  'health-calc': {
    sections: [
      {
        heading: 'What the numbers mean',
        paragraphs: [
          "BMR (basal metabolic rate) is the estimated energy your body uses at rest, calculated with the Mifflin-St Jeor equation from weight, height, age, and sex. Maintenance TDEE multiplies BMR by the activity factor you pick, from 1.2 for Sedentary to 1.9 for Extremely Active. Target Daily Intake subtracts 500 kcal for Fat Loss or adds 350 kcal for Muscle Gain. The macro split turns that target into grams of protein, carbohydrate, and fat for the ratio you choose.",
          "The BMI card divides weight in kilograms by height in metres squared and shows the WHO adult band. Indian guidelines use lower cut-offs for overweight and obesity, which the card also states. Export estimate PDF saves the inputs and results as a one-page summary.",
        ],
      },
      {
        heading: 'How much to trust it',
        paragraphs: [
          "Mifflin-St Jeor is one of the better population equations, but an individual can differ from it by a few hundred calories a day. Activity levels are self-reported and most people overestimate them. Treat the result as a starting point, track your weight for two or three weeks, and adjust. For medical conditions, pregnancy, or eating disorders, speak to a doctor or registered dietitian first.",
        ],
      },
    ],
    tips: [
      "If you are unsure between two activity levels, pick the lower one.",
      "Protein targets are often easier to judge in grams per kilogram of body weight. Ask a professional what suits you.",
      "Switch between Metric and Imperial at the top of the inputs. The results update instantly.",
    ],
    faq: [
      { q: "Is my health data stored?", a: "No. The numbers stay in this tab. Nothing is sent to FileTools Kit." },
      { q: "Why does BMI not match how I look?", a: "BMI cannot tell muscle from fat. Athletes can read as overweight and some people with little muscle read as healthy. The BMI guide explains the limits." },
    ],
    guides: [{ slug: 'bmi-what-it-means', label: 'BMI explained, and what it does not tell you' }],
  },
  'currency-crypto': {
    sections: [
      {
        heading: 'What this worksheet is for',
        paragraphs: [
          "This page multiplies an amount by an exchange rate from a fixed table bundled with the page. It covers ten currencies, including the US dollar, euro, pound, yen, rupee, and dirham, and ten crypto assets. The table is not updated from a live feed, so the rates are examples and can be far from today's market. Use the page to understand how conversion arithmetic and fees work, not to price a real transfer.",
          "The fee cards below the converter are hypothetical examples of how a percentage fee, a fixed fee, and a worse exchange rate reduce what the recipient gets. They are not quotes from any provider, and the speeds shown are not promises.",
        ],
      },
      {
        heading: 'A worked example',
        paragraphs: [
          "Say you send 1,000 US dollars to India. If the live mid-market rate is R rupees per dollar, a perfect transfer would deliver 1,000 times R. Suppose the provider charges a 5 dollar fee and uses a rate 1 percent below mid-market. Then 995 dollars are converted at 0.99 times R, so the recipient gets about 985 times R. The total cost is roughly 1.5 percent of the amount, even though the advertised fee was only 5 dollars. Type the numbers into this worksheet with your own rate to see the same effect.",
        ],
      },
      {
        heading: 'Checking a real quote',
        paragraphs: [
          "Before you send money, look up the current mid-market rate from a live source, then ask your bank or transfer service for the exact amount the recipient will receive. Divide that amount by what you pay in total to get your effective rate, and compare it with the mid-market rate. The gap is the true cost, whatever the fee is called.",
        ],
      },
    ],
    tips: [
      "Swap the currencies with the swap button to see the reverse rate.",
      "A zero-fee transfer can still be expensive if the exchange rate is marked up.",
      "Crypto prices move quickly. The crypto rows are for practising the arithmetic only.",
    ],
    faq: [
      { q: "Why do the rates differ from Google?", a: "They are static examples, not live rates. Always check a live source before acting." },
      { q: "Is this financial advice?", a: "No. It is a calculator with example numbers." },
    ],
    guides: [{ slug: 'currency-conversion-basics', label: 'Currency conversion basics: rates, spreads, and fees' }],
  },
};
