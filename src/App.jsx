import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

/* ==== EDIT THESE TWO LINES WHEN READY ==== */
const CA = "COMING SOON";        // paste your contract address here
const TWITTER_URL = "";          // paste your twitter/X link here later

/* ============================================================
   FART HOOD OS v3.0 — ASCII CRT TERMINAL
   Grouped clickable buttons, achievements, fake hacking,
   self-destruct, 8-ball, dice, coin flip, weather, fortune,
   rank system, guessing game, matrix rain.
   ============================================================ */

const ROBIN = String.raw`
                          __
                     ,   /  \_
                    /|  / /\  \   }}
                   / | /_/  \  \ }}}}
                  /  |     .----' }}
                 |   |    .------.
                 |   |    | o  o |
                 |   |    |  ..  |
                 |   |  .-'------'-.
    <=====+======#===##(   .--.    )
                 |   |  \  |  |   /
                 |   |   \ |  |  /
                  \  |   / '--'  \ 
                   \ |  |  |  |   |
                    \|  |--====--|
                     '  |  |  |  |
                        |  |  |  |
                        |  '--'  |
                       /|   ||   |\ 
                      | |   ||   | |
                      '-'  _||_  '-'
                          (_||_)
                         (__)(__)
`;

const BANNER = String.raw`
███████╗ █████╗ ██████╗ ████████╗    ██╗  ██╗ ██████╗  ██████╗ ██████╗
██╔════╝██╔══██╗██╔══██╗╚══██╔══╝    ██║  ██║██╔═══██╗██╔═══██╗██╔══██╗
█████╗  ███████║██████╔╝   ██║       ███████║██║   ██║██║   ██║██║  ██║
██╔══╝  ██╔══██║██╔══██╗   ██║       ██╔══██║██║   ██║██║   ██║██║  ██║
██║     ██║  ██║██║  ██║   ██║       ██║  ██║╚██████╔╝╚██████╔╝██████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝`;

const FART_ART = String.raw`
        (   )  (   )
      (   ) (  ) (  )
        ) _(  )( _(
      .-'      '-.
     /  BRAAAAAP  \
     \____________/
          |  |
        released.`;

const COW = String.raw`
 _____________________
< he who smelt it... >
 ---------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||`;

const TROPHY = String.raw`
     ___________
    '._==_==_=_.'
    .-\:      /-.
   | (|:.     |) |
    '-|:.     |-'
      \::.    /
       '::. .'
         ) (
       _.' '._
      '-------'`;

const DICE_FACES = [
  String.raw` -------
|       |
|   o   |
|       |
 -------`,
  String.raw` -------
| o     |
|       |
|     o |
 -------`,
  String.raw` -------
| o     |
|   o   |
|     o |
 -------`,
  String.raw` -------
| o   o |
|       |
| o   o |
 -------`,
  String.raw` -------
| o   o |
|   o   |
| o   o |
 -------`,
  String.raw` -------
| o o o |
|       |
| o o o |
 -------`,
];

const BOOT_LINES = [
  { text: "FARTHOOD BIOS v4.20 — initializing…", d: 300 },
  { text: "MEM CHECK ............... 640K OK (ought to be enough)", d: 400 },
  { text: "GAS SENSOR .............. CALIBRATED", d: 320 },
  { text: "WHOOPEE DRIVER .......... LOADED", d: 320 },
  { text: "MOUNTING /dev/cushion ... OK", d: 360 },
  { text: "RANK SYSTEM ............. ONLINE", d: 320 },
  { text: "ACHIEVEMENT ENGINE ...... ONLINE", d: 320 },
  { text: "MATRIX MODULE ........... STANDBY", d: 320 },
  { text: "SELF-DESTRUCT ........... ARMED (probably fine)", d: 360 },
  { text: "AIR QUALITY ............. QUESTIONABLE", d: 360 },
  { text: "", d: 200 },
  { text: "boot complete. welcome to FARTHOOD OS v3.0.", d: 300 },
];

const FART_QUOTES = [
  "a silent one escapes into the room. nobody is safe.",
  "windows rattle. car alarms trigger three blocks away.",
  "the dog looks at you accusingly. blame accepted.",
  "brief. dignified. devastating.",
  "somewhere, a smoke detector considers its options.",
  "richter scale reports a 4.20. epicenter: you.",
  "the curtains sway. there is no wind outside.",
  "houseplants lean away in unison.",
];

