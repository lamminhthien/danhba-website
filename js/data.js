/* =====================================================================
   PORTAL_DATA – nơi DUY NHẤT cần sửa để thêm / bớt / đổi ứng dụng.
   ---------------------------------------------------------------------
  apps:    id -> [ "Tên hiển thị", "URL mở ra", { mode, tuỳ chọn } ]
            tuỳ chọn: icon  = link ảnh riêng hoặc file nội bộ ("assets/x.png")
                      slug  = tên icon trên simpleicons.org (dự phòng)
                      bg    = màu nền ô icon (mặc định trắng)
               fit   = "cover" để ảnh lấp đầy ô icon
               mode  = "work" hoặc "entertainment"
   folders: id -> { name, apps: [id, ...] }
   layout:  dock + pages. Mỗi mục là "app:<id>" hoặc "folder:<id>"
   iconProviders: thứ tự thử lấy icon thật. {url} {domain} {slug}
   ===================================================================== */
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
    google: ["Google", "https://www.google.com", { mode: "work" }],
    gmail: ["Gmail", "https://mail.google.com", { mode: "work" }],
    drive: ["Drive", "https://drive.google.com", { mode: "work" }],
    docs: ["Docs", "https://docs.google.com/document/u/0/", { mode: "work" }],
    sheets: ["Sheets", "https://docs.google.com/spreadsheets/u/0/", { mode: "work" }],
    slides: ["Slides", "https://docs.google.com/presentation/u/0/", { mode: "work" }],
    forms: ["Forms", "https://docs.google.com/forms/u/0/", { mode: "work" }],
    calendar: ["Lịch", "https://calendar.google.com", { mode: "work" }],
    meet: ["Meet", "https://meet.google.com", { mode: "work" }],
    maps: ["Maps", "https://maps.google.com", { mode: "work" }],
    photos: ["Ảnh", "https://photos.google.com", { mode: "work" }],
    youtube: ["YouTube", "https://www.youtube.com", { mode: "entertainment" }],
    ytmusic: ["YT Music", "https://music.youtube.com", { mode: "entertainment" }],
    translate: ["Dịch", "https://translate.google.com", { mode: "work" }],
    keep: ["Keep", "https://keep.google.com", { mode: "work" }],
    gchat: ["Chat", "https://chat.google.com", { mode: "work" }],
    gemini: ["Gemini", "https://gemini.google.com", { mode: "work" }],
    notebooklm: ["NotebookLM", "https://notebooklm.google.com", { mode: "work" }],
    aistudio: ["AI Studio", "https://aistudio.google.com", { mode: "work" }],
    earth: ["Earth", "https://earth.google.com/web/", { mode: "work" }],
    gnews: ["Google News", "https://news.google.com", { mode: "entertainment" }],
    scholar: ["Scholar", "https://scholar.google.com", { mode: "work" }],
    playstore: ["Play", "https://play.google.com", { mode: "work" }],
    analytics: ["Analytics", "https://analytics.google.com", { mode: "work" }],

    /* ---------- Microsoft ---------- */
    m365: ["Microsoft 365", "https://www.office.com", { mode: "work" }],
    outlook: ["Outlook", "https://outlook.live.com/mail/", { mode: "work" }],
    word: ["Word", "https://www.office.com/launch/word", { mode: "work" }],
    excel: ["Excel", "https://www.office.com/launch/excel", { mode: "work" }],
    powerpoint: ["PowerPoint", "https://www.office.com/launch/powerpoint", { mode: "work" }],
    onenote: ["OneNote", "https://www.onenote.com", { mode: "work" }],
    onedrive: ["OneDrive", "https://onedrive.live.com", { mode: "work" }],
    teams: ["Teams", "https://teams.microsoft.com", { mode: "work" }],
    todo: ["To Do", "https://to-do.live.com", { mode: "work" }],
    bing: ["Bing", "https://www.bing.com", { mode: "work" }],
    copilot: ["Copilot", "https://copilot.microsoft.com", { mode: "work" }],
    azure: ["Azure", "https://portal.azure.com", { mode: "work" }],
    xboxcloud: ["Xbox Cloud", "https://www.xbox.com/play", { mode: "entertainment" }],

    /* ---------- Meta ---------- */
    facebook: ["Facebook", "https://www.facebook.com", { mode: "entertainment" }],
    fbwatch: ["FB Watch", "https://www.facebook.com/watch", { mode: "entertainment" }],
    fbmarket: ["Marketplace", "https://www.facebook.com/marketplace", { mode: "work" }],
    fbnews: ["FB Tin tức", "https://www.facebook.com/news", { mode: "entertainment" }],
    messenger: ["Messenger", "https://www.messenger.com", { mode: "entertainment" }],
    instagram: ["Instagram", "https://www.instagram.com", { mode: "entertainment" }],
    whatsapp: ["WhatsApp", "https://web.whatsapp.com", { mode: "entertainment" }],
    threads: ["Threads", "https://www.threads.com", { mode: "entertainment" }],
    metaai: ["Meta AI", "https://www.meta.ai", { mode: "work" }],

    /* ---------- Mạng xã hội ---------- */
    tiktok: ["TikTok", "https://www.tiktok.com", { mode: "entertainment" }],
    x: ["X", "https://x.com", { mode: "entertainment" }],
    reddit: ["Reddit", "https://www.reddit.com", { mode: "entertainment" }],
    pinterest: ["Pinterest", "https://www.pinterest.com", { mode: "entertainment" }],
    linkedin: ["LinkedIn", "https://www.linkedin.com", { mode: "entertainment" }],
    snapchat: ["Snapchat", "https://www.snapchat.com", { mode: "entertainment" }],
    telegram: ["Telegram", "https://web.telegram.org", { mode: "entertainment" }],
    discord: ["Discord", "https://discord.com/app", { mode: "entertainment" }],
    zalo: ["Zalo", "https://chat.zalo.me", { mode: "entertainment" }],
    tumblr: ["Tumblr", "https://www.tumblr.com", { mode: "entertainment" }],

    /* ---------- Giải trí ---------- */
    netflix: ["Netflix", "https://www.netflix.com", { mode: "entertainment" }],
    spotify: ["Spotify", "https://open.spotify.com", { mode: "entertainment" }],
    twitch: ["Twitch", "https://www.twitch.tv", { mode: "entertainment" }],
    disney: ["Disney+", "https://www.disneyplus.com", { mode: "entertainment" }],
    prime: ["Prime Video", "https://www.primevideo.com", { mode: "entertainment" }],
    soundcloud: ["SoundCloud", "https://soundcloud.com", { mode: "entertainment" }],
    zingmp3: ["Zing MP3", "https://zingmp3.vn", { mode: "entertainment" }],
    bilibili: ["Bilibili", "https://www.bilibili.com", { mode: "entertainment" }],

    /* ---------- Tin tức ---------- */
    vnexpress: ["VnExpress", "https://vnexpress.net", { mode: "entertainment" }],
    tuoitre: ["Tuổi Trẻ", "https://tuoitre.vn", { mode: "entertainment" }],
    dantri: ["Dân trí", "https://dantri.com.vn", { mode: "entertainment" }],
    thanhnien: ["Thanh Niên", "https://thanhnien.vn", { mode: "entertainment" }],
    bbc: ["BBC News", "https://www.bbc.com/news", { mode: "entertainment" }],
    cnn: ["CNN", "https://edition.cnn.com", { mode: "entertainment" }],
    medium: ["Medium", "https://medium.com", { mode: "entertainment" }],

    /* ---------- Mua sắm ---------- */
    shopee: ["Shopee", "https://shopee.vn", { mode: "work" }],
    lazada: ["Lazada", "https://www.lazada.vn", { mode: "work" }],
    tiki: ["Tiki", "https://tiki.vn", { mode: "work" }],
    amazon: ["Amazon", "https://www.amazon.com", { mode: "work" }],

    /* ---------- AI ---------- */
    chatgpt: ["ChatGPT", "https://chatgpt.com", { mode: "work" }],
    claude: ["Claude", "https://claude.ai", { mode: "work" }],
    perplexity: ["Perplexity", "https://www.perplexity.ai", { mode: "work" }],
    grok: ["Grok", "https://grok.com", { mode: "work" }],
    deepseek: ["DeepSeek", "https://chat.deepseek.com", { mode: "work" }],
    mistral: ["Le Chat", "https://chat.mistral.ai", { mode: "work" }],
    midjourney: ["Midjourney", "https://www.midjourney.com", { mode: "work" }],
    huggingface: ["Hugging Face", "https://huggingface.co", { mode: "work" }],
    suno: ["Suno", "https://suno.com", { mode: "work" }],

    /* ---------- Làm việc ---------- */
    slack: ["Slack", "https://app.slack.com", { mode: "work" }],
    notion: ["Notion", "https://www.notion.so", { mode: "work" }],
    trello: ["Trello", "https://trello.com", { mode: "work" }],
    asana: ["Asana", "https://app.asana.com", { mode: "work" }],
    jira: ["Jira", "https://www.atlassian.com/software/jira", { mode: "work" }],
    figma: ["Figma", "https://www.figma.com", { mode: "work" }],
    canva: ["Canva", "https://www.canva.com", { mode: "work" }],
    zoom: ["Zoom", "https://app.zoom.us", { mode: "work" }],
    dropbox: ["Dropbox", "https://www.dropbox.com", { mode: "work" }],
    linear: ["Linear", "https://linear.app", { mode: "work" }],
    miro: ["Miro", "https://miro.com", { mode: "work" }],
    airtable: ["Airtable", "https://airtable.com", { mode: "work" }],
    calendly: ["Calendly", "https://calendly.com", { mode: "work" }],
    grammarly: ["Grammarly", "https://app.grammarly.com", { mode: "work" }],

    /* ---------- Lập trình ---------- */
    github: ["GitHub", "https://github.com", { mode: "work", slug: "github", bg: "#fff" }],
    gitlab: ["GitLab", "https://gitlab.com", { mode: "work" }],
    vscode: ["VS Code", "https://vscode.dev", { mode: "work" }],
    codepen: ["CodePen", "https://codepen.io", { mode: "work" }],
    replit: ["Replit", "https://replit.com", { mode: "work" }],
    stackblitz: ["StackBlitz", "https://stackblitz.com", { mode: "work" }],
    vercel: ["Vercel", "https://vercel.com", { mode: "work" }],
    cloudflare: ["Cloudflare", "https://dash.cloudflare.com", { mode: "work" }],
    stackoverflow: ["Stack Overflow", "https://stackoverflow.com", { mode: "work" }],
    mdn: ["MDN", "https://developer.mozilla.org", { mode: "work" }],
    postman: ["Postman", "https://web.postman.co", { mode: "work" }],

    /* ---------- Game: trò chơi web ---------- */
    minecraft: ["Minecraft Classic", "https://classic.minecraft.net", { mode: "entertainment" }],
    krunker: ["Krunker", "https://krunker.io", { mode: "entertainment" }],
    slither: ["Slither.io", "https://slither.io", { mode: "entertainment" }],
    agar: ["Agar.io", "https://agar.io", { mode: "entertainment" }],
    shellshock: ["Shell Shockers", "https://shellshock.io", { mode: "entertainment" }],
    skribbl: ["Skribbl", "https://skribbl.io", { mode: "entertainment" }],
    game2048: ["2048", "https://play2048.co", { mode: "entertainment" }],
    wordle: ["Wordle", "https://www.nytimes.com/games/wordle/index.html", { mode: "entertainment" }],
    cookie: ["Cookie Clicker", "https://orteil.dashnet.org/cookieclicker/", { mode: "entertainment" }],
    tetris: ["Tetris", "https://tetris.com/play-tetris", { mode: "entertainment" }],
    alchemy: ["Little Alchemy 2", "https://littlealchemy2.com", { mode: "entertainment" }],
    geoguessr: ["GeoGuessr", "https://www.geoguessr.com", { mode: "entertainment" }],
    lichess: ["Lichess", "https://lichess.org", { mode: "entertainment" }],
    chesscom: ["Chess.com", "https://www.chess.com", { mode: "entertainment" }],
    dino: ["Chrome Dino", "https://chromedino.com", { mode: "entertainment" }],
    geforce: ["GeForce NOW", "https://play.geforcenow.com", { mode: "entertainment" }],

    /* ---------- Game: cổng game (nhiều trò) ---------- */
    poki: ["Poki", "https://poki.com", { mode: "entertainment" }],
    crazygames: ["CrazyGames", "https://www.crazygames.com", { mode: "entertainment" }],
    y8: ["Y8", "https://www.y8.com", { mode: "entertainment" }],
    miniclip: ["Miniclip", "https://www.miniclip.com/games/en/", { mode: "entertainment" }],
    coolmath: ["Coolmath Games", "https://www.coolmathgames.com", { mode: "entertainment" }],
    newgrounds: ["Newgrounds", "https://www.newgrounds.com/games", { mode: "entertainment" }],
    kongregate: ["Kongregate", "https://www.kongregate.com", { mode: "entertainment" }],
    armorgames: ["Armor Games", "https://armorgames.com", { mode: "entertainment" }],
    itch: ["itch.io Web", "https://itch.io/games/html5", { mode: "entertainment" }],
    gamedistribution: ["GameDistribution", "https://gamedistribution.com", { mode: "entertainment" }],

    /* ---------- Game: Flash (chạy bằng Ruffle) & WebGL ---------- */
    ruffle: ["Ruffle (Flash)", "https://ruffle.rs/demo/", { mode: "entertainment" }],
    flashpoint: ["Flashpoint", "https://flashpointproject.github.io/", { mode: "entertainment" }],
    hexgl: ["HexGL", "https://hexgl.bkcore.com/play/", { mode: "entertainment" }],
    aquarium: ["WebGL Aquarium", "https://webglsamples.org/aquarium/aquarium.html", { mode: "entertainment" }],
    threejs: ["Three.js", "https://threejs.org/examples/", { mode: "entertainment" }],
    chromeexp: ["Chrome Experiments", "https://experiments.withgoogle.com", { mode: "entertainment" }],
    voxiom: ["Voxiom", "https://voxiom.io", { mode: "entertainment" }],
    zombs: ["ZOMBS.io", "https://zombs.io", { mode: "entertainment" }]
  },

  folders: {
    google:    { name: "Google",     apps: ["google","gmail","drive","docs","sheets","slides","forms","calendar","meet","maps","photos","translate","keep","gchat","gemini","notebooklm","aistudio","earth","gnews","scholar","playstore","analytics","youtube","ytmusic"] },
    microsoft: { name: "Microsoft",  apps: ["m365","outlook","word","excel","powerpoint","onenote","onedrive","teams","todo","bing","copilot","azure","xboxcloud"] },
    meta:      { name: "Meta",       apps: ["facebook","fbwatch","fbmarket","fbnews","messenger","instagram","whatsapp","threads","metaai"] },
    social:    { name: "Mạng xã hội",apps: ["tiktok","x","reddit","pinterest","linkedin","snapchat","telegram","discord","zalo","tumblr"] },
    media:     { name: "Giải trí",   apps: ["youtube","tiktok","netflix","spotify","twitch","disney","prime","soundcloud","zingmp3","ytmusic","bilibili"] },
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
      ["folder:google","folder:microsoft","folder:meta","folder:work",
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
