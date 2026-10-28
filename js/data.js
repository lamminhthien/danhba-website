/* =====================================================================
   PORTAL_DATA – nơi DUY NHẤT cần sửa để thêm / bớt / đổi ứng dụng.
   ---------------------------------------------------------------------
   apps:    id -> [ "Tên hiển thị", "URL mở ra", { tuỳ chọn } ]
            tuỳ chọn: icon  = link ảnh riêng hoặc file nội bộ ("assets/x.png")
                      slug  = tên icon trên simpleicons.org (dự phòng)
                      bg    = màu nền ô icon (mặc định trắng)
                      fit   = "cover" để ảnh lấp đầy ô icon
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
    google: ["Google", "https://www.google.com"],
    gmail: ["Gmail", "https://mail.google.com"],
    drive: ["Drive", "https://drive.google.com"],
    docs: ["Docs", "https://docs.google.com/document/u/0/"],
    sheets: ["Sheets", "https://docs.google.com/spreadsheets/u/0/"],
    slides: ["Slides", "https://docs.google.com/presentation/u/0/"],
    forms: ["Forms", "https://docs.google.com/forms/u/0/"],
    calendar: ["Lịch", "https://calendar.google.com"],
    meet: ["Meet", "https://meet.google.com"],
    maps: ["Maps", "https://maps.google.com"],
    photos: ["Ảnh", "https://photos.google.com"],
    youtube: ["YouTube", "https://www.youtube.com"],
    ytmusic: ["YT Music", "https://music.youtube.com"],
    translate: ["Dịch", "https://translate.google.com"],
    keep: ["Keep", "https://keep.google.com"],
    gchat: ["Chat", "https://chat.google.com"],
    gemini: ["Gemini", "https://gemini.google.com"],
    notebooklm: ["NotebookLM", "https://notebooklm.google.com"],
    aistudio: ["AI Studio", "https://aistudio.google.com"],
    earth: ["Earth", "https://earth.google.com/web/"],
    gnews: ["Google News", "https://news.google.com"],
    scholar: ["Scholar", "https://scholar.google.com"],
    playstore: ["Play", "https://play.google.com"],
    analytics: ["Analytics", "https://analytics.google.com"],

    /* ---------- Microsoft ---------- */
    m365: ["Microsoft 365", "https://www.office.com"],
    outlook: ["Outlook", "https://outlook.live.com/mail/"],
    word: ["Word", "https://www.office.com/launch/word"],
    excel: ["Excel", "https://www.office.com/launch/excel"],
    powerpoint: ["PowerPoint", "https://www.office.com/launch/powerpoint"],
    onenote: ["OneNote", "https://www.onenote.com"],
    onedrive: ["OneDrive", "https://onedrive.live.com"],
    teams: ["Teams", "https://teams.microsoft.com"],
    todo: ["To Do", "https://to-do.live.com"],
    bing: ["Bing", "https://www.bing.com"],
    copilot: ["Copilot", "https://copilot.microsoft.com"],
    azure: ["Azure", "https://portal.azure.com"],
    xboxcloud: ["Xbox Cloud", "https://www.xbox.com/play"],

    /* ---------- Meta ---------- */
    facebook: ["Facebook", "https://www.facebook.com"],
    fbwatch: ["FB Watch", "https://www.facebook.com/watch"],
    fbmarket: ["Marketplace", "https://www.facebook.com/marketplace"],
    fbnews: ["FB Tin tức", "https://www.facebook.com/news"],
    messenger: ["Messenger", "https://www.messenger.com"],
    instagram: ["Instagram", "https://www.instagram.com"],
    whatsapp: ["WhatsApp", "https://web.whatsapp.com"],
    threads: ["Threads", "https://www.threads.com"],
    metaai: ["Meta AI", "https://www.meta.ai"],

    /* ---------- Mạng xã hội ---------- */
    tiktok: ["TikTok", "https://www.tiktok.com"],
    x: ["X", "https://x.com"],
    reddit: ["Reddit", "https://www.reddit.com"],
    pinterest: ["Pinterest", "https://www.pinterest.com"],
    linkedin: ["LinkedIn", "https://www.linkedin.com"],
    snapchat: ["Snapchat", "https://www.snapchat.com"],
    telegram: ["Telegram", "https://web.telegram.org"],
    discord: ["Discord", "https://discord.com/app"],
    zalo: ["Zalo", "https://chat.zalo.me"],
    tumblr: ["Tumblr", "https://www.tumblr.com"],

    /* ---------- Giải trí ---------- */
    netflix: ["Netflix", "https://www.netflix.com"],
    spotify: ["Spotify", "https://open.spotify.com"],
    twitch: ["Twitch", "https://www.twitch.tv"],
    disney: ["Disney+", "https://www.disneyplus.com"],
    prime: ["Prime Video", "https://www.primevideo.com"],
    soundcloud: ["SoundCloud", "https://soundcloud.com"],
    zingmp3: ["Zing MP3", "https://zingmp3.vn"],
    bilibili: ["Bilibili", "https://www.bilibili.com"],

    /* ---------- Tin tức ---------- */
    vnexpress: ["VnExpress", "https://vnexpress.net"],
    tuoitre: ["Tuổi Trẻ", "https://tuoitre.vn"],
    dantri: ["Dân trí", "https://dantri.com.vn"],
    thanhnien: ["Thanh Niên", "https://thanhnien.vn"],
    bbc: ["BBC News", "https://www.bbc.com/news"],
    cnn: ["CNN", "https://edition.cnn.com"],
    medium: ["Medium", "https://medium.com"],

    /* ---------- Mua sắm ---------- */
    shopee: ["Shopee", "https://shopee.vn"],
    lazada: ["Lazada", "https://www.lazada.vn"],
    tiki: ["Tiki", "https://tiki.vn"],
    amazon: ["Amazon", "https://www.amazon.com"],

    /* ---------- AI ---------- */
    chatgpt: ["ChatGPT", "https://chatgpt.com"],
    claude: ["Claude", "https://claude.ai"],
    perplexity: ["Perplexity", "https://www.perplexity.ai"],
    grok: ["Grok", "https://grok.com"],
    deepseek: ["DeepSeek", "https://chat.deepseek.com"],
    mistral: ["Le Chat", "https://chat.mistral.ai"],
    midjourney: ["Midjourney", "https://www.midjourney.com"],
    huggingface: ["Hugging Face", "https://huggingface.co"],
    suno: ["Suno", "https://suno.com"],

    /* ---------- Làm việc ---------- */
    slack: ["Slack", "https://app.slack.com"],
    notion: ["Notion", "https://www.notion.so"],
    trello: ["Trello", "https://trello.com"],
    asana: ["Asana", "https://app.asana.com"],
    jira: ["Jira", "https://www.atlassian.com/software/jira"],
    figma: ["Figma", "https://www.figma.com"],
    canva: ["Canva", "https://www.canva.com"],
    zoom: ["Zoom", "https://app.zoom.us"],
    dropbox: ["Dropbox", "https://www.dropbox.com"],
    linear: ["Linear", "https://linear.app"],
    miro: ["Miro", "https://miro.com"],
    airtable: ["Airtable", "https://airtable.com"],
    calendly: ["Calendly", "https://calendly.com"],
    grammarly: ["Grammarly", "https://app.grammarly.com"],

    /* ---------- Lập trình ---------- */
    github: ["GitHub", "https://github.com", { slug: "github", bg: "#fff" }],
    gitlab: ["GitLab", "https://gitlab.com"],
    vscode: ["VS Code", "https://vscode.dev"],
    codepen: ["CodePen", "https://codepen.io"],
    replit: ["Replit", "https://replit.com"],
    stackblitz: ["StackBlitz", "https://stackblitz.com"],
    vercel: ["Vercel", "https://vercel.com"],
    cloudflare: ["Cloudflare", "https://dash.cloudflare.com"],
    stackoverflow: ["Stack Overflow", "https://stackoverflow.com"],
    mdn: ["MDN", "https://developer.mozilla.org"],
    postman: ["Postman", "https://web.postman.co"],

    /* ---------- Game: trò chơi web ---------- */
    minecraft: ["Minecraft Classic", "https://classic.minecraft.net"],
    krunker: ["Krunker", "https://krunker.io"],
    slither: ["Slither.io", "https://slither.io"],
    agar: ["Agar.io", "https://agar.io"],
    shellshock: ["Shell Shockers", "https://shellshock.io"],
    skribbl: ["Skribbl", "https://skribbl.io"],
    game2048: ["2048", "https://play2048.co"],
    wordle: ["Wordle", "https://www.nytimes.com/games/wordle/index.html"],
    cookie: ["Cookie Clicker", "https://orteil.dashnet.org/cookieclicker/"],
    tetris: ["Tetris", "https://tetris.com/play-tetris"],
    alchemy: ["Little Alchemy 2", "https://littlealchemy2.com"],
    geoguessr: ["GeoGuessr", "https://www.geoguessr.com"],
    lichess: ["Lichess", "https://lichess.org"],
    chesscom: ["Chess.com", "https://www.chess.com"],
    dino: ["Chrome Dino", "https://chromedino.com"],
    geforce: ["GeForce NOW", "https://play.geforcenow.com"],

    /* ---------- Game: cổng game (nhiều trò) ---------- */
    poki: ["Poki", "https://poki.com"],
    crazygames: ["CrazyGames", "https://www.crazygames.com"],
    y8: ["Y8", "https://www.y8.com"],
    miniclip: ["Miniclip", "https://www.miniclip.com/games/en/"],
    coolmath: ["Coolmath Games", "https://www.coolmathgames.com"],
    newgrounds: ["Newgrounds", "https://www.newgrounds.com/games"],
    kongregate: ["Kongregate", "https://www.kongregate.com"],
    armorgames: ["Armor Games", "https://armorgames.com"],
    itch: ["itch.io Web", "https://itch.io/games/html5"],
    gamedistribution: ["GameDistribution", "https://gamedistribution.com"],

    /* ---------- Game: Flash (chạy bằng Ruffle) & WebGL ---------- */
    ruffle: ["Ruffle (Flash)", "https://ruffle.rs/demo/"],
    flashpoint: ["Flashpoint", "https://flashpointproject.github.io/"],
    hexgl: ["HexGL", "https://hexgl.bkcore.com/play/"],
    aquarium: ["WebGL Aquarium", "https://webglsamples.org/aquarium/aquarium.html"],
    threejs: ["Three.js", "https://threejs.org/examples/"],
    chromeexp: ["Chrome Experiments", "https://experiments.withgoogle.com"],
    voxiom: ["Voxiom", "https://voxiom.io"],
    zombs: ["ZOMBS.io", "https://zombs.io"]
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