const JOKES = [
  "why don't farts graduate? they always get expelled.",
  "what's invisible and smells like beans? exactly.",
  "i told a fart joke in an elevator. it was wrong on so many levels.",
  "farts are like children. proud of yours, horrified by everyone else's.",
  "what do you call a dinosaur fart? a blast from the past.",
  "why did the fart cross the road? it was following the chicken. closely.",
];

const FORTUNES = [
  "a great gust approaches. brace the furniture.",
  "trust your gut. it has never been quieter, or more honest.",
  "an open window will change your life this week.",
  "beware the burrito. it knows what it did.",
  "your patience will be rewarded. your air freshener will not.",
  "he who hesitates near the elevator... chose wisely.",
];

const EIGHTBALL = [
  "it is certain.", "outlook gassy.", "signs point to yes.",
  "ask again after lunch.", "my sources say no.", "absolutely not.",
  "the wind wills it.", "concentrate and ask again.", "without a doubt.",
  "don't count on it.",
];

const WEATHERS = [
  "current: 21°C · wind: OUTGOING · humidity: regrettable · visibility: fine, smell: not",
  "current: 18°C · gusts up to 60dB · chance of aftershock: 80%",
  "current: 24°C · high pressure system detected (it's you) · air advisory in effect",
  "current: 19°C · calm before the storm · beans front moving in from the south",
];

const TIPS = [
  "press ARROW UP to replay your last command like a true operator.",
  "rank up faster: the [FART] button has no cooldown. none.",
  "type `matrix` and watch the rain match the hood color.",
  "the `guess` game average is 7 tries. beat it for bragging rights.",
  "`cat blame_the_dog.sh` — know your exit strategy.",
];

const RANKS = [
  { min: 0,  name: "APPRENTICE OF THE WIND" },
  { min: 3,  name: "CERTIFIED RIPPER" },
  { min: 7,  name: "SILENT ASSASSIN" },
  { min: 15, name: "THUNDER LORD" },
  { min: 30, name: "GRAND DUKE OF GAS" },
];

const AIR = [
  { min: 0,  label: "QUESTIONABLE", warn: false },
  { min: 5,  label: "POOR",         warn: false },
  { min: 12, label: "HAZARDOUS",    warn: true },
  { min: 25, label: "EVACUATE",     warn: true },
];

const ACHIEVEMENTS = {
  FIRST_WIND:  "FIRST WIND — release your first fart",
  CERTIFIED:   "CERTIFIED — reach rank Certified Ripper",
  WIND_GOD:    "WIND GOD — reach the maximum rank",
  LUCKY:       "LUCKY — win the guessing game",
  NEO:         "NEO — enter the matrix",
  HACKERMAN:   "HACKERMAN — breach the mainframe",
  SURVIVOR:    "SURVIVOR — live through a self-destruct",
  EXPLORER:    "EXPLORER — use 10 different commands",
  GAMBLER:     "GAMBLER — roll the dice or flip the coin",
  ORACLE:      "ORACLE — consult the 8-ball",
};

const FILES = [
  "beans.txt", "chili_recipe.md", "evidence/", "blame_the_dog.sh",
  "silent_but_deadly.wav", "README.gas", "lore.dat", "roadmap.plan",
  "tips.txt", "credits.log",
];

const HELP = [
  ["-- INFO --", ""],
  ["about",              "what is fart hood?"],
  ["lore",               "the legend of the hood"],
  ["faq",                "frequently aired questions"],
  ["roadmap",            "what's coming to the hood"],
  ["tips",               "one random pro tip"],
  ["credits",            "who built this thing"],
  ["ca",                 "show the contract address"],
  ["twitter",            "the bird app"],
  ["-- FUN --", ""],
  ["fart",               "release one (+1 to your rank)"],
  ["guess",              "number guessing mini-game"],
  ["8ball <question>",   "ask the magic 8-ball"],
  ["dice",               "roll an ascii die"],
  ["flip",               "flip a coin"],
  ["joke",               "one random gas-powered joke"],
  ["fortune",            "your fortune, freshly baked"],
  ["weather",            "hood weather report"],
  ["cowsay",             "wisdom from the pasture"],
  ["robin",              "summon the hooded one"],
  ["hack",               "breach the mainframe"],
  ["selfdestruct",       "do NOT press. (press it)"],
  ["matrix",             "toggle the rain"],
  ["-- SYSTEM --", ""],
  ["stats",              "fart count, rank & uptime"],
  ["achievements",       "your unlocked badges"],
  ["ls / cat <file>",    "poke around the filesystem"],
  ["banner",             "reprint the big ascii logo"],
  ["whoami / date",      "identity & time check"],
  ["echo <text>",        "repeat after me"],
  ["history",            "your recent commands"],
  ["sudo <anything>",    "try it and see"],
  ["clear",              "wipe the screen"],
];

