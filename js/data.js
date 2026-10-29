/* =====================================================================
   PORTAL_DATA – nơi DUY NHẤT cần sửa để thêm / bớt / đổi ứng dụng.
   ---------------------------------------------------------------------
  apps:    id -> [ "Tên hiển thị", "URL mở ra", { mode, tuỳ chọn } ]
            tuỳ chọn: icon  = link ảnh riêng hoặc file nội bộ ("assets/x.png")
                      slug  = tên icon trên simpleicons.org (dự phòng)
                      bg    = màu nền ô icon (mặc định trắng)
               fit   = "cover" để ảnh lấp đầy ô icon
               mode  = "work", "shopping" hoặc "entertainment"
   folders: id -> { name, apps: [id, ...] }
   layout:  dock + pages. Mỗi mục là "app:<id>" hoặc "folder:<id>"
   iconProviders: thứ tự thử lấy icon thật. {url} {domain} {slug}
   ===================================================================== */
const APP_MODES = Object.freeze({
  ALL: "all",
  WORK: "work",
  SHOPPING: "shopping",
  ENTERTAINMENT: "entertainment"
});

const PORTAL_DATA = {
  settings: {
    openTarget: "_blank",
    wallpaperDefault: 0,
    wallpapers: [
      "radial-gradient(120% 80% at 20% 10%, #5b7cff 0%, transparent 55%), radial-gradient(100% 80% at 90% 30%, #ff7ab8 0%, transparent 50%), linear-gradient(160deg, #1b1f4b, #0c0f26)",
      "radial-gradient(110% 80% at 80% 0%, #ffb35c 0%, transparent 55%), linear-gradient(170deg, #ff5f6d, #3b1d5e)",
      "radial-gradient(100% 70% at 30% 100%, #2fe0b5 0%, transparent 55%), linear-gradient(180deg, #0b2a4a, #05121f)",
      "linear-gradient(180deg, #111, #2a2a2e)"
    ],
    iconProviders: [
      "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={url}&size=128",
      "https://www.google.com/s2/favicons?domain={domain}&sz=128",
      "https://icons.duckduckgo.com/ip3/{domain}.ico",
      "https://cdn.simpleicons.org/{slug}"
    ]
  },

  apps: {
    /* ---------- Google ---------- */
    google: ["Google", "https://www.google.com", { mode: APP_MODES.WORK }],
    gmail: ["Gmail", "https://mail.google.com", { mode: APP_MODES.WORK }],
    drive: ["Drive", "https://drive.google.com", { mode: APP_MODES.WORK }],
    docs: ["Docs", "https://docs.google.com/document/u/0/", { mode: APP_MODES.WORK }],
    sheets: ["Sheets", "https://docs.google.com/spreadsheets/u/0/", { mode: APP_MODES.WORK }],
    slides: ["Slides", "https://docs.google.com/presentation/u/0/", { mode: APP_MODES.WORK }],
    forms: ["Forms", "https://docs.google.com/forms/u/0/", { mode: APP_MODES.WORK }],
    calendar: ["Lịch", "https://calendar.google.com", { mode: APP_MODES.WORK }],
    meet: ["Meet", "https://meet.google.com", { mode: APP_MODES.WORK }],
    maps: ["Maps", "https://maps.google.com", { mode: APP_MODES.WORK }],
    photos: ["Ảnh", "https://photos.google.com", { mode: APP_MODES.WORK }],
    youtube: ["YouTube", "https://www.youtube.com", { mode: APP_MODES.ENTERTAINMENT }],
    ytmusic: ["YT Music", "https://music.youtube.com", { mode: APP_MODES.ENTERTAINMENT }],
    translate: ["Dịch", "https://translate.google.com", { mode: APP_MODES.WORK }],
    keep: ["Keep", "https://keep.google.com", { mode: APP_MODES.WORK }],
    gchat: ["Chat", "https://chat.google.com", { mode: APP_MODES.WORK }],
    gemini: ["Gemini", "https://gemini.google.com", { mode: APP_MODES.WORK }],
    notebooklm: ["NotebookLM", "https://notebooklm.google.com", { mode: APP_MODES.WORK }],
    aistudio: ["AI Studio", "https://aistudio.google.com", { mode: APP_MODES.WORK }],
    earth: ["Earth", "https://earth.google.com/web/", { mode: APP_MODES.WORK }],
    gnews: ["Google News", "https://news.google.com", { mode: APP_MODES.ENTERTAINMENT }],
    scholar: ["Scholar", "https://scholar.google.com", { mode: APP_MODES.WORK }],
    playstore: ["Play", "https://play.google.com", { mode: APP_MODES.WORK }],
    analytics: ["Analytics", "https://analytics.google.com", { mode: APP_MODES.WORK }],

    /* ---------- Microsoft ---------- */
    m365: ["Microsoft 365", "https://www.office.com", { mode: APP_MODES.WORK }],
    outlook: ["Outlook", "https://outlook.live.com/mail/", { mode: APP_MODES.WORK }],
    word: ["Word", "https://www.office.com/launch/word", { mode: APP_MODES.WORK }],
    excel: ["Excel", "https://www.office.com/launch/excel", { mode: APP_MODES.WORK }],
    powerpoint: ["PowerPoint", "https://www.office.com/launch/powerpoint", { mode: APP_MODES.WORK }],
    onenote: ["OneNote", "https://www.onenote.com", { mode: APP_MODES.WORK }],
    onedrive: ["OneDrive", "https://onedrive.live.com", { mode: APP_MODES.WORK }],
    teams: ["Teams", "https://teams.microsoft.com", { mode: APP_MODES.WORK }],
    todo: ["To Do", "https://to-do.live.com", { mode: APP_MODES.WORK }],
    bing: ["Bing", "https://www.bing.com", { mode: APP_MODES.WORK }],
    copilot: ["Copilot", "https://copilot.microsoft.com", { mode: APP_MODES.WORK }],
    azure: ["Azure", "https://portal.azure.com", { mode: APP_MODES.WORK }],
    xboxcloud: ["Xbox Cloud", "https://www.xbox.com/play", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Meta ---------- */
    facebook: ["Facebook", "https://www.facebook.com", { mode: APP_MODES.ENTERTAINMENT }],
    fbwatch: ["FB Watch", "https://www.facebook.com/watch", { mode: APP_MODES.ENTERTAINMENT }],
    fbmarket: ["Marketplace", "https://www.facebook.com/marketplace", { mode: APP_MODES.SHOPPING }],
    fbnews: ["FB Tin tức", "https://www.facebook.com/news", { mode: APP_MODES.ENTERTAINMENT }],
    messenger: ["Messenger", "https://www.messenger.com", { mode: APP_MODES.WORK }],
    instagram: ["Instagram", "https://www.instagram.com", { mode: APP_MODES.ENTERTAINMENT }],
    whatsapp: ["WhatsApp", "https://web.whatsapp.com", { mode: APP_MODES.WORK }],
    threads: ["Threads", "https://www.threads.com", { mode: APP_MODES.ENTERTAINMENT }],
    metaai: ["Meta AI", "https://www.meta.ai", { mode: APP_MODES.WORK }],

    /* ---------- Mạng xã hội ---------- */
    tiktok: ["TikTok", "https://www.tiktok.com", { mode: APP_MODES.ENTERTAINMENT }],
    x: ["X", "https://x.com", { mode: APP_MODES.ENTERTAINMENT }],
    reddit: ["Reddit", "https://www.reddit.com", { mode: APP_MODES.ENTERTAINMENT }],
    pinterest: ["Pinterest", "https://www.pinterest.com", { mode: APP_MODES.ENTERTAINMENT }],
    linkedin: ["LinkedIn", "https://www.linkedin.com", { mode: APP_MODES.WORK }],
    snapchat: ["Snapchat", "https://www.snapchat.com", { mode: APP_MODES.ENTERTAINMENT }],
    telegram: ["Telegram", "https://web.telegram.org", { mode: APP_MODES.WORK }],
    discord: ["Discord", "https://discord.com/app", { mode: APP_MODES.WORK }],
    zalo: ["Zalo", "https://chat.zalo.me", { mode: APP_MODES.WORK }],
    tumblr: ["Tumblr", "https://www.tumblr.com", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Giải trí ---------- */
    netflix: ["Netflix", "https://www.netflix.com", { mode: APP_MODES.ENTERTAINMENT }],
    spotify: ["Spotify", "https://open.spotify.com", { mode: APP_MODES.ENTERTAINMENT }],
    twitch: ["Twitch", "https://www.twitch.tv", { mode: APP_MODES.ENTERTAINMENT }],
    disney: ["Disney+", "https://www.disneyplus.com", { mode: APP_MODES.ENTERTAINMENT }],
    prime: ["Prime Video", "https://www.primevideo.com", { mode: APP_MODES.ENTERTAINMENT }],
    soundcloud: ["SoundCloud", "https://soundcloud.com", { mode: APP_MODES.ENTERTAINMENT }],
    zingmp3: ["Zing MP3", "https://zingmp3.vn", { mode: APP_MODES.ENTERTAINMENT }],
    bilibili: ["Bilibili", "https://www.bilibili.com", { mode: APP_MODES.ENTERTAINMENT }],
    sctv: ["SCTV", "https://sctvonline.vn", { mode: APP_MODES.ENTERTAINMENT }],
    kplus: ["K+", "https://www.kplus.vn", { mode: APP_MODES.ENTERTAINMENT }],
    hbo: ["HBO Max", "https://play.max.com", { mode: APP_MODES.ENTERTAINMENT }],
    appletv: ["Apple TV", "https://tv.apple.com", { mode: APP_MODES.ENTERTAINMENT }],
    youtubekids: ["YouTube Kids", "https://www.youtube.com/kids", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Ứng dụng phổ biến tại Việt Nam ---------- */
    capcut: ["CapCut", "https://www.capcut.com", { mode: APP_MODES.WORK }],
    meitu: ["Meitu", "https://www.meitu.com", { mode: APP_MODES.WORK }],
    locket: ["Locket Widget", "https://locket.camera", { mode: APP_MODES.ENTERTAINMENT }],
    weplay: ["WePlay", "https://weplayapp.com", { mode: APP_MODES.ENTERTAINMENT }],
    tinder: ["Tinder", "https://tinder.com", { mode: APP_MODES.ENTERTAINMENT }],
    vieon: ["VieON", "https://vieon.vn", { mode: APP_MODES.ENTERTAINMENT }],
    fptplay: ["FPT Play", "https://fptplay.vn", { mode: APP_MODES.ENTERTAINMENT }],
    tv360: ["TV360", "https://tv360.vn", { mode: APP_MODES.ENTERTAINMENT }],
    vtvgo: ["VTVgo", "https://vtvgo.vn", { mode: APP_MODES.ENTERTAINMENT }],
    hypic: ["Hypic", "https://hypic.com", { mode: APP_MODES.WORK }],
    bandlab: ["BandLab", "https://www.bandlab.com", { mode: APP_MODES.WORK }],
    wink: ["Wink", "https://wink.video", { mode: APP_MODES.WORK }],
    picsart: ["Picsart", "https://picsart.com", { mode: APP_MODES.WORK }],
    camscanner: ["CamScanner", "https://www.camscanner.com", { mode: APP_MODES.WORK }],
    duolingo: ["Duolingo", "https://www.duolingo.com", { mode: APP_MODES.WORK }],
    remini: ["Remini", "https://remini.ai", { mode: APP_MODES.WORK }],
    dazz: ["Dazz Cam", "https://dazz.cam", { mode: APP_MODES.WORK }],
    b612: ["B612", "https://b612.snow.me", { mode: APP_MODES.WORK }],
    snapedit: ["SnapEdit", "https://snapedit.app", { mode: APP_MODES.WORK }],
    epik: ["EPIK", "https://epik.com", { mode: APP_MODES.WORK }],

    /* ---------- Tin tức ---------- */
    vnexpress: ["VnExpress", "https://vnexpress.net", { mode: APP_MODES.ENTERTAINMENT }],
    tuoitre: ["Tuổi Trẻ", "https://tuoitre.vn", { mode: APP_MODES.ENTERTAINMENT }],
    dantri: ["Dân trí", "https://dantri.com.vn", { mode: APP_MODES.ENTERTAINMENT }],
    thanhnien: ["Thanh Niên", "https://thanhnien.vn", { mode: APP_MODES.ENTERTAINMENT }],
    bbc: ["BBC News", "https://www.bbc.com/news", { mode: APP_MODES.ENTERTAINMENT }],
    cnn: ["CNN", "https://edition.cnn.com", { mode: APP_MODES.ENTERTAINMENT }],
    medium: ["Medium", "https://medium.com", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Mua sắm ---------- */
    shopee: ["Shopee", "https://shopee.vn", { mode: APP_MODES.SHOPPING }],
    lazada: ["Lazada", "https://www.lazada.vn", { mode: APP_MODES.SHOPPING }],
    tiki: ["Tiki", "https://tiki.vn", { mode: APP_MODES.SHOPPING }],
    amazon: ["Amazon", "https://www.amazon.com", { mode: APP_MODES.SHOPPING }],

    /* ---------- AI ---------- */
    chatgpt: ["ChatGPT", "https://chatgpt.com", { mode: APP_MODES.WORK }],
    claude: ["Claude", "https://claude.ai", { mode: APP_MODES.WORK }],
    perplexity: ["Perplexity", "https://www.perplexity.ai", { mode: APP_MODES.WORK }],
    grok: ["Grok", "https://grok.com", { mode: APP_MODES.WORK }],
    deepseek: ["DeepSeek", "https://chat.deepseek.com", { mode: APP_MODES.WORK }],
    mistral: ["Le Chat", "https://chat.mistral.ai", { mode: APP_MODES.WORK }],
    midjourney: ["Midjourney", "https://www.midjourney.com", { mode: APP_MODES.WORK }],
    huggingface: ["Hugging Face", "https://huggingface.co", { mode: APP_MODES.WORK }],
    suno: ["Suno", "https://suno.com", { mode: APP_MODES.WORK }],

    /* ---------- Làm việc ---------- */
    slack: ["Slack", "https://app.slack.com", { mode: APP_MODES.WORK }],
    notion: ["Notion", "https://www.notion.so", { mode: APP_MODES.WORK }],
    trello: ["Trello", "https://trello.com", { mode: APP_MODES.WORK }],
    asana: ["Asana", "https://app.asana.com", { mode: APP_MODES.WORK }],
    jira: ["Jira", "https://www.atlassian.com/software/jira", { mode: APP_MODES.WORK }],
    figma: ["Figma", "https://www.figma.com", { mode: APP_MODES.WORK }],
    canva: ["Canva", "https://www.canva.com", { mode: APP_MODES.WORK }],
    zoom: ["Zoom", "https://app.zoom.us", { mode: APP_MODES.WORK }],
    dropbox: ["Dropbox", "https://www.dropbox.com", { mode: APP_MODES.WORK }],
    linear: ["Linear", "https://linear.app", { mode: APP_MODES.WORK }],
    miro: ["Miro", "https://miro.com", { mode: APP_MODES.WORK }],
    airtable: ["Airtable", "https://airtable.com", { mode: APP_MODES.WORK }],
    calendly: ["Calendly", "https://calendly.com", { mode: APP_MODES.WORK }],
    grammarly: ["Grammarly", "https://app.grammarly.com", { mode: APP_MODES.WORK }],

    /* ---------- Lập trình ---------- */
    github: ["GitHub", "https://github.com", { mode: APP_MODES.WORK, slug: "github", bg: "#fff" }],
    gitlab: ["GitLab", "https://gitlab.com", { mode: APP_MODES.WORK }],
    vscode: ["VS Code", "https://vscode.dev", { mode: APP_MODES.WORK }],
    codepen: ["CodePen", "https://codepen.io", { mode: APP_MODES.WORK }],
    replit: ["Replit", "https://replit.com", { mode: APP_MODES.WORK }],
    stackblitz: ["StackBlitz", "https://stackblitz.com", { mode: APP_MODES.WORK }],
    vercel: ["Vercel", "https://vercel.com", { mode: APP_MODES.WORK }],
    cloudflare: ["Cloudflare", "https://dash.cloudflare.com", { mode: APP_MODES.WORK }],
    stackoverflow: ["Stack Overflow", "https://stackoverflow.com", { mode: APP_MODES.WORK }],
    mdn: ["MDN", "https://developer.mozilla.org", { mode: APP_MODES.WORK }],
    postman: ["Postman", "https://web.postman.co", { mode: APP_MODES.WORK }],

    /* ---------- Game: trò chơi web ---------- */
    minecraft: ["Minecraft Classic", "https://classic.minecraft.net", { mode: APP_MODES.ENTERTAINMENT }],
    krunker: ["Krunker", "https://krunker.io", { mode: APP_MODES.ENTERTAINMENT }],
    slither: ["Slither.io", "https://slither.io", { mode: APP_MODES.ENTERTAINMENT }],
    agar: ["Agar.io", "https://agar.io", { mode: APP_MODES.ENTERTAINMENT }],
    shellshock: ["Shell Shockers", "https://shellshock.io", { mode: APP_MODES.ENTERTAINMENT }],
    skribbl: ["Skribbl", "https://skribbl.io", { mode: APP_MODES.ENTERTAINMENT }],
    game2048: ["2048", "https://play2048.co", { mode: APP_MODES.ENTERTAINMENT }],
    wordle: ["Wordle", "https://www.nytimes.com/games/wordle/index.html", { mode: APP_MODES.ENTERTAINMENT }],
    cookie: ["Cookie Clicker", "https://orteil.dashnet.org/cookieclicker/", { mode: APP_MODES.ENTERTAINMENT }],
    tetris: ["Tetris", "https://tetris.com/play-tetris", { mode: APP_MODES.ENTERTAINMENT }],
    alchemy: ["Little Alchemy 2", "https://littlealchemy2.com", { mode: APP_MODES.ENTERTAINMENT }],
    geoguessr: ["GeoGuessr", "https://www.geoguessr.com", { mode: APP_MODES.ENTERTAINMENT }],
    lichess: ["Lichess", "https://lichess.org", { mode: APP_MODES.ENTERTAINMENT }],
    chesscom: ["Chess.com", "https://www.chess.com", { mode: APP_MODES.ENTERTAINMENT }],
    dino: ["Chrome Dino", "https://chromedino.com", { mode: APP_MODES.ENTERTAINMENT }],
    geforce: ["GeForce NOW", "https://play.geforcenow.com", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Game: cổng game (nhiều trò) ---------- */
    poki: ["Poki", "https://poki.com", { mode: APP_MODES.ENTERTAINMENT }],
    crazygames: ["CrazyGames", "https://www.crazygames.com", { mode: APP_MODES.ENTERTAINMENT }],
    y8: ["Y8", "https://www.y8.com", { mode: APP_MODES.ENTERTAINMENT }],
    miniclip: ["Miniclip", "https://www.miniclip.com/games/en/", { mode: APP_MODES.ENTERTAINMENT }],
    coolmath: ["Coolmath Games", "https://www.coolmathgames.com", { mode: APP_MODES.ENTERTAINMENT }],
    newgrounds: ["Newgrounds", "https://www.newgrounds.com/games", { mode: APP_MODES.ENTERTAINMENT }],
    kongregate: ["Kongregate", "https://www.kongregate.com", { mode: APP_MODES.ENTERTAINMENT }],
    armorgames: ["Armor Games", "https://armorgames.com", { mode: APP_MODES.ENTERTAINMENT }],
    itch: ["itch.io Web", "https://itch.io/games/html5", { mode: APP_MODES.ENTERTAINMENT }],
    gamedistribution: ["GameDistribution", "https://gamedistribution.com", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Game: Flash (chạy bằng Ruffle) & WebGL ---------- */
    ruffle: ["Ruffle (Flash)", "https://ruffle.rs/demo/", { mode: APP_MODES.ENTERTAINMENT }],
    flashpoint: ["Flashpoint", "https://flashpointproject.github.io/", { mode: APP_MODES.ENTERTAINMENT }],
    hexgl: ["HexGL", "https://hexgl.bkcore.com/play/", { mode: APP_MODES.ENTERTAINMENT }],
    aquarium: ["WebGL Aquarium", "https://webglsamples.org/aquarium/aquarium.html", { mode: APP_MODES.ENTERTAINMENT }],
    threejs: ["Three.js", "https://threejs.org/examples/", { mode: APP_MODES.ENTERTAINMENT }],
    chromeexp: ["Chrome Experiments", "https://experiments.withgoogle.com", { mode: APP_MODES.ENTERTAINMENT }],
    voxiom: ["Voxiom", "https://voxiom.io", { mode: APP_MODES.ENTERTAINMENT }],
    zombs: ["ZOMBS.io", "https://zombs.io", { mode: APP_MODES.ENTERTAINMENT }]
  },

  folders: {
    google:    { name: "Google",     apps: ["google","gmail","drive","docs","sheets","slides","forms","calendar","meet","maps","photos","translate","keep","gchat","gemini","notebooklm","aistudio","earth","gnews","scholar","playstore","analytics","youtube","ytmusic"] },
    microsoft: { name: "Microsoft",  apps: ["m365","outlook","word","excel","powerpoint","onenote","onedrive","teams","todo","bing","copilot","azure","xboxcloud"] },
    meta:      { name: "Meta",       apps: ["facebook","fbwatch","fbmarket","fbnews","messenger","instagram","whatsapp","threads","metaai"] },
    social:    { name: "Mạng xã hội",apps: ["tiktok","x","reddit","pinterest","linkedin","snapchat","telegram","discord","zalo","tumblr"] },
    media:     { name: "Giải trí",   apps: ["youtube","tiktok","netflix","spotify","twitch","disney","prime","soundcloud","zingmp3","ytmusic","bilibili","sctv","kplus","hbo","appletv","youtubekids"] },
    popularvn: { name: "Yêu thích VN", apps: ["tiktok","zalo","youtube","capcut","chatgpt","claude","gemini","gmail","canva","meitu","locket","weplay","tinder","vieon","fptplay","tv360","vtvgo","hypic","bandlab","zingmp3","wink","zoom","picsart","discord","camscanner","duolingo","remini","dazz","b612","snapedit","epik"] },
    news:      { name: "Tin tức",    apps: ["fbnews","vnexpress","tuoitre","dantri","thanhnien","gnews","bbc","cnn","medium"] },
    shopping:  { name: "Mua sắm",    apps: ["shopee","lazada","tiki","amazon","fbmarket"] },
    ai:        { name: "AI",         apps: ["chatgpt","claude","gemini","copilot","perplexity","grok","deepseek","metaai","mistral","midjourney","huggingface","notebooklm","suno"] },
    work:      { name: "Làm việc",   apps: ["slack","notion","trello","asana","jira","figma","canva","zoom","teams","dropbox","linear","miro","airtable","calendly","grammarly"] },
    dev:       { name: "Lập trình",  apps: ["github","gitlab","vscode","codepen","replit","stackblitz","vercel","cloudflare","stackoverflow","mdn","postman","huggingface"] },
    games:     { name: "Game Web",   apps: ["minecraft","krunker","slither","agar","shellshock","skribbl","game2048","wordle","cookie","tetris","alchemy","geoguessr","lichess","chesscom","dino","geforce","xboxcloud"] },
    portals:   { name: "Cổng game",  apps: ["poki","crazygames","y8","miniclip","coolmath","newgrounds","kongregate","armorgames","itch","gamedistribution"] },
    flashwebgl:{ name: "Flash & WebGL", apps: ["ruffle","flashpoint","newgrounds","hexgl","aquarium","threejs","chromeexp","voxiom","zombs","earth"] }
  },

  layout: {
    dock: ["app:google", "app:gmail", "app:youtube", "app:chatgpt"],
    pages: [
      ["folder:popularvn","folder:google","folder:microsoft","folder:meta","folder:work",
       "app:youtube","app:tiktok","app:instagram","app:facebook",
       "app:chatgpt","app:gemini","app:claude","app:github",
       "app:slack","app:notion","app:whatsapp","app:spotify"],
      ["folder:social","folder:media","folder:news","folder:shopping",
       "folder:ai","folder:dev","app:netflix","app:zalo",
       "app:messenger","app:threads","app:x","app:reddit",
       "app:vnexpress","app:shopee","app:zoom","app:figma"],
      ["folder:games","folder:portals","folder:flashwebgl","app:minecraft",
       "app:poki","app:crazygames","app:krunker","app:slither",
       "app:agar","app:wordle","app:game2048","app:ruffle"]
    ]
  }
};