const BUTTON_GROUPS = [
  { label: "INFO", cmds: ["about", "lore", "faq", "roadmap", "tips", "credits", "ca", "twitter", "help"] },
  { label: "FUN",  cmds: ["fart", "guess", "8ball will i rank up", "dice", "flip", "joke", "fortune", "weather", "cowsay", "robin", "hack", "matrix"] },
  { label: "SYS",  cmds: ["stats", "achievements", "ls", "banner", "whoami", "history"] },
];

let LINE_ID = 0;
const L = (text, cls = "") => ({ id: ++LINE_ID, text, cls });

const rankFor = (n) => [...RANKS].reverse().find((r) => n >= r.min);
const airFor  = (n) => [...AIR].reverse().find((a) => n >= a.min);
const pick    = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------- matrix rain overlay ---------- */
function MatrixRain({ color }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "アイウエオカキクケコ01FARTHOOD$#@%&";
    const size = 16;
    const cols = Math.ceil(canvas.width / size);
    const drops = Array(cols).fill(1);
    let last = 0;

    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 50) return;
      last = t;
      ctx.fillStyle = "rgba(3, 6, 4, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${size}px monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return <canvas ref={ref} className="matrix-canvas" aria-hidden="true" />;
}

/* ============================================================ */

export default function App() {
  const [lines, setLines] = useState([]);
  const [booted, setBooted] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [theme, setTheme] = useState("green");
  const [farts, setFarts] = useState(0);
  const [matrixOn, setMatrixOn] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [unlocked, setUnlocked] = useState({});
  const [copied, setCopied] = useState(false);

  const game = useRef({ active: false, target: 0, tries: 0 });
  const busy = useRef(false);              // blocks input during hack/selfdestruct
  const usedCmds = useRef(new Set());
  const screenRef = useRef(null);
  const inputRef = useRef(null);

  const push = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  /* ---------- achievements ---------- */
  const unlock = useCallback((key, out = null) => {
    setUnlocked((prev) => {
      if (prev[key]) return prev;
      const msg = [L(""), L(`*** ACHIEVEMENT UNLOCKED: ${ACHIEVEMENTS[key]} ***`, "gold"), L("")];
      if (out) out.push(...msg);
      else push(msg);
      return { ...prev, [key]: true };
    });
  }, [push]);

  /* ---------- boot sequence ---------- */
  useEffect(() => {
    let cancelled = false;
    let delay = 400;
    BOOT_LINES.forEach((b) => {
      delay += b.d;
      setTimeout(() => { if (!cancelled) push([L(b.text, "sys")]); }, delay);
    });
    setTimeout(() => {
      if (cancelled) return;
      push([
        L(BANNER, "banner-line"),
        L(""),
        L("the terminal that follows through.", "dim"),
        L(""),
        L("type `help` — or just click the buttons below.", "bright"),
        L(""),
      ]);
      setBooted(true);
    }, delay + 500);
    return () => { cancelled = true; };
  }, [push]);

  /* ---------- uptime clock ---------- */
  useEffect(() => {
    const iv = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  /* ---------- pin scroll to bottom ---------- */
  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const fmtUptime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  /* ---------- timed sequences ---------- */
  const playSequence = (steps, done) => {
    busy.current = true;
    let delay = 0;
    steps.forEach((step) => {
      delay += step.d;
      setTimeout(() => push([L(step.text, step.cls || "sys")]), delay);
    });
    setTimeout(() => {
      busy.current = false;
      if (done) done();
    }, delay + 150);
  };

  const runHack = () => {
    playSequence([
      { text: "initializing breach toolkit…", d: 250 },
      { text: "scanning ports .. 21 .. 42 .. 80 .. 420 [OPEN]", d: 550 },
      { text: "injecting payload: beans.exe", d: 550 },
      { text: "[####------] 40%", d: 450 },
      { text: "[#######---] 70%", d: 450 },
      { text: "[##########] 100%", d: 450 },
      { text: "bypassing firewall… (it fled voluntarily)", d: 550 },
      { text: "ACCESS GRANTED. you are now inside the mainframe.", d: 550, cls: "bright" },
      { text: "there is nothing in here except a fan. running at full speed.", d: 600, cls: "dim" },
      { text: "", d: 100 },
    ], () => unlock("HACKERMAN"));
  };

  const runSelfDestruct = () => {
    setShaking(true);
    playSequence([
      { text: "SELF-DESTRUCT SEQUENCE INITIATED.", d: 300, cls: "err" },
      { text: "T-MINUS 5…", d: 800, cls: "err" },
      { text: "T-MINUS 4…", d: 800, cls: "err" },
      { text: "T-MINUS 3…", d: 800, cls: "err" },
      { text: "T-MINUS 2…", d: 800, cls: "err" },
      { text: "T-MINUS 1…", d: 800, cls: "err" },
      { text: "…", d: 900 },
      { text: "detonation failed: OUT OF GAS.", d: 500, cls: "bright" },
      { text: "try again after using `fart` a few more times. or don't.", d: 400, cls: "dim" },
      { text: "", d: 100 },
    ], () => {
      setShaking(false);
      unlock("SURVIVOR");
    });
  };

  /* ---------- fart + rank ---------- */
  const doFart = (out) => {
    const next = farts + 1;
    const before = rankFor(farts).name;
    const after = rankFor(next).name;
    setFarts(next);
    out.push(L(FART_ART, "banner-line"), L(""), L(pick(FART_QUOTES), "dim"));
    out.push(L(`fart count: ${next}`, "dim"), L(""));
    unlock("FIRST_WIND", out);
    if (after !== before) {
      out.push(L(TROPHY, "banner-line"), L(""), L(`*** RANK UP: ${after} ***`, "gold"), L(""));
      if (next >= 3) unlock("CERTIFIED", out);
      if (after === RANKS[RANKS.length - 1].name) unlock("WIND_GOD", out);
    }
  };

  /* ---------- command handling ---------- */
  const run = (raw) => {
    const cmdLine = raw.trim();
    if (busy.current) return;
    push([L(`> ${cmdLine}`, "echo")]);
    if (!cmdLine) return;

    /* guessing game intercepts input */
    if (game.current.active) {
      const g = game.current;
      const out = [];
      if (cmdLine.toLowerCase() === "quit") {
        g.active = false;
        out.push(L(`you gave up. the number was ${g.target}. shameful.`, "err"), L(""));
      } else {
        const n = parseInt(cmdLine, 10);
        if (isNaN(n)) {
          out.push(L("numbers only, wind walker. (or `quit`)", "dim"));
        } else {
          g.tries += 1;
          if (n === g.target) {
            g.active = false;
            out.push(
              L(TROPHY, "banner-line"), L(""),
              L(`*** CORRECT in ${g.tries} tries! the hood salutes you. ***`, "gold"), L(""),
            );
            unlock("LUCKY", out);
          } else {
            out.push(L(n < g.target ? "higher. aim higher." : "lower. ease off the gas.", "bright"));
          }
        }
      }
      push(out);
      return;
    }

    const [cmd, ...rest] = cmdLine.split(/\s+/);
    const arg = rest.join(" ");
    const out = [];
    const c = cmd.toLowerCase();

    usedCmds.current.add(c);
    if (usedCmds.current.size >= 10) unlock("EXPLORER", out);

    switch (c) {
      case "help":
        out.push(L("available commands:", "bright"), L(""));
        HELP.forEach(([cc, d]) =>
          out.push(d === "" ? L(`  ${cc}`, "bright") : L(`  ${cc.padEnd(24)}${d}`, "dim"))
        );
        out.push(L(""));
        break;

      case "about":
        out.push(
          L(""), L("FART HOOD OS v3.0", "bright"), L("─".repeat(44), "dim"),
          L("an ascii terminal for the people."),
          L("no charts. no candles. no rug pulls."),
          L("just you, a blinking cursor, and the wind."),
          L(""),
          L("built with react. powered by beans.", "dim"),
          L("rank up with `fart`. collect all 10 achievements.", "dim"),
          L(""),
        );
        break;

      case "lore":
        out.push(
          L(""), L("THE LEGEND OF THE HOOD", "bright"), L("─".repeat(44), "dim"),
          L("long ago, in a server room with broken AC,"),
          L("a sysadmin ate a family-size bowl of chili"),
          L("and sat down for a 14-hour shift."),
          L(""),
          L("what happened next crashed three mainframes"),
          L("and birthed a legend. the hood was formed by"),
          L("those who survived. this terminal is their"),
          L("monument. treat it with respect. and febreze.", "dim"),
          L(""),
        );
        break;

      case "faq":
        out.push(
          L(""), L("FREQUENTLY AIRED QUESTIONS", "bright"), L("─".repeat(44), "dim"),
          L("q: is this a crypto site?", "bright"),
          L("a: no. the only gas here is literal.", "dim"), L(""),
          L("q: how do i rank up?", "bright"),
          L("a: `fart`. repeatedly. commitment matters.", "dim"), L(""),
          L("q: what are achievements?", "bright"),
          L("a: 10 badges for 10 deeds. type `achievements`.", "dim"), L(""),
          L("q: is selfdestruct safe?", "bright"),
          L("a: define safe.", "dim"), L(""),
          L("q: who smelt it?", "bright"),
          L("a: you know the rules. you dealt it.", "dim"), L(""),
        );
        break;

      case "roadmap":
        out.push(
          L(""), L("ROADMAP.PLAN", "bright"), L("─".repeat(44), "dim"),
          L("[x] phase 1: exist"),
          L("[x] phase 2: rank system + mini-game"),
          L("[x] phase 3: achievements, hacking, self-destruct"),
          L("[ ] phase 4: sound effects (you know which)"),
          L("[ ] phase 5: multiplayer leaderboard"),
          L("[ ] phase 6: smell-o-vision (hardware pending)"),
          L(""),
        );
        break;

      case "tips":
        out.push(L(`tip: ${pick(TIPS)}`, "bright"), L(""));
        break;

      case "credits":
        out.push(
          L(""), L("CREDITS.LOG", "bright"), L("─".repeat(44), "dim"),
          L("concept & direction ....... you"),
          L("engineering ............... react + one very tired fan"),
          L("catering .................. beans (uncredited, unforgettable)"),
          L("special thanks ............ the dog, for taking the blame"),
          L(""),
        );
        break;

      case "fart":
        doFart(out);
        break;

      case "stats": {
        const r = rankFor(farts);
        const nextRank = RANKS.find((x) => x.min > farts);
        const badgeCount = Object.keys(unlocked).length;
        out.push(
          L(""), L("OPERATOR STATS", "bright"), L("─".repeat(44), "dim"),
          L(`  farts released ....... ${farts}`),
          L(`  current rank ......... ${r.name}`, "gold"),
          L(`  next rank ............ ${nextRank ? `${nextRank.name} (at ${nextRank.min})` : "MAXED OUT"}`),
          L(`  achievements ......... ${badgeCount} / ${Object.keys(ACHIEVEMENTS).length}`),
          L(`  session uptime ....... ${fmtUptime(uptime)}`),
          L(`  air quality .......... ${airFor(farts).label}`),
          L(`  commands run ......... ${history.length + 1}`),
          L(""),
        );
        break;
      }

      case "achievements":
        out.push(L(""), L("ACHIEVEMENTS", "bright"), L("─".repeat(44), "dim"));
        Object.entries(ACHIEVEMENTS).forEach(([k, desc]) =>
          out.push(L(`  [${unlocked[k] ? "x" : " "}] ${desc}`, unlocked[k] ? "gold" : "dim"))
        );
        out.push(L(""));
        break;

      case "guess":
        game.current = { active: true, target: Math.floor(Math.random() * 100) + 1, tries: 0 };
        out.push(
          L(""), L("GUESS THE NUMBER — 1 to 100", "bright"),
          L("type a number and press enter. `quit` to bail.", "dim"), L(""),
        );
        break;

      case "8ball":
        if (!arg) {
          out.push(L("usage: 8ball <your question>", "dim"), L(""));
        } else {
          out.push(L(`(8) ${pick(EIGHTBALL)}`, "bright"), L(""));
          unlock("ORACLE", out);
        }
        break;

      case "dice": {
        const roll = Math.floor(Math.random() * 6);
        out.push(L(DICE_FACES[roll], "banner-line"), L(""), L(`you rolled a ${roll + 1}.`, "bright"), L(""));
        unlock("GAMBLER", out);
        break;
      }

      case "flip": {
        const side = Math.random() > 0.5 ? "HEADS" : "TAILS";
        out.push(L(`  .-----.\n |  ${side === "HEADS" ? "(o o)" : " ~~~ "}  |\n  '-----'`, "banner-line"));
        out.push(L(`${side}.`, "bright"), L(""));
        unlock("GAMBLER", out);
        break;
      }

      case "joke":
        out.push(L(pick(JOKES), "bright"), L(""));
        break;

      case "fortune":
        out.push(L(`fortune: ${pick(FORTUNES)}`, "bright"), L(""));
        break;

      case "weather":
        out.push(L("HOOD WEATHER SERVICE", "bright"), L(pick(WEATHERS), "dim"), L(""));
        break;

      case "hack":
        push(out);
        runHack();
        return;

      case "selfdestruct":
        push(out);
        runSelfDestruct();
        return;

      case "matrix":
        setMatrixOn((m) => !m);
        out.push(L(matrixOn ? "rain stopped. back to reality." : "wake up, neo. the hood has you.", "dim"), L(""));
        if (!matrixOn) unlock("NEO", out);
        break;

      case "banner":
        out.push(L(BANNER, "banner-line"), L(""));
        break;

      case "ls":
        out.push(L(FILES.join("   "), "bright"), L(""));
        break;

      case "cat": {
        if (!arg) { out.push(L("usage: cat <file>", "dim")); break; }
        const known = {
          "beans.txt": "beans, beans, the magical fruit.\nconsumption log: [REDACTED FOR YOUR SAFETY]",
          "chili_recipe.md": "# grandma's chili\n1. beans\n2. more beans\n3. regret (added automatically)",
          "readme.gas": "FART HOOD — handle with care.\nventilate before use.",
          "blame_the_dog.sh": "#!/bin/sh\necho \"it was the dog.\"\nexit 0  # clean getaway",
          "lore.dat": "encrypted. try the `lore` command instead.",
          "roadmap.plan": "try the `roadmap` command for the readable version.",
          "tips.txt": "try the `tips` command. it rotates.",
          "credits.log": "try the `credits` command.",
        };
        const content = known[arg.toLowerCase()];
        out.push(content ? L(content) : L(`cat: ${arg}: no such file (check ls)`, "err"), L(""));
        break;
      }

      case "robin":
        out.push(L(ROBIN, "banner-line"), L("he steals from the rich and gives to the wind.", "dim"), L(""));
        break;

      case "cowsay":
        out.push(L(COW, "banner-line"), L(""));
        break;

      case "whoami":
        out.push(L(`guest@farthood — rank: ${rankFor(farts).name}`, "bright"), L(""));
        break;

      case "date":
        out.push(L(new Date().toString(), "bright"), L(""));
        break;

      case "echo":
        out.push(L(arg || "", "bright"), L(""));
        break;

      case "theme":
        out.push(L("the hood is monochrome now. one color. total commitment.", "dim"), L(""));
        break;

      case "history":
        history.slice(-10).forEach((h, i) => out.push(L(`  ${i + 1}  ${h}`, "dim")));
        out.push(L(""));
        break;

      case "ca":
        out.push(L(`CA: ${CA}`, "bright"), L("tip: click the CA chip in the header to copy it.", "dim"), L(""));
        break;

      case "twitter":
      case "x":
        if (TWITTER_URL) {
          out.push(L("opening the bird app…", "dim"), L(""));
          window.open(TWITTER_URL, "_blank", "noopener");
        } else {
          out.push(L("twitter: coming soon. follow the smell.", "dim"), L(""));
        }
        break;

      case "sudo":
        out.push(L("nice try. in the hood, nobody outranks the wind.", "err"), L(""));
        break;

      case "clear":
        setLines([]);
        return;

      default:
        out.push(L(`command not found: ${c} — type \`help\``, "err"), L(""));
    }

    push(out);
  };

  /* ---------- input events ---------- */
  const submit = (v) => {
    setHistory((h) => (v.trim() ? [...h, v] : h));
    setHistIdx(-1);
    setInput("");
    run(v);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      submit(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((idx) => {
        const next = idx === -1 ? history.length - 1 : Math.max(0, idx - 1);
        setInput(history[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((idx) => {
        if (idx === -1) return -1;
        const next = idx + 1;
        if (next >= history.length) { setInput(""); return -1; }
        setInput(history[next]);
        return next;
      });
    }
  };

  const clickCmd = (cmdText) => {
    submit(cmdText);
    inputRef.current?.focus();
  };

  const focusInput = () => inputRef.current?.focus();

  const copyCA = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) navigator.clipboard.writeText(CA).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openTwitter = (e) => {
    e.stopPropagation();
    if (TWITTER_URL) window.open(TWITTER_URL, "_blank", "noopener");
    else push([L("twitter: coming soon. follow the smell.", "dim"), L("")]);
  };

  const air = airFor(farts);
  const rank = rankFor(farts);
  const badgeCount = Object.keys(unlocked).length;
  const phosColor = "#CCFF00";

  return (
    <div className={`crt theme-${theme}${shaking ? " shake" : ""}`} onClick={focusInput}>
      <div className="boot-flash" aria-hidden="true" />
      <div className="flicker-layer" aria-hidden="true" />
      {matrixOn && <MatrixRain color={phosColor} />}
      <pre className="robin" aria-hidden="true">{ROBIN}</pre>

      <div className="hdr">
        <span className="title">░ FARTHOOD OS v3.0 ░</span>
        <button className="ca-chip" onClick={copyCA} title="click to copy">
          CA: <b>{copied ? "COPIED!" : CA}</b>
        </button>
        <span className={`gauge${air.warn ? " warn" : ""}`}>AIR: <b>{air.label}</b></span>
        <span className="gauge">RANK: <b>{rank.name}</b></span>
        <span className="gauge">BADGES: <b>{badgeCount}/{Object.keys(ACHIEVEMENTS).length}</b></span>
        <span className="gauge">UPTIME: <b>{fmtUptime(uptime)}</b></span>
        <button className="tw-btn" onClick={openTwitter}>[ TWITTER ]</button>
      </div>

      <div className="screen" ref={screenRef} aria-live="polite">
        {lines.map((ln) => (
          <div key={ln.id} className={ln.cls === "banner-line" ? "banner" : `line ${ln.cls}`}>
            {ln.cls === "echo" ? (
              <>
                <span className="prompt-sigil">&gt; </span>
                <span className="cmd-echo">{ln.text.slice(2)}</span>
              </>
            ) : (
              ln.text
            )}
          </div>
        ))}
      </div>

      {booted && (
        <>
          <div className="btn-panel" onClick={(e) => e.stopPropagation()}>
            {BUTTON_GROUPS.map((g) => (
              <div className="btn-group" key={g.label}>
                <span className="glabel">{g.label}</span>
                {g.cmds.map((cmdText) => (
                  <button
                    key={cmdText}
                    className="term-btn"
                    onClick={() => clickCmd(cmdText)}
                  >
                    [{cmdText.split(" ")[0].toUpperCase()}{cmdText.startsWith("theme") ? ` ${cmdText.split(" ")[1].toUpperCase()}` : ""}]
                  </button>
                ))}
                {g.label === "FUN" && (
                  <button className="term-btn danger" onClick={() => clickCmd("selfdestruct")}>
                    [SELFDESTRUCT]
                  </button>
                )}
                {g.label === "SYS" && (
                  <button className="term-btn danger" onClick={() => clickCmd("clear")}>
                    [CLEAR]
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="input-row">
            <span className="sigil">
              guest@<b>farthood</b>:~$
            </span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
          </div>
        </>
      )}

      <div className="strip">
        <span><span className="ok">●</span> ONLINE</span>
        <span>FARTS: {farts}</span>
        <span className="au">BADGES: {badgeCount}/{Object.keys(ACHIEVEMENTS).length}</span>
        <span className={air.warn ? "hot" : ""}>AIR: {air.label}</span>
        <span>MATRIX: {matrixOn ? "RAINING" : "STANDBY"}</span>
      </div>
    </div>
  );
}